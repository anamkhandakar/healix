import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.resolve(process.cwd(), "server-data");
const usersFile = path.join(dataDir, "healix-users.json");

function ensureUsersFile() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "{}", "utf8");
}

function readUsers() {
  ensureUsersFile();
  try {
    const parsed = JSON.parse(fs.readFileSync(usersFile, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeUsers(users) {
  ensureUsersFile();
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
}

function authStoragePlugin() {
  const middleware = (req, res, next) => {
    if (!req.url?.startsWith("/api/auth/")) return next();
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");

    if (req.method === "GET" && req.url === "/api/auth/users") {
      res.statusCode = 200;
      res.end(JSON.stringify({ users: readUsers() }));
      return;
    }

    if (req.method === "POST" && req.url === "/api/auth/sync") {
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          const incoming = JSON.parse(body || "{}").users;
          if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid users payload" }));
            return;
          }
          const current = readUsers();
          writeUsers({ ...current, ...incoming });
          res.statusCode = 200;
          res.end(JSON.stringify({ ok: true }));
        } catch {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
      });
      return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  };

  return {
    name: "healix-auth-storage",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    }
  };
}

export default defineConfig({
  plugins: [react(), authStoragePlugin()]
});
