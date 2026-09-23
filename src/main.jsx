import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const Icon = ({ children, size = 20 }) => (
  <span className="icon" style={{ width: size, height: size }}>
    {children}
  </span>
);

const icons = {
  home: "⌂",
  patients: "♙",
  calendar: "▣",
  records: "▤",
  prescription: "▥",
  lab: "⚗",
  star: "★",
  bell: "♟",
  settings: "⚙",
  logout: "↪",
  search: "⌕"
};

const navItems = [
  ["Dashboard", icons.home],
  ["My Patients", icons.patients],
  ["Appointments", icons.calendar],
  ["Medical Records", icons.records],
  ["Prescriptions", icons.prescription],
  ["Test Reports", icons.lab],
  ["Doctor Ratings", icons.star],
  ["Notifications", icons.bell]
];

const topLabels = [
  "Home",
  "My Patients",
  "Book Appointment",
  "Medical Records",
  "My Appointments"
];

const defaultPatients = [
  {
    id: "P10234",
    name: "Rahul Sharma",
    age: 45,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "rahul@example.com",
    blood: "B+",
    allergies: "No known allergies",
    condition: "Diabetes",
    lastVisit: "12 Aug 2026",
    next: "28 Sep 2026"
  },
  {
    id: "P10421",
    name: "Riya Sen",
    age: 28,
    gender: "Female",
    phone: "+91 98765 11223",
    email: "riya@example.com",
    blood: "O+",
    allergies: "No known allergies",
    condition: "General Checkup",
    lastVisit: "—",
    next: "—"
  },
  {
    id: "P10318",
    name: "Amit Verma",
    age: 52,
    gender: "Male",
    phone: "+91 98765 22334",
    email: "amit@example.com",
    blood: "A+",
    allergies: "Penicillin",
    condition: "Cardiology Follow-up",
    lastVisit: "23 Sep 2026",
    next: "23 Sep 2026"
  },
  {
    id: "P10509",
    name: "Neha Roy",
    age: 34,
    gender: "Female",
    phone: "+91 98765 33445",
    email: "neha@example.com",
    blood: "AB+",
    allergies: "No known allergies",
    condition: "Emergency Review",
    lastVisit: "23 Sep 2026",
    next: "23 Sep 2026"
  },
  {
    id: "P10187",
    name: "Arjun Das",
    age: 41,
    gender: "Male",
    phone: "+91 98765 44556",
    email: "arjun@example.com",
    blood: "B+",
    allergies: "Dust",
    condition: "Routine Follow-up",
    lastVisit: "—",
    next: "—"
  },
  {
    id: "P10602",
    name: "Priya Nair",
    age: 37,
    gender: "Female",
    phone: "+91 98765 55667",
    email: "priya@example.com",
    blood: "O-",
    allergies: "No known allergies",
    condition: "Lipid Profile Review",
    lastVisit: "16 Aug 2026",
    next: "30 Sep 2026"
  }
];

const reports = [
  {
    name: "Blood Test (CBC)",
    date: "12 Aug 2026",
    status: "Available"
  },
  {
    name: "Lipid Profile",
    date: "12 Aug 2026",
    status: "Available"
  },
  {
    name: "X-Ray (Chest)",
    date: "05 Jun 2026",
    status: "Available"
  },
  {
    name: "Blood Glucose",
    date: "23 Sep 2026",
    status: "Pending review"
  }
];

const defaultMeds = [
  ["Metformin", "500 mg", "Twice daily", "12 Aug 2026"],
  ["Amlodipine", "5 mg", "Once daily", "12 Aug 2026"]
];

const ROLES = [
  {
    id: "doctor",
    title: "Doctor Portal",
    subtitle: "Manage patients, appointments & clinical prescriptions",
    icon: "⚕",
    badge: "Clinical Care",
    demoEmail: "doctor@example.com",
    demoPass: "12345678",
    demoName: "Dr. Anam Khandakar",
    portalSubtitle: "Sign in to access your doctor portal.",
    placeholderName: "Dr. Your Name"
  },
  {
    id: "admin",
    title: "Admin Portal",
    subtitle: "System configuration, user management & audit analytics",
    icon: "⚙",
    badge: "Administration",
    demoEmail: "admin@healix.com",
    demoPass: "admin123",
    demoName: "Admin System Director",
    portalSubtitle: "Sign in to access system administration.",
    placeholderName: "Admin Full Name"
  },
  {
    id: "patient",
    title: "Patient Portal",
    subtitle: "View medical records, test reports & book consultations",
    icon: "♥",
    badge: "Personal Health",
    demoEmail: "patient@example.com",
    demoPass: "patient123",
    demoName: "Rahul Sharma",
    portalSubtitle: "Sign in to access your patient health records.",
    placeholderName: "Patient Full Name"
  },
  {
    id: "lab",
    title: "Lab Technician Portal",
    subtitle: "Manage diagnostic requests, sample tracking & test reports",
    icon: "⚗",
    badge: "Diagnostics",
    demoEmail: "labtech@healix.com",
    demoPass: "labtech123",
    demoName: "Vikram Malhotra (Lab Tech)",
    portalSubtitle: "Sign in to access lab diagnostics portal.",
    placeholderName: "Technician Full Name"
  }
];

function RoleSelector({ onSelectRole }) {
  return (
    <div className="role-selector-page">
      <div className="role-header">
        <div className="brand-mark">+</div>
        <h1>Welcome to HEALIX</h1>
        <p>Select your portal to log in or access your dashboard</p>
      </div>

      <div className="role-cards-grid">
        {ROLES.map((r) => (
          <div
            key={r.id}
            className={`role-card ${r.id}`}
            onClick={() => onSelectRole(r.id)}
          >
            <div className="role-icon-box">{r.icon}</div>
            <span className="role-card-badge">{r.badge}</span>
            <h3>{r.title}</h3>
            <p>{r.subtitle}</p>
            <button type="button" className="role-card-action">
              <span>Access Portal</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState(
    () =>
      performance.getEntriesByType?.("navigation")?.[0]?.type === "reload" &&
      localStorage.getItem("healix_auth") === "true"
  );

  const [role, setRole] = useState(
    () => localStorage.getItem("healix_selected_role") || null
  );

  const switchPortal = () => {
    setAuth(false);
    setRole(null);
    localStorage.removeItem("healix_selected_role");
    localStorage.removeItem("healix_auth");
  };

  const selectRole = (r) => {
    setRole(r);
    localStorage.setItem("healix_selected_role", r);
    setAuthError("");
  };

  const [authMode, setAuthMode] = useState("login");
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [authError, setAuthError] = useState("");

  const [activeNav, setActiveNav] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  const [patients, setPatients] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("healix_patients") || "null") ||
        defaultPatients
      );
    } catch {
      return defaultPatients;
    }
  });

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patientForm, setPatientForm] = useState({
    name: "",
    email: "",
    age: "",
    phone: ""
  });

  const [patientError, setPatientError] = useState("");

  const [appointments, setAppointments] = useState(() =>
    JSON.parse(localStorage.getItem("healix_appointments") || "[]")
  );

  const [medications, setMedications] = useState(defaultMeds);

  const [prescriptionForm, setPrescriptionForm] = useState({
    medicine: "",
    dosage: "",
    frequency: "Once daily",
    instructions: ""
  });

  const [visitForm, setVisitForm] = useState({
    date: "",
    time: "",
    type: "Consultation",
    patient: "Rahul Sharma"
  });

  const defaultProfile = {
    name: "Anam Khandakar",
    specialization: "Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    registration: "MED-XXXXXXXX",
    experience: "8 Years",
    hospital: "Healix Medical Centre",
    department: "Internal Medicine",
    email: "doctor@healix.local",
    phone: "+91 XXXXX XXXXX",
    fee: "₹800",
    mode: "In-person & Online",
    bio: "Internal Medicine specialist focused on patient-centred care."
  };

  const defaultSettings = {
    clinic: "Healix Medical Centre",
    department: "Internal Medicine",
    workingDays:
      "Monday, Tuesday, Wednesday, Thursday, Friday",
    startTime: "09:00",
    endTime: "17:00",
    duration: "30 minutes",
    maxPatients: "20",
    appointmentNotifications: true,
    appointmentReminders: true,
    patientMessages: true,
    testReports: true,
    systemAlerts: true,
    prescriptionSignature: true,
    showClinicDetails: true,
    followUp: "7 days",
    compact: false
  };

  const [profile, setProfile] = useState(() => {
    try {
      const currentUser = localStorage.getItem("healix_current_user");
      const profileKey = currentUser
        ? `healix_profile_${currentUser}`
        : "healix_profile";
      return {
        ...defaultProfile,
        ...JSON.parse(localStorage.getItem(profileKey) || "{}")
      };
    } catch {
      return defaultProfile;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      return {
        ...defaultSettings,
        ...JSON.parse(localStorage.getItem("healix_settings") || "{}")
      };
    } catch {
      return defaultSettings;
    }
  });

  const [settingsTab, setSettingsTab] = useState("professional");

  useEffect(() => {
    localStorage.setItem("healix_patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem(
      "healix_appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  useEffect(() => {
    const currentUser = localStorage.getItem("healix_current_user");
    const profileKey = currentUser
      ? `healix_profile_${currentUser}`
      : "healix_profile";
    localStorage.setItem(profileKey, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("healix_settings", JSON.stringify(settings));
  }, [settings]);

  const doctor =
    profile.name ||
    localStorage.getItem("healix_user_name") ||
    "Anam Khandakar";

  const doctorName = doctor.startsWith("Dr.")
    ? doctor
    : `Dr. ${doctor}`;

  const initials = doctor
    .replace(/^Dr\.\s*/i, "")
    .split(/\s+/)
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const notify = (t) => {
    setToast(t);
    clearTimeout(window.__healixToast);
    window.__healixToast = setTimeout(
      () => setToast(""),
      2200
    );
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
    return null;
  };

  const validateName = (name) => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return "Name must be at least 2 characters.";
    if (trimmed.length > 50) return "Name must be less than 50 characters.";
    if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Name contains invalid characters.";
    return null;
  };

  const getUsers = () => {
    try {
      return JSON.parse(
        localStorage.getItem("healix_users") || "{}"
      );
    } catch {
      return {};
    }
  };

  /*
   * DEMO ACCOUNT
   * This is intentionally hardcoded because this project
   * is being deployed only as a demonstration on Vercel.
   */
  const DEMO_USER = {
    email: "test@healix.com",
    password: "12345678",
    name: "Test Doctor"
  };

  const syncUsers = async (users) => {
    try {
      await fetch("/api/auth/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ users })
      });
    } catch {}
  };

  const getSharedUsers = async () => {
    try {
      const r = await fetch("/api/auth/users", {
        cache: "no-store"
      });

      if (!r.ok) return null;

      const data = await r.json();

      return data.users &&
        typeof data.users === "object"
        ? data.users
        : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const users = getUsers();

    if (Object.keys(users).length) {
      syncUsers(users);
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");

    const name = authData.name.trim();
    const email = authData.email.trim().toLowerCase();
    const password = authData.password;
    const confirmPassword = authData.confirmPassword;

    if (!email || !password || (authMode === "signup" && !name)) {
      return setAuthError("Please fill in all required fields.");
    }

    if (!validateEmail(email)) {
      return setAuthError("Please enter a valid email address.");
    }

    if (authMode === "signup") {
      const nameError = validateName(name);
      if (nameError) return setAuthError(nameError);

      const passwordError = validatePassword(password);
      if (passwordError) return setAuthError(passwordError);

      if (password !== confirmPassword) {
        return setAuthError("Passwords do not match.");
      }
    } else {
      if (password.length < 6) {
        return setAuthError("Password must be at least 6 characters.");
      }
    }

    const activeRoleObj = ROLES.find((r) => r.id === (role || "doctor")) || ROLES[0];

    /*
     * DEMO LOGIN FOR ACTIVE ROLE
     */
    const isRoleDemoEmail = email === activeRoleObj.demoEmail || email === "test@healix.com" || email === "doctor@example.com";
    if (authMode === "login" && isRoleDemoEmail) {
      if (password !== activeRoleObj.demoPass && password !== "12345678") {
        return setAuthError("Incorrect password. Please try again.");
      }

      const demoName = activeRoleObj.demoName;
      localStorage.setItem("healix_user_name", demoName);
      localStorage.setItem("healix_current_user", email);
      localStorage.setItem("healix_auth", "true");

      // Load demo user's saved profile if it exists
      const demoSavedProfile = (() => {
        try {
          return JSON.parse(localStorage.getItem(`healix_profile_${email}`) || "{}");
        } catch {
          return {};
        }
      })();
      setProfile({
        ...defaultProfile,
        name: demoName,
        email: email,
        ...demoSavedProfile
      });

      setAuth(true);
      setActiveNav("Dashboard");
      notify("Welcome back, " + demoName + "!");
      return;
    }

    /*
     * Existing local/shared authentication
     * is preserved for the rest of the application.
     */
    const localUsers = getUsers();

    let users = await getSharedUsers();

    if (!users) {
      users = localUsers;
    } else if (Object.keys(localUsers).length) {
      users = { ...users, ...localUsers };
      await syncUsers(users);
    }

    if (authMode === "signup") {
      if (users[email]) {
        setAuthError("An account with this email already exists. Please log in.");
        setAuthMode("login");
        return;
      }

      users[email] = { name, password };

      localStorage.setItem("healix_users", JSON.stringify(users));

      try {
        await syncUsers(users);
      } catch (err) {
        console.warn("Failed to sync user to server:", err);
      }

      localStorage.setItem("healix_user_name", name);
      localStorage.setItem("healix_current_user", email);

      // Build a fresh profile for this new user with their name & email
      const newUserProfile = {
        ...defaultProfile,
        name: name,
        email: email
      };
      localStorage.setItem(`healix_profile_${email}`, JSON.stringify(newUserProfile));
      setProfile(newUserProfile);

      notify("Account created successfully! Welcome, " + name + "!");
    } else {
      if (!users[email]) {
        return setAuthError("No account found with this email. Please sign up first.");
      }

      if (users[email].password !== password) {
        return setAuthError("Incorrect password. Please try again.");
      }

      localStorage.setItem("healix_users", JSON.stringify(users));
      localStorage.setItem("healix_user_name", users[email].name);
      localStorage.setItem("healix_current_user", email);

      // Load this user's saved profile, falling back to their name from the account
      const savedProfile = (() => {
        try {
          return JSON.parse(localStorage.getItem(`healix_profile_${email}`) || "{}");
        } catch {
          return {};
        }
      })();
      setProfile({
        ...defaultProfile,
        name: users[email].name,
        email: email,
        ...savedProfile
      });

      notify("Welcome back, " + users[email].name + "!");
    }

    localStorage.setItem("healix_current_user", email);
    localStorage.setItem("healix_auth", "true");

    setAuthData({ name: "", email: "", password: "", confirmPassword: "" });
    setAuth(true);
    setActiveNav("Dashboard");
  };

  const logout = () => {
    localStorage.removeItem("healix_auth");
    localStorage.removeItem("healix_current_user");
    setProfile(defaultProfile);
    setAuth(false);
    setProfileOpen(false);
    setAuthMode("login");
  };

  const openNav = (label) => {
    setActiveNav(label);
    setProfileOpen(false);
    setSelectedPatient(null);
    window.scrollTo(0, 0);
  };

  const openTop = (label) => {
    setProfileOpen(false);

    if (label === "Home")
      return openNav("Dashboard");

    if (label === "My Patients")
      return openNav("My Patients");

    if (label === "Medical Records")
      return openNav("Medical Records");

    if (label === "My Appointments")
      return openNav("Appointments");

    if (label === "Book Appointment")
      return setModal("appointment");
  };

  const addPatient = (e) => {
    e.preventDefault();
    setPatientError("");

    if (
      !patientForm.name ||
      !patientForm.email ||
      !patientForm.age ||
      !patientForm.phone
    ) {
      return setPatientError(
        "Please fill in all fields."
      );
    }

    const p = {
      id: `P${Math.floor(
        10000 + Math.random() * 89999
      )}`,
      name: patientForm.name.trim(),
      email: patientForm.email.trim(),
      age: Number(patientForm.age),
      phone: patientForm.phone.trim(),
      gender: "Not specified",
      blood: "—",
      allergies: "Not recorded",
      condition: "New Patient",
      lastVisit: "—",
      next: "—"
    };

    setPatients((prev) => [p, ...prev]);

    setPatientForm({
      name: "",
      email: "",
      age: "",
      phone: ""
    });

    setModal(null);
    notify("Patient added successfully");
  };

  const saveVisit = (e) => {
    e.preventDefault();

    if (!visitForm.date || !visitForm.time) {
      return notify("Select a date and time");
    }

    const a = {
      ...visitForm,
      id: Date.now(),
      status: "Confirmed"
    };

    setAppointments((prev) => [
      ...prev,
      a
    ]);

    setModal(null);
    notify("Appointment scheduled");
  };

  const addPrescription = (e) => {
    e.preventDefault();

    if (
      !prescriptionForm.medicine ||
      !prescriptionForm.dosage
    ) {
      return notify(
        "Enter medicine and dosage"
      );
    }

    setMedications((prev) => [
      ...prev,
      [
        prescriptionForm.medicine,
        prescriptionForm.dosage,
        prescriptionForm.frequency,
        "23 Sep 2026"
      ]
    ]);

    setPrescriptionForm({
      medicine: "",
      dosage: "",
      frequency: "Once daily",
      instructions: ""
    });

    setModal(null);
    notify("Prescription saved");
  };

  const filteredPatients = useMemo(() => {
    const q = search.trim().toLowerCase();

    return q
      ? patients.filter((p) =>
          `${p.name} ${p.id} ${p.condition}`
            .toLowerCase()
            .includes(q)
        )
      : patients;
  }, [search, patients]);

  if (!role) {
    return <RoleSelector onSelectRole={selectRole} />;
  }

  if (!auth) {
    return (
      <AuthScreen
        role={role}
        setRole={selectRole}
        authMode={authMode}
        setAuthMode={setAuthMode}
        authData={authData}
        setAuthData={setAuthData}
        authError={authError}
        setAuthError={setAuthError}
        handleAuth={handleAuth}
        onForgot={() => setModal("reset")}
        modal={modal}
        setModal={setModal}
        onBackToSelector={() => setRole(null)}
      />
    );
  }

  if (role === "admin") {
    return (
      <AdminPortal
        userName={doctor}
        onLogout={logout}
        onSwitchPortal={switchPortal}
        notify={notify}
      />
    );
  }

  if (role === "patient") {
    return (
      <PatientPortal
        userName={doctor}
        onLogout={logout}
        onSwitchPortal={switchPortal}
        notify={notify}
      />
    );
  }

  if (role === "lab") {
    return (
      <LabPortal
        userName={doctor}
        onLogout={logout}
        onSwitchPortal={switchPortal}
        notify={notify}
      />
    );
  }

  return (
    <div
      className={`app ${
        settings.compact
          ? "compact-view"
          : ""
      }`}
    >
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">+</div>
          <span>HEALIX</span>
        </div>

        <nav className="topnav">
          {topLabels.map((x) => (
            <button
              key={x}
              className="topnav-link"
              onClick={() => openTop(x)}
            >
              {x}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="switch-portal-btn" onClick={switchPortal}>
            <span>⇄</span> Switch Portal
          </button>

          <div className="profile-wrap">
          <button
            className="doctor-profile"
            onClick={() =>
              setProfileOpen((v) => !v)
            }
          >
            <div className="avatar">
              {initials}
            </div>

            <div>
              <strong>{doctorName}</strong>
              <small>
                {profile.specialization}
              </small>
            </div>

            <span className="down">⌄</span>
          </button>

          {profileOpen && (
            <div className="profile-menu">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  setModal("profile");
                }}
              >
                My Profile
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  setModal("settings");
                }}
              >
                Settings
              </button>

              <button onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>

      <aside className="sidebar">
        <div className="side-main">
          {navItems.map(
            ([label, icon]) => (
              <button
                key={label}
                className={`side-item ${
                  activeNav === label
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  openNav(label)
                }
              >
                <Icon>{icon}</Icon>
                <span>{label}</span>

                {label ===
                  "Notifications" && (
                  <b className="badge">
                    3
                  </b>
                )}
              </button>
            )
          )}
        </div>

        <div className="side-bottom">
          <button
            className="side-item"
            onClick={() =>
              setModal("settings")
            }
          >
            <Icon>{icons.settings}</Icon>
            <span>Settings</span>
          </button>

          <button
            className="side-item"
            onClick={logout}
          >
            <Icon>{icons.logout}</Icon>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="content">
        <div className="search-row">
          <div className="searchbox">
            <Icon>{icons.search}</Icon>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search patient by name, ID, or condition..."
            />

            {search && (
              <button
                className="search-clear"
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}

            {search && (
              <div className="search-results">
                {filteredPatients
                  .slice(0, 5)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPatient(
                          p
                        );
                        setActiveNav(
                          "My Patients"
                        );
                        setSearch("");
                      }}
                    >
                      <b>{p.name}</b>
                      <small>
                        {p.id} · {p.age} years ·{" "}
                        {p.condition}
                      </small>
                    </button>
                  ))}

                {!filteredPatients.length && (
                  <div>No patient found</div>
                )}
              </div>
            )}
          </div>

          <div className="current-date">
            Wednesday, 23 Sep 2026
          </div>
        </div>

        {selectedPatient ? (
          <PatientDetails
            patient={selectedPatient}
            onBack={() =>
              setSelectedPatient(null)
            }
            onAppointment={() =>
              setModal("appointment")
            }
            onPrescription={() =>
              setModal("prescription")
            }
          />
        ) : activeNav === "Dashboard" ? (
          <Dashboard
            doctorName={doctorName}
            patients={patients}
            appointments={appointments}
            onNav={openNav}
            onAppointment={() =>
              setModal("appointment")
            }
            onPrescription={() =>
              setModal("prescription")
            }
            onPatient={() =>
              setModal("patient")
            }
          />
        ) : activeNav === "My Patients" ? (
          <PatientsPage
            patients={filteredPatients}
            onAdd={() =>
              setModal("patient")
            }
            onView={(p) =>
              setSelectedPatient(p)
            }
          />
        ) : (
          <SectionPage
            type={activeNav}
            patients={patients}
            appointments={appointments}
            medications={medications}
            reports={reports}
            onAddPatient={() =>
              setModal("patient")
            }
            onAppointment={() =>
              setModal("appointment")
            }
            onPrescription={() =>
              setModal("prescription")
            }
            onViewPatient={(p) =>
              setSelectedPatient(p)
            }
            onReport={(r) =>
              setModal({
                type: "report",
                report: r
              })
            }
            onNotify={notify}
          />
        )}
      </main>

      {modal && (
        <Modal
          modal={modal}
          setModal={setModal}
          patientForm={patientForm}
          setPatientForm={setPatientForm}
          patientError={patientError}
          addPatient={addPatient}
          visitForm={visitForm}
          setVisitForm={setVisitForm}
          saveVisit={saveVisit}
          prescriptionForm={
            prescriptionForm
          }
          setPrescriptionForm={
            setPrescriptionForm
          }
          addPrescription={
            addPrescription
          }
          settings={settings}
          setSettings={setSettings}
          settingsTab={settingsTab}
          setSettingsTab={setSettingsTab}
          profile={profile}
          setProfile={setProfile}
          notify={notify}
        />
      )}

      {toast && (
        <div className="toast">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

function AdminPortal({ userName, onLogout, onSwitchPortal, notify }) {
  const [tab, setTab] = useState("overview");
  const [users, setUsers] = useState([
    { id: 1, name: "Dr. Anam Khandakar", email: "doctor@example.com", role: "Doctor", status: "Active", joined: "12 Jan 2026" },
    { id: 2, name: "Rahul Sharma", email: "patient@example.com", role: "Patient", status: "Active", joined: "15 Feb 2026" },
    { id: 3, name: "Vikram Malhotra", email: "labtech@healix.com", role: "Lab Tech", status: "Active", joined: "01 Mar 2026" },
    { id: 4, name: "Dr. Sarah Jenkins", email: "sarah@healix.com", role: "Doctor", status: "Pending", joined: "20 Sep 2026" }
  ]);
  const [userRoleFilter, setUserRoleFilter] = useState("All");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: "", email: "", role: "Doctor" });

  const filteredUsers = userRoleFilter === "All" ? users : users.filter(u => u.role === userRoleFilter);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) return;
    const u = {
      id: Date.now(),
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      status: "Active",
      joined: "Today"
    };
    setUsers([u, ...users]);
    setNewUserForm({ name: "", email: "", role: "Doctor" });
    setShowAddUserModal(false);
    notify(`${newUserForm.role} account created for ${newUserForm.name}`);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" style={{ background: "linear-gradient(145deg, #4f46e5, #4338ca)" }}>⚙</div>
          <span>HEALIX <small style={{ fontSize: 11, color: "#4f46e5" }}>ADMIN</small></span>
        </div>

        <nav className="topnav">
          {["Overview", "User Management", "Security Audit", "System Settings"].map(t => (
            <button
              key={t}
              className={`topnav-link ${tab === t.toLowerCase().replace(/\s+/g, "") ? "active" : ""}`}
              onClick={() => setTab(t.toLowerCase().replace(/\s+/g, ""))}
            >
              {t}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="switch-portal-btn" onClick={onSwitchPortal}>
            <span>⇄</span> Switch Portal
          </button>
          <div className="avatar" style={{ background: "#e0e7ff", color: "#4f46e5" }}>AD</div>
          <button className="view-all" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="content" style={{ marginLeft: 0 }}>
        <div className="page-header">
          <div>
            <h1>System Administration Overview</h1>
            <p>Global clinic metrics, user permissions & system health monitoring.</p>
          </div>
          <button className="primary-btn" style={{ background: "#4f46e5" }} onClick={() => setShowAddUserModal(true)}>
            + Add New System User
          </button>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#e0e7ff", color: "#4f46e5" }}>⚕</div>
            <div>
              <small>Registered Doctors</small>
              <strong>18</strong>
              <p>15 Active Now</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#e0f2fe", color: "#0284c7" }}>♥</div>
            <div>
              <small>Total Patients</small>
              <strong>1,420</strong>
              <p>+48 this week</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>⚗</div>
            <div>
              <small>Lab Staff & Techs</small>
              <strong>12</strong>
              <p>3 Shifts Active</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>⚡</div>
            <div>
              <small>System Health</small>
              <strong>99.9%</strong>
              <p>Database Synchronized</p>
            </div>
          </div>
        </div>

        {(tab === "overview" || tab === "securityaudit" || tab === "systemsettings") && (
          <div className="dashboard-lower">
            <div className="box-card">
              <div className="box-head">
                <h2>Recent System Audit Activity</h2>
              </div>
              <table className="clean-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10:42 AM</td>
                    <td>Dr. Anam Khandakar</td>
                    <td>Prescription Issued (P10234)</td>
                    <td><span className="status green">Completed</span></td>
                  </tr>
                  <tr>
                    <td>10:30 AM</td>
                    <td>Vikram Malhotra (Lab)</td>
                    <td>Lab Test Result Uploaded (Glucose)</td>
                    <td><span className="status green">Completed</span></td>
                  </tr>
                  <tr>
                    <td>09:15 AM</td>
                    <td>Rahul Sharma (Patient)</td>
                    <td>Booked Appointment (Cardiology)</td>
                    <td><span className="status blue">Scheduled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="box-card">
              <div className="box-head">
                <h2>Quick Admin Controls</h2>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <button className="secondary-btn" onClick={() => notify("System backup completed successfully")}>💾 Trigger System Backup</button>
                <button className="secondary-btn" onClick={() => notify("Audit logs exported to CSV")}>📄 Export Security Audit Logs</button>
                <button className="secondary-btn" onClick={() => notify("Application cache cleared")}>🧹 Clear Server Cache</button>
              </div>
            </div>
          </div>
        )}

        {(tab === "usermanagement" || tab === "overview") && (
          <div className="box-card" style={{ marginTop: 16 }}>
            <div className="box-head">
              <h2>User Management & Access Control</h2>
              <div style={{ display: "flex", gap: 8 }}>
                {["All", "Doctor", "Patient", "Lab Tech"].map(roleFilter => (
                  <button
                    key={roleFilter}
                    className={`status-pill ${userRoleFilter === roleFilter ? "green" : ""}`}
                    onClick={() => setUserRoleFilter(roleFilter)}
                    style={{ cursor: "pointer", border: "1px solid #dce9e6" }}
                  >
                    {roleFilter}
                  </button>
                ))}
              </div>
            </div>
            <table className="clean-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td><span className="status blue">{u.role}</span></td>
                    <td><span className={`status ${u.status === "Active" ? "green" : "blue"}`}>{u.status}</span></td>
                    <td>{u.joined}</td>
                    <td>
                      <button className="table-action" onClick={() => notify(`User permissions updated for ${u.name}`)}>
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddUserModal && (
        <div className="modal-backdrop" onClick={() => setShowAddUserModal(false)}>
          <div className="modal small-modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setShowAddUserModal(false)}>×</button>
            <div className="eyebrow">ADMINISTRATION</div>
            <h2>Add System User</h2>
            <form onSubmit={handleAddUser}>
              <label>
                Full Name
                <input
                  required
                  value={newUserForm.name}
                  onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </label>
              <label>
                Email Address
                <input
                  type="email"
                  required
                  value={newUserForm.email}
                  onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="user@healix.com"
                />
              </label>
              <label>
                Role
                <select
                  value={newUserForm.role}
                  onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value })}
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                  <option value="Lab Tech">Lab Tech</option>
                </select>
              </label>
              <button type="submit" className="primary-btn" style={{ background: "#4f46e5", width: "100%" }}>
                Create User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PatientPortal({ userName, onLogout, onSwitchPortal, notify }) {
  const [tab, setTab] = useState("dashboard");
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({ doctor: "Dr. Anam Khandakar", date: "2026-09-28", time: "10:00 AM", reason: "General Checkup" });

  const myAppointments = [
    { id: 1, doctor: "Dr. Anam Khandakar", dept: "Internal Medicine", date: "28 Sep 2026", time: "10:00 AM", status: "Confirmed" },
    { id: 2, doctor: "Dr. Amit Verma", dept: "Cardiology", date: "15 Oct 2026", time: "02:30 PM", status: "Scheduled" }
  ];

  const myPrescriptions = [
    { medicine: "Metformin 500mg", doctor: "Dr. Anam Khandakar", dosage: "Twice daily after meals", date: "12 Aug 2026" },
    { medicine: "Amlodipine 5mg", doctor: "Dr. Anam Khandakar", dosage: "Once daily morning", date: "12 Aug 2026" }
  ];

  const myReports = [
    { title: "Complete Blood Count (CBC)", date: "23 Sep 2026", status: "Normal", doctor: "Dr. Anam Khandakar" },
    { title: "Fasting Blood Glucose", date: "20 Aug 2026", status: "95 mg/dL", doctor: "Dr. Anam Khandakar" }
  ];

  const handleBook = (e) => {
    e.preventDefault();
    setShowBookModal(false);
    notify(`Appointment requested with ${bookingForm.doctor} for ${bookingForm.date}`);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" style={{ background: "linear-gradient(145deg, #0284c7, #0369a1)" }}>♥</div>
          <span>HEALIX <small style={{ fontSize: 11, color: "#0284c7" }}>PATIENT</small></span>
        </div>

        <nav className="topnav">
          {["Dashboard", "Appointments", "Prescriptions", "Lab Reports"].map(t => (
            <button
              key={t}
              className={`topnav-link ${tab === t.toLowerCase() ? "active" : ""}`}
              onClick={() => setTab(t.toLowerCase())}
            >
              {t}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="switch-portal-btn" onClick={onSwitchPortal}>
            <span>⇄</span> Switch Portal
          </button>
          <div className="avatar" style={{ background: "#e0f2fe", color: "#0284c7" }}>RS</div>
          <button className="view-all" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="content" style={{ marginLeft: 0 }}>
        <div className="dashboard-welcome" style={{ borderColor: "#bae6fd" }}>
          <div>
            <h1>Welcome back, <em>{userName || "Rahul Sharma"}</em></h1>
            <p>Patient ID: <strong>P10234</strong> | Blood Group: <strong>B+</strong> | Allergies: <strong>None</strong></p>
          </div>
          <button className="primary-btn" style={{ background: "#0284c7" }} onClick={() => setShowBookModal(true)}>
            + Book Consultation
          </button>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#e0f2fe", color: "#0284c7" }}>▣</div>
            <div>
              <small>Upcoming Consultations</small>
              <strong>2</strong>
              <p>Next: 28 Sep 2026</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#e6f4f1", color: "#0d9983" }}>▥</div>
            <div>
              <small>Active Prescriptions</small>
              <strong>2</strong>
              <p>2 Daily Medications</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>⚗</div>
            <div>
              <small>Diagnostic Reports</small>
              <strong>2</strong>
              <p>All verified</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f3e8ff", color: "#9333ea" }}>★</div>
            <div>
              <small>Health Rating</small>
              <strong>Good</strong>
              <p>Vitals Normal</p>
            </div>
          </div>
        </div>

        {(tab === "dashboard" || tab === "appointments") && (
          <div className="dashboard-lower">
            <div className="box-card">
              <div className="box-head">
                <h2>My Scheduled Appointments</h2>
                <button className="view-all" onClick={() => setShowBookModal(true)}>+ Book New</button>
              </div>
              {myAppointments.map(a => (
                <div key={a.id} className="appointment-line">
                  <strong>{a.time}</strong>
                  <div>
                    <strong>{a.doctor}</strong>
                    <small>{a.dept} • {a.date}</small>
                  </div>
                  <span className="status-pill green">{a.status}</span>
                </div>
              ))}
            </div>

            <div className="box-card">
              <div className="box-head">
                <h2>Recent Lab Results</h2>
              </div>
              {myReports.map((r, i) => (
                <div key={i} className="record-line">
                  <div className="report-icon" style={{ background: "#e0f2fe", color: "#0284c7" }}>⚗</div>
                  <div>
                    <strong>{r.title}</strong>
                    <small>{r.date} • {r.doctor}</small>
                  </div>
                  <button className="table-action" onClick={() => notify(`Downloading ${r.title}`)}>Download</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "prescriptions" && (
          <div className="box-card" style={{ marginTop: 16 }}>
            <div className="box-head">
              <h2>Active Medical Prescriptions</h2>
            </div>
            <table className="clean-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Prescribing Doctor</th>
                  <th>Dosage Instructions</th>
                  <th>Prescribed Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myPrescriptions.map((m, i) => (
                  <tr key={i}>
                    <td><strong>{m.medicine}</strong></td>
                    <td>{m.doctor}</td>
                    <td>{m.dosage}</td>
                    <td>{m.date}</td>
                    <td><button className="table-action" onClick={() => notify(`Prescription refill requested for ${m.medicine}`)}>Refill</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showBookModal && (
        <div className="modal-backdrop" onClick={() => setShowBookModal(false)}>
          <div className="modal small-modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setShowBookModal(false)}>×</button>
            <div className="eyebrow">PATIENT PORTAL</div>
            <h2>Book Doctor Appointment</h2>
            <form onSubmit={handleBook}>
              <label>
                Select Doctor
                <select value={bookingForm.doctor} onChange={e => setBookingForm({ ...bookingForm, doctor: e.target.value })}>
                  <option value="Dr. Anam Khandakar">Dr. Anam Khandakar (Internal Medicine)</option>
                  <option value="Dr. Amit Verma">Dr. Amit Verma (Cardiology)</option>
                  <option value="Dr. Riya Sen">Dr. Riya Sen (Dermatology)</option>
                </select>
              </label>
              <label>
                Preferred Date
                <input type="date" value={bookingForm.date} onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })} />
              </label>
              <label>
                Preferred Time Slot
                <select value={bookingForm.time} onChange={e => setBookingForm({ ...bookingForm, time: e.target.value })}>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </label>
              <label>
                Reason for Visit
                <input value={bookingForm.reason} onChange={e => setBookingForm({ ...bookingForm, reason: e.target.value })} placeholder="e.g. Annual Checkup, Fever" />
              </label>
              <button type="submit" className="primary-btn" style={{ background: "#0284c7", width: "100%" }}>
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function LabPortal({ userName, onLogout, onSwitchPortal, notify }) {
  const [tab, setTab] = useState("queue");
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [resultVal, setResultVal] = useState("");

  const [testRequests, setTestRequests] = useState([
    { id: "LAB-1092", patient: "Rahul Sharma", test: "Fasting Blood Glucose", priority: "Urgent", doctor: "Dr. Anam Khandakar", status: "Pending" },
    { id: "LAB-1093", patient: "Riya Sen", test: "Lipid Profile", priority: "Normal", doctor: "Dr. Anam Khandakar", status: "Pending" },
    { id: "LAB-1094", patient: "Amit Verma", test: "Thyroid Panel (TSH)", priority: "Normal", doctor: "Dr. Amit Verma", status: "Completed" }
  ]);

  const handleUploadResult = (e) => {
    e.preventDefault();
    if (!selectedRequest || !resultVal) return;
    setTestRequests(testRequests.map(tr => tr.id === selectedRequest.id ? { ...tr, status: "Completed" } : tr));
    setShowResultModal(false);
    notify(`Test result uploaded for ${selectedRequest.patient} (${selectedRequest.test})`);
    setResultVal("");
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" style={{ background: "linear-gradient(145deg, #d97706, #b45309)" }}>⚗</div>
          <span>HEALIX <small style={{ fontSize: 11, color: "#d97706" }}>LABS</small></span>
        </div>

        <nav className="topnav">
          {["Test Queue", "Completed Reports", "Equipment Catalog"].map(t => (
            <button
              key={t}
              className={`topnav-link ${tab === t.toLowerCase().replace(/\s+/g, "") ? "active" : ""}`}
              onClick={() => setTab(t.toLowerCase().replace(/\s+/g, ""))}
            >
              {t}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="switch-portal-btn" onClick={onSwitchPortal}>
            <span>⇄</span> Switch Portal
          </button>
          <div className="avatar" style={{ background: "#fef3c7", color: "#d97706" }}>VM</div>
          <button className="view-all" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="content" style={{ marginLeft: 0 }}>
        <div className="page-header">
          <div>
            <h1>Diagnostic Laboratory Operations</h1>
            <p>Technician workspace for sample intake, test processing & report generation.</p>
          </div>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>⚗</div>
            <div>
              <small>Pending Test Queue</small>
              <strong>{testRequests.filter(r => r.status === "Pending").length}</strong>
              <p>2 Urgent Samples</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>✓</div>
            <div>
              <small>Completed Today</small>
              <strong>28</strong>
              <p>Reported to Doctors</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#e0f2fe", color: "#0284c7" }}>⏱</div>
            <div>
              <small>Average Turnaround</small>
              <strong>42 mins</strong>
              <p>Target: 60 mins</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f3e8ff", color: "#9333ea" }}>⚙</div>
            <div>
              <small>Equipment Status</small>
              <strong>100%</strong>
              <p>All 4 Analyzers OK</p>
            </div>
          </div>
        </div>

        <div className="box-card">
          <div className="box-head">
            <h2>Diagnostic Test Orders & Processing Queue</h2>
          </div>
          <table className="clean-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Patient</th>
                <th>Test Requested</th>
                <th>Requesting Doctor</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {testRequests.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.id}</strong></td>
                  <td>{r.patient}</td>
                  <td>{r.test}</td>
                  <td>{r.doctor}</td>
                  <td><span className={`status ${r.priority === "Urgent" ? "blue" : "green"}`}>{r.priority}</span></td>
                  <td><span className={`status ${r.status === "Completed" ? "green" : "blue"}`}>{r.status}</span></td>
                  <td>
                    {r.status === "Pending" ? (
                      <button
                        className="table-action"
                        style={{ borderColor: "#d97706", color: "#d97706" }}
                        onClick={() => { setSelectedRequest(r); setShowResultModal(true); }}
                      >
                        Upload Result
                      </button>
                    ) : (
                      <span style={{ fontSize: 12, color: "#16a34a" }}>✓ Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showResultModal && selectedRequest && (
        <div className="modal-backdrop" onClick={() => setShowResultModal(false)}>
          <div className="modal small-modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setShowResultModal(false)}>×</button>
            <div className="eyebrow">LAB DIAGNOSTICS</div>
            <h2>Enter Test Result</h2>
            <p style={{ margin: "4px 0 16px" }}>Patient: <strong>{selectedRequest.patient}</strong> • {selectedRequest.test}</p>
            <form onSubmit={handleUploadResult}>
              <label>
                Measured Result Value / Notes
                <input
                  required
                  value={resultVal}
                  onChange={e => setResultVal(e.target.value)}
                  placeholder="e.g. 95 mg/dL (Normal Range 70-99)"
                />
              </label>
              <button type="submit" className="primary-btn" style={{ background: "#d97706", width: "100%" }}>
                Submit & Publish Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AuthScreen({
  role,
  setRole,
  authMode,
  setAuthMode,
  authData,
  setAuthData,
  authError,
  setAuthError,
  handleAuth,
  onForgot,
  modal,
  setModal,
  onBackToSelector
}) {
  const [showPassword, setShowPassword] = useState(false);

  const activeRoleObj = ROLES.find((r) => r.id === (role || "doctor")) || ROLES[0];
  const isLogin = authMode === "login";

  const switchMode = (mode) => {
    setAuthError("");
    setAuthMode(mode);
    setAuthData({ name: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
  };

  return (
    <div className={`auth-page theme-${activeRoleObj.id}`}>
      <section className="auth-side">
        <div className="auth-side-content">
          <div className="auth-brand auth-brand-side">
            <div className="brand-mark">{activeRoleObj.icon}</div>
            <span>HEALIX</span>
          </div>

          <div className="auth-copy">
            <h2>
              {activeRoleObj.title},
              <br />
              <em>made simpler.</em>
            </h2>

            <p>{activeRoleObj.subtitle}</p>

            <span className="auth-accent-line" aria-hidden="true"></span>
          </div>

          <div className="auth-trust">
            TRUSTED BY HEALTHCARE PROFESSIONALS.
            <br />
            BUILT FOR BETTER CARE.
          </div>
        </div>
      </section>

      <section className="auth-card">
        {/* Role Switcher Bar on Top of Auth Form */}
        <div className="role-switcher-bar">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`role-switch-btn ${role === r.id ? "active" : ""}`}
              onClick={() => {
                setRole(r.id);
                setAuthError("");
              }}
            >
              <span>{r.icon}</span>
              <span>{r.title.replace(" Portal", "")}</span>
            </button>
          ))}
        </div>

        <div className="auth-heading">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>{isLogin ? "Welcome back" : "Create account"}</h1>
            {onBackToSelector && (
              <button
                type="button"
                onClick={onBackToSelector}
                style={{ border: 0, background: "none", color: "#60767c", fontSize: 12, cursor: "pointer" }}
              >
                ← Change Portal
              </button>
            )}
          </div>

          <p>{isLogin ? activeRoleObj.portalSubtitle : `Create your account for ${activeRoleObj.title}.`}</p>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Authentication options">
          <button
            type="button"
            role="tab"
            aria-selected={isLogin}
            className={isLogin ? "auth-tab active" : "auth-tab"}
            onClick={() => switchMode("login")}
          >
            Log In
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={!isLogin}
            className={!isLogin ? "auth-tab active" : "auth-tab"}
            onClick={() => switchMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleAuth}>
          {!isLogin && (
            <label>
              Full Name
              <div className="auth-input-wrap">
                <span className="field-icon" aria-hidden="true">{activeRoleObj.icon}</span>
                <input
                  autoComplete="name"
                  value={authData.name}
                  onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                  placeholder={activeRoleObj.placeholderName}
                />
              </div>
            </label>
          )}

          <label>
            Email Address
            <div className="auth-input-wrap">
              <span className="field-icon" aria-hidden="true">✉</span>
              <input
                autoComplete="email"
                type="email"
                value={authData.email}
                onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                placeholder={activeRoleObj.demoEmail}
              />
            </div>
          </label>

          <label>
            Password
            <div className="auth-input-wrap">
              <span className="field-icon lock-icon" aria-hidden="true">▣</span>
              <input
                autoComplete={isLogin ? "current-password" : "new-password"}
                type={showPassword ? "text" : "password"}
                value={authData.password}
                onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </label>

          {!isLogin && (
            <label>
              Confirm Password
              <div className="auth-input-wrap">
                <span className="field-icon lock-icon" aria-hidden="true">▣</span>
                <input
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  value={authData.confirmPassword}
                  onChange={(e) => setAuthData({ ...authData, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                />
              </div>
            </label>
          )}

          {isLogin && (
            <div className="auth-options auth-options-right" style={{ flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <button type="button" onClick={onForgot}>Forgot password?</button>
              <button
                type="button"
                style={{ fontSize: 11, color: "#078a76", border: 0, background: "none", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setAuthData({ ...authData, email: activeRoleObj.demoEmail, password: activeRoleObj.demoPass })}
              >
                Auto-fill Demo Credentials ({activeRoleObj.demoEmail})
              </button>
            </div>
          )}

          {authError && <div className="auth-error">{authError}</div>}

          <button className="auth-submit" type="submit">
            <span>{isLogin ? "Log In" : "Create Account"}</span>
            <b>→</b>
          </button>
        </form>

        <div className="auth-divider">
          <span></span>
          <em>or</em>
          <span></span>
        </div>

        <div className="auth-footer">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <button type="button" onClick={() => switchMode(isLogin ? "signup" : "login")}>
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </section>

      {modal === "reset" && (
        <SimpleModal
          title="Reset Password"
          eyebrow="ACCOUNT"
          onClose={() => setModal(null)}
        >
          <p>
            Enter your registered email to request a password reset.
          </p>

          <label>
            Email Address
            <input type="email" placeholder={activeRoleObj.demoEmail} />
          </label>

          <button className="primary-btn" onClick={() => setModal(null)}>
            Send Reset Link
          </button>
        </SimpleModal>
      )}
    </div>
  );
}

function Dashboard({
  doctorName,
  patients,
  appointments,
  onNav,
  onAppointment,
  onPrescription,
  onPatient
}) {
  return (
    <>
      <section className="dashboard-welcome">
        <div>
          <div className="eyebrow">
            DOCTOR PRACTICE DASHBOARD
          </div>

          <h1>
            Welcome back,{" "}
            <em>{doctorName}</em>
          </h1>

          <p>
            Here is your daily clinical overview.
            You have{" "}
            <strong>
              {Math.max(
                3,
                appointments.length
              )}{" "}
              appointments
            </strong>{" "}
            scheduled today and{" "}
            <strong>
              4 diagnostic reports
            </strong>{" "}
            pending review.
          </p>
        </div>

        <div className="welcome-note">
          Small steps
          <br />
          make a big difference.
        </div>
      </section>

      <div className="quick-actions-row">
        <button
          className="quick-primary"
          onClick={onAppointment}
        >
          ▣{" "}
          <span>
            Schedule Appointment
          </span>{" "}
          →
        </button>

        <button onClick={onPrescription}>
          ▤{" "}
          <span>
            Write Prescription
          </span>{" "}
          →
        </button>

        <button
          onClick={() =>
            onNav("Test Reports")
          }
        >
          ⚗{" "}
          <span>
            Order Lab Test
          </span>{" "}
          →
        </button>

        <button onClick={onPatient}>
          ♙+{" "}
          <span>
            New Patient
          </span>{" "}
          →
        </button>
      </div>

      <div className="stat-grid">
        <Stat
          icon="♙"
          title="Total Patients"
          value={patients.length}
          note="↑ +3 this month"
        />

        <Stat
          icon="▣"
          title="Today's Appointments"
          value={Math.max(
            3,
            appointments.length
          )}
          note="6 total on record"
        />

        <Stat
          icon="▤"
          title="Active Prescriptions"
          value="3"
          note="All verified"
        />

        <Stat
          icon="⚗"
          title="Lab Reports"
          value="4"
          note="6 pending review"
        />
      </div>

      <div className="dashboard-lower">
        <section className="box-card">
          <div className="box-head">
            <h2>
              Today's Appointment Schedule
            </h2>

            <button
              onClick={() =>
                onNav("Appointments")
              }
            >
              View All Appointments →
            </button>
          </div>

          <table className="clean-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Patient</th>
                <th>Age</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {[
                [
                  "10:00 AM",
                  "Riya Sen",
                  "28",
                  "General Checkup",
                  "Upcoming"
                ],
                [
                  "12:30 PM",
                  "Amit Verma",
                  "52",
                  "Follow-up (Cardio)",
                  "Upcoming"
                ],
                [
                  "02:00 PM",
                  "Neha Roy",
                  "34",
                  "Emergency Review",
                  "In Progress"
                ]
              ].map((r) => (
                <tr key={r[1]}>
                  {r.map((v, i) => (
                    <td key={i}>
                      {i === 4 ? (
                        <span
                          className={`status ${
                            v === "In Progress"
                              ? "green"
                              : "blue"
                          }`}
                        >
                          {v}
                        </span>
                      ) : (
                        v
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="box-card pulse">
          <div className="box-head">
            <h2>Clinic Pulse</h2>
          </div>

          <div className="pulse-item">
            <span>♙</span>

            <div>
              <small>Active Now</small>
              <strong>96%</strong>
              <p>Adherence Rate</p>
            </div>
          </div>

          <div className="pulse-item">
            <span>★</span>

            <div>
              <strong>4.8 / 5</strong>
              <p>Patient Rating</p>
            </div>

            <small>
              Based on 142 reviews
            </small>
          </div>
        </section>
      </div>
    </>
  );
}

function Stat({
  icon,
  title,
  value,
  note
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <small>{title}</small>
        <strong>{value}</strong>
        <p>{note}</p>
      </div>
    </div>
  );
}

function PatientsPage({
  patients,
  onAdd,
  onView
}) {
  return (
    <>
      <PageHeader
        eyebrow="PATIENT MANAGEMENT"
        title="My Patients"
        text={`${patients.length} patient records available in your practice.`}
        action="+ Add Patient"
        onAction={onAdd}
      />

      <div className="stat-grid">
        <Stat
          icon="♙"
          title="Total Patients"
          value={patients.length}
          note="Active records"
        />

        <Stat
          icon="+"
          title="New This Month"
          value="3"
          note="Growing practice"
        />

        <Stat
          icon="▣"
          title="Follow-ups"
          value="4"
          note="Due soon"
        />

        <Stat
          icon="✓"
          title="Records Complete"
          value="98%"
          note="Verified profiles"
        />
      </div>

      <section className="box-card">
        <div className="box-head">
          <h2>Patient Directory</h2>
          <button>Export →</button>
        </div>

        <table className="clean-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>ID</th>
              <th>Age / Gender</th>
              <th>Condition</th>
              <th>Next</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>
                    {p.name}
                  </strong>
                </td>

                <td>{p.id}</td>

                <td>
                  {p.age} · {p.gender}
                </td>

                <td>{p.condition}</td>

                <td>{p.next}</td>

                <td>
                  <button
                    className="table-action"
                    onClick={() =>
                      onView(p)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

function PageHeader({
  eyebrow,
  title,
  text,
  action,
  onAction
}) {
  return (
    <section className="page-header">
      <div>
        <div className="eyebrow">
          {eyebrow}
        </div>

        <h1>{title}</h1>

        <p>{text}</p>
      </div>

      {action && (
        <button
          className="primary-btn header-action"
          onClick={onAction}
        >
          {action}
        </button>
      )}
    </section>
  );
}

function SectionPage({
  type,
  patients,
  appointments,
  medications,
  reports,
  onAddPatient,
  onAppointment,
  onPrescription,
  onViewPatient,
  onReport,
  onNotify
}) {
  if (type === "Appointments")
    return (
      <>
        <PageHeader
          eyebrow="SCHEDULE"
          title="Appointments"
          text="Manage today's visits and upcoming consultations."
          action="+ Book Appointment"
          onAction={onAppointment}
        />

        <div className="stat-grid">
          <Stat
            icon="▣"
            title="Today"
            value="3"
            note="Scheduled visits"
          />

          <Stat
            icon="✓"
            title="Confirmed"
            value="2"
            note="Ready for consultation"
          />

          <Stat
            icon="◷"
            title="Upcoming"
            value="4"
            note="Next 7 days"
          />
        </div>

        <section className="box-card">
          <div className="box-head">
            <h2>
              Appointment Schedule
            </h2>
          </div>

          {[
            [
              "10:00 AM",
              "Riya Sen",
              "General Checkup",
              "Upcoming"
            ],
            [
              "12:30 PM",
              "Amit Verma",
              "Cardiology Follow-up",
              "Upcoming"
            ],
            [
              "02:00 PM",
              "Neha Roy",
              "Emergency Review",
              "In Progress"
            ],
            ...appointments.map(
              (a) => [
                a.time,
                a.patient,
                a.type,
                a.status
              ]
            )
          ].map((a, i) => (
            <div
              className="appointment-line"
              key={i}
            >
              <strong>{a[0]}</strong>

              <div>
                <b>{a[1]}</b>
                <small>{a[2]}</small>
              </div>

              <span className="status blue">
                {a[3]}
              </span>
            </div>
          ))}
        </section>
      </>
    );

  if (type === "Medical Records")
    return (
      <>
        <PageHeader
          eyebrow="CLINICAL RECORDS"
          title="Medical Records"
          text="Review patient histories, visits and clinical documentation."
        />

        <section className="box-card">
          <div className="box-head">
            <h2>
              Recent Patient Records
            </h2>
          </div>

          {patients
            .slice(0, 6)
            .map((p) => (
              <div
                className="record-line"
                key={p.id}
              >
                <div className="avatar small">
                  {p.name
                    .split(" ")
                    .map(
                      (x) => x[0]
                    )
                    .join("")}
                </div>

                <div>
                  <b>{p.name}</b>
                  <small>
                    {p.id} · {p.condition}
                  </small>
                </div>

                <button
                  className="table-action"
                  onClick={() =>
                    onViewPatient(p)
                  }
                >
                  Open Record
                </button>
              </div>
            ))}
        </section>
      </>
    );

  if (type === "Prescriptions")
    return (
      <>
        <PageHeader
          eyebrow="CLINICAL"
          title="Prescriptions"
          text="Manage active medication plans and create prescriptions."
          action="+ Write Prescription"
          onAction={onPrescription}
        />

        <section className="box-card">
          <div className="box-head">
            <h2>
              Active Prescriptions
            </h2>
          </div>

          <table className="clean-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Start Date</th>
              </tr>
            </thead>

            <tbody>
              {medications.map(
                (m, i) => (
                  <tr key={i}>
                    {m.map((x, j) => (
                      <td key={j}>
                        {x}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      </>
    );

  if (type === "Test Reports")
    return (
      <>
        <PageHeader
          eyebrow="LAB & IMAGING"
          title="Test Reports"
          text="Review uploaded diagnostic and laboratory reports."
        />

        <section className="box-card">
          <div className="box-head">
            <h2>
              Recent Reports
            </h2>
          </div>

          {reports.map((r) => (
            <div
              className="record-line"
              key={r.name}
            >
              <div className="report-icon">
                ⚗
              </div>

              <div>
                <b>{r.name}</b>
                <small>
                  {r.date} · {r.status}
                </small>
              </div>

              <button
                className="table-action"
                onClick={() =>
                  onReport(r)
                }
              >
                View Report
              </button>
            </div>
          ))}
        </section>
      </>
    );

  if (type === "Doctor Ratings")
    return (
      <>
        <PageHeader
          eyebrow="FEEDBACK"
          title="Doctor Ratings"
          text="Review patient feedback and your practice rating."
        />

        <section className="rating-page">
          <div className="rating-big">
            <strong>4.8</strong>
            <span>★★★★★</span>
            <small>
              Based on 142 reviews
            </small>
          </div>

          <div className="box-card">
            <div className="review">
              <b>
                “Thank you for making
                healthcare more human.”
              </b>

              <small>
                Verified patient · Recent
                review
              </small>
            </div>

            <div className="review">
              <b>
                “Clear explanation and helpful
                consultation.”
              </b>

              <small>
                Verified patient · Recent
                review
              </small>
            </div>
          </div>
        </section>
      </>
    );

  if (type === "Notifications")
    return (
      <>
        <PageHeader
          eyebrow="UPDATES"
          title="Notifications"
          text="Stay updated with appointments, reports and system activity."
        />

        <section className="box-card notification-page">
          <Notice
            title="Appointment reminder"
            text="Rahul Sharma · 28 Sep 2026 · 10:00 AM"
          />

          <Notice
            title="New test report"
            text="CBC report uploaded · 12 Aug 2026"
          />

          <Notice
            title="System update"
            text="HEALIX dashboard is up to date."
          />
        </section>
      </>
    );

  return (
    <>
      <PageHeader
        eyebrow="PREFERENCES"
        title="Settings"
        text="Manage your HEALIX profile and dashboard preferences."
      />

      <section className="box-card settings-page">
        <div className="settings-summary">
          <div>
            <b>
              {patients.length} patients
            </b>

            <small>
              Practice data is stored locally
              in this demo.
            </small>
          </div>

          <button
            className="table-action"
            onClick={() =>
              onNotify(
                "Open Settings from the doctor menu to edit preferences"
              )
            }
          >
            Edit Preferences
          </button>
        </div>

        <div className="settings-overview-grid">
          <div>
            <small>
              Clinic / Department
            </small>

            <strong>
              Healix Medical Centre ·
              Internal Medicine
            </strong>
          </div>

          <div>
            <small>
              Consultation Hours
            </small>

            <strong>
              09:00 – 17:00
            </strong>
          </div>

          <div>
            <small>
              Appointment Duration
            </small>

            <strong>
              30 minutes
            </strong>
          </div>

          <div>
            <small>
              Notifications
            </small>

            <strong>
              Appointment, reminders &
              reports enabled
            </strong>
          </div>
        </div>
      </section>
    </>
  );
}

function Notice({ title, text }) {
  return (
    <div className="notice">
      <span>•</span>

      <div>
        <b>{title}</b>
        <small>{text}</small>
      </div>
    </div>
  );
}

function PatientDetails({
  patient,
  onBack,
  onAppointment,
  onPrescription
}) {
  return (
    <>
      <button
        className="back-link"
        onClick={onBack}
      >
        ← Back to My Patients
      </button>

      <PageHeader
        eyebrow="PATIENT DETAILS"
        title={patient.name}
        text={`${patient.id} · Complete patient profile and clinical information.`}
        action="+ New Visit"
        onAction={onAppointment}
      />

      <section className="patient-detail-grid">
        <div className="box-card detail-main">
          <div className="detail-top">
            <div className="patient-avatar">
              {patient.name
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </div>

            <div>
              <h2>
                {patient.name}
              </h2>

              <p>
                {patient.id} · {patient.age}{" "}
                years · {patient.gender}
              </p>
            </div>
          </div>

          <div className="detail-fields">
            <div>
              <small>Phone</small>
              <b>{patient.phone}</b>
            </div>

            <div>
              <small>Email</small>
              <b>{patient.email}</b>
            </div>

            <div>
              <small>Blood Group</small>
              <b>{patient.blood}</b>
            </div>

            <div>
              <small>Allergies</small>
              <b>
                {patient.allergies}
              </b>
            </div>
          </div>
        </div>

        <div className="box-card">
          <div className="box-head">
            <h2>Quick Actions</h2>
          </div>

          <button
            className="detail-action"
            onClick={onPrescription}
          >
            Write Prescription →
          </button>

          <button
            className="detail-action"
            onClick={onAppointment}
          >
            Schedule Visit →
          </button>

          <button className="detail-action">
            Add Clinical Note →
          </button>
        </div>
      </section>

      <div className="dashboard-lower">
        <section className="box-card">
          <div className="box-head">
            <h2>Medical History</h2>
            <button>Edit</button>
          </div>

          <div className="history-row">
            <b>2024</b>

            <div>
              <strong>
                Type 2 Diabetes Mellitus
              </strong>

              <small>
                On medication (Metformin)
              </small>
            </div>
          </div>

          <div className="history-row">
            <b>2023</b>

            <div>
              <strong>
                Hypertension
              </strong>

              <small>
                On Amlodipine 5mg
              </small>
            </div>
          </div>

          <div className="history-row">
            <b>2022</b>

            <div>
              <strong>
                Acute Gastritis
              </strong>

              <small>
                Treated and recovered
              </small>
            </div>
          </div>
        </section>

        <section className="box-card">
          <div className="box-head">
            <h2>
              Current Medications
            </h2>
          </div>

          <div className="med-mini">
            <b>Metformin</b>
            <small>
              500 mg · Twice daily
            </small>
          </div>

          <div className="med-mini">
            <b>Amlodipine</b>
            <small>
              5 mg · Once daily
            </small>
          </div>
        </section>
      </div>
    </>
  );
}

function Modal({
  modal,
  setModal,
  patientForm,
  setPatientForm,
  patientError,
  addPatient,
  visitForm,
  setVisitForm,
  saveVisit,
  prescriptionForm,
  setPrescriptionForm,
  addPrescription,
  settings,
  setSettings,
  settingsTab,
  setSettingsTab,
  profile,
  setProfile,
  notify
}) {
  if (modal === "patient")
    return (
      <SimpleModal
        title="Add New Patient"
        eyebrow="HEALIX / DOCTOR"
        onClose={() =>
          setModal(null)
        }
      >
        <form onSubmit={addPatient}>
          <label>
            Name

            <input
              value={patientForm.name}
              onChange={(e) =>
                setPatientForm({
                  ...patientForm,
                  name: e.target.value
                })
              }
              placeholder="Enter name"
            />
          </label>

          <label>
            Email

            <input
              type="email"
              value={patientForm.email}
              onChange={(e) =>
                setPatientForm({
                  ...patientForm,
                  email: e.target.value
                })
              }
              placeholder="patient@example.com"
            />
          </label>

          <div className="two-fields">
            <label>
              Age

              <input
                type="number"
                value={patientForm.age}
                onChange={(e) =>
                  setPatientForm({
                    ...patientForm,
                    age: e.target.value
                  })
                }
                placeholder="Age"
              />
            </label>

            <label>
              Phone

              <input
                value={patientForm.phone}
                onChange={(e) =>
                  setPatientForm({
                    ...patientForm,
                    phone: e.target.value
                  })
                }
                placeholder="+91"
              />
            </label>
          </div>

          {patientError && (
            <div className="auth-error">
              {patientError}
            </div>
          )}

          <button
            className="primary-btn"
            type="submit"
          >
            Save & Continue
          </button>
        </form>
      </SimpleModal>
    );

  if (modal === "appointment")
    return (
      <SimpleModal
        title="Schedule Patient Visit"
        eyebrow="NEW VISIT"
        onClose={() =>
          setModal(null)
        }
      >
        <form onSubmit={saveVisit}>
          <label>
            Patient

            <select
              value={visitForm.patient}
              onChange={(e) =>
                setVisitForm({
                  ...visitForm,
                  patient:
                    e.target.value
                })
              }
            >
              <option>
                Rahul Sharma
              </option>

              <option>
                Riya Sen
              </option>

              <option>
                Amit Verma
              </option>

              <option>
                Neha Roy
              </option>
            </select>
          </label>

          <label>
            Date

            <input
              type="date"
              value={visitForm.date}
              onChange={(e) =>
                setVisitForm({
                  ...visitForm,
                  date: e.target.value
                })
              }
            />
          </label>

          <label>
            Time

            <input
              type="time"
              value={visitForm.time}
              onChange={(e) =>
                setVisitForm({
                  ...visitForm,
                  time: e.target.value
                })
              }
            />
          </label>

          <label>
            Visit Type

            <select
              value={visitForm.type}
              onChange={(e) =>
                setVisitForm({
                  ...visitForm,
                  type: e.target.value
                })
              }
            >
              <option>
                Consultation
              </option>

              <option>
                Follow-up
              </option>

              <option>
                Review
              </option>
            </select>
          </label>

          <button
            className="primary-btn"
            type="submit"
          >
            Confirm Visit
          </button>
        </form>
      </SimpleModal>
    );

  if (modal === "prescription")
    return (
      <SimpleModal
        title="Write Prescription"
        eyebrow="CLINICAL"
        onClose={() =>
          setModal(null)
        }
      >
        <form onSubmit={addPrescription}>
          <label>
            Medicine

            <input
              value={
                prescriptionForm.medicine
              }
              onChange={(e) =>
                setPrescriptionForm({
                  ...prescriptionForm,
                  medicine:
                    e.target.value
                })
              }
              placeholder="Medicine name"
            />
          </label>

          <div className="two-fields">
            <label>
              Dosage

              <input
                value={
                  prescriptionForm.dosage
                }
                onChange={(e) =>
                  setPrescriptionForm({
                    ...prescriptionForm,
                    dosage:
                      e.target.value
                  })
                }
                placeholder="e.g. 500 mg"
              />
            </label>

            <label>
              Frequency

              <select
                value={
                  prescriptionForm.frequency
                }
                onChange={(e) =>
                  setPrescriptionForm({
                    ...prescriptionForm,
                    frequency:
                      e.target.value
                  })
                }
              >
                <option>
                  Once daily
                </option>

                <option>
                  Twice daily
                </option>

                <option>
                  Three times daily
                </option>
              </select>
            </label>
          </div>

          <label>
            Instructions

            <textarea
              value={
                prescriptionForm.instructions
              }
              onChange={(e) =>
                setPrescriptionForm({
                  ...prescriptionForm,
                  instructions:
                    e.target.value
                })
              }
            />
          </label>

          <button className="primary-btn">
            Save Prescription
          </button>
        </form>
      </SimpleModal>
    );

  if (
    modal &&
    typeof modal === "object" &&
    modal.type === "report"
  )
    return (
      <SimpleModal
        title={modal.report.name}
        eyebrow="TEST REPORT"
        onClose={() =>
          setModal(null)
        }
      >
        <div className="report-preview">
          <div className="report-line">
            <span>Patient</span>
            <strong>
              Rahul Sharma
            </strong>
          </div>

          <div className="report-line">
            <span>Date</span>
            <strong>
              {modal.report.date}
            </strong>
          </div>

          <div className="result-ok">
            ✓ {modal.report.status}
          </div>
        </div>
      </SimpleModal>
    );

  if (modal === "settings")
    return (
      <SettingsModal
        settings={settings}
        setSettings={setSettings}
        activeTab={settingsTab}
        setActiveTab={setSettingsTab}
        onClose={() =>
          setModal(null)
        }
        onSave={() => {
          setModal(null);
          notify(
            "Settings saved successfully"
          );
        }}
      />
    );

  if (modal === "profile")
    return (
      <ProfileModal
        profile={profile}
        setProfile={setProfile}
        onClose={() =>
          setModal(null)
        }
        onSave={() => {
          const clean = {
            ...profile,
            name:
              profile.name
                .replace(
                  /^Dr\.\s*/i,
                  ""
                )
                .trim() ||
              "Anam Khandakar"
          };

          setProfile(clean);

          localStorage.setItem(
            "healix_user_name",
            clean.name
          );

          const email = (
            localStorage.getItem(
              "healix_current_user"
            ) || clean.email
          ).toLowerCase();

          try {
            const users =
              JSON.parse(
                localStorage.getItem(
                  "healix_users"
                ) || "{}"
              );

            if (users[email]) {
              users[email].name =
                clean.name;

              localStorage.setItem(
                "healix_users",
                JSON.stringify(users)
              );
            }
          } catch {}

          setModal(null);

          notify(
            "Profile saved successfully"
          );
        }}
      />
    );

  return null;
}

function ProfileModal({
  profile,
  setProfile,
  onClose,
  onSave
}) {
  const update = (
    key,
    value
  ) =>
    setProfile((p) => ({
      ...p,
      [key]: value
    }));

  return (
    <SimpleModal
      title="My Profile"
      eyebrow="ACCOUNT"
      onClose={onClose}
    >
      <div className="profile-modal-avatar">
        <div className="avatar large">
          {profile.name
            .replace(/^Dr\.\s*/i, "")
            .split(/\s+/)
            .map((x) => x[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div>
          <b>
            {profile.name.startsWith("Dr.")
              ? profile.name
              : `Dr. ${profile.name}`}
          </b>

          <small>
            Professional profile
          </small>
        </div>
      </div>

      <div className="two-fields">
        <label>
          Doctor Name
          <input
            value={profile.name}
            onChange={(e) =>
              update(
                "name",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Specialization
          <input
            value={
              profile.specialization
            }
            onChange={(e) =>
              update(
                "specialization",
                e.target.value
              )
            }
          />
        </label>
      </div>

      <div className="two-fields">
        <label>
          Qualification
          <input
            value={
              profile.qualification
            }
            onChange={(e) =>
              update(
                "qualification",
                e.target.value
              )
            }
            placeholder="e.g. MBBS, MD"
          />
        </label>

        <label>
          Medical Registration No.
          <input
            value={
              profile.registration
            }
            onChange={(e) =>
              update(
                "registration",
                e.target.value
              )
            }
          />
        </label>
      </div>

      <div className="two-fields">
        <label>
          Years of Experience
          <input
            value={profile.experience}
            onChange={(e) =>
              update(
                "experience",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Hospital / Clinic
          <input
            value={profile.hospital}
            onChange={(e) =>
              update(
                "hospital",
                e.target.value
              )
            }
          />
        </label>
      </div>

      <div className="two-fields">
        <label>
          Department
          <input
            value={profile.department}
            onChange={(e) =>
              update(
                "department",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Phone Number
          <input
            value={profile.phone}
            onChange={(e) =>
              update(
                "phone",
                e.target.value
              )
            }
          />
        </label>
      </div>

      <label>
        Email
        <input
          type="email"
          value={profile.email}
          onChange={(e) =>
            update(
              "email",
              e.target.value
            )
          }
        />
      </label>

      <div className="two-fields">
        <label>
          Consultation Fee
          <input
            value={profile.fee}
            onChange={(e) =>
              update(
                "fee",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Consultation Mode
          <select
            value={profile.mode}
            onChange={(e) =>
              update(
                "mode",
                e.target.value
              )
            }
          >
            <option>
              In-person & Online
            </option>

            <option>
              In-person only
            </option>

            <option>
              Online only
            </option>
          </select>
        </label>
      </div>

      <label>
        Professional Bio
        <textarea
          value={profile.bio}
          onChange={(e) =>
            update(
              "bio",
              e.target.value
            )
          }
          placeholder="Short professional introduction"
        />
      </label>

      <button
        className="primary-btn"
        onClick={onSave}
      >
        Save Profile
      </button>
    </SimpleModal>
  );
}

function SettingsModal({
  settings,
  setSettings,
  activeTab,
  setActiveTab,
  onClose,
  onSave
}) {
  const update = (
    key,
    value
  ) =>
    setSettings((s) => ({
      ...s,
      [key]: value
    }));

  const tabs = [
    ["professional", "Professional"],
    ["availability", "Appointments"],
    ["notifications", "Notifications"],
    ["prescription", "Prescription"],
    ["security", "Account & Security"]
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div
        className="modal settings-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="eyebrow">
          PREFERENCES
        </div>

        <h2>Settings</h2>

        <div className="settings-layout">
          <div className="settings-tabs">
            {tabs.map(
              ([id, label]) => (
                <button
                  key={id}
                  className={
                    activeTab === id
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(id)
                  }
                >
                  {label}
                </button>
              )
            )}

            <button
              className={
                activeTab ===
                "appearance"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab(
                  "appearance"
                )
              }
            >
              Appearance
            </button>
          </div>

          <div className="settings-panel">
            {activeTab ===
              "professional" && (
              <>
                <h3>
                  Professional Information
                </h3>

                <p>
                  Set the clinic and
                  department shown across
                  your doctor portal.
                </p>

                <label>
                  Clinic / Hospital

                  <input
                    value={
                      settings.clinic
                    }
                    onChange={(e) =>
                      update(
                        "clinic",
                        e.target.value
                      )
                    }
                  />
                </label>

                <label>
                  Department

                  <input
                    value={
                      settings.department
                    }
                    onChange={(e) =>
                      update(
                        "department",
                        e.target.value
                      )
                    }
                  />
                </label>
              </>
            )}

            {activeTab ===
              "availability" && (
              <>
                <h3>
                  Availability &
                  Appointments
                </h3>

                <p>
                  Configure your
                  consultation schedule.
                </p>

                <label>
                  Working Days

                  <input
                    value={
                      settings.workingDays
                    }
                    onChange={(e) =>
                      update(
                        "workingDays",
                        e.target.value
                      )
                    }
                  />
                </label>

                <div className="two-fields">
                  <label>
                    Start Time

                    <input
                      type="time"
                      value={
                        settings.startTime
                      }
                      onChange={(e) =>
                        update(
                          "startTime",
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    End Time

                    <input
                      type="time"
                      value={
                        settings.endTime
                      }
                      onChange={(e) =>
                        update(
                          "endTime",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <div className="two-fields">
                  <label>
                    Appointment Duration

                    <select
                      value={
                        settings.duration
                      }
                      onChange={(e) =>
                        update(
                          "duration",
                          e.target.value
                        )
                      }
                    >
                      <option>
                        15 minutes
                      </option>
                      <option>
                        30 minutes
                      </option>
                      <option>
                        45 minutes
                      </option>
                      <option>
                        60 minutes
                      </option>
                    </select>
                  </label>

                  <label>
                    Maximum Patients /
                    Day

                    <input
                      type="number"
                      value={
                        settings.maxPatients
                      }
                      onChange={(e) =>
                        update(
                          "maxPatients",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <label className="setting-check">
                  <input
                    type="checkbox"
                    checked={
                      settings.appointmentNotifications
                    }
                    onChange={(e) =>
                      update(
                        "appointmentNotifications",
                        e.target.checked
                      )
                    }
                  />

                  Allow appointment
                  notifications
                </label>
              </>
            )}

            {activeTab ===
              "notifications" && (
              <>
                <h3>
                  Notifications
                </h3>

                <p>
                  Choose which events
                  should notify you.
                </p>

                <Toggle
                  label="New appointment"
                  checked={
                    settings.appointmentNotifications
                  }
                  onChange={(v) =>
                    update(
                      "appointmentNotifications",
                      v
                    )
                  }
                />

                <Toggle
                  label="Appointment reminders"
                  checked={
                    settings.appointmentReminders
                  }
                  onChange={(v) =>
                    update(
                      "appointmentReminders",
                      v
                    )
                  }
                />

                <Toggle
                  label="Patient messages"
                  checked={
                    settings.patientMessages
                  }
                  onChange={(v) =>
                    update(
                      "patientMessages",
                      v
                    )
                  }
                />

                <Toggle
                  label="Test reports available"
                  checked={
                    settings.testReports
                  }
                  onChange={(v) =>
                    update(
                      "testReports",
                      v
                    )
                  }
                />

                <Toggle
                  label="System alerts"
                  checked={
                    settings.systemAlerts
                  }
                  onChange={(v) =>
                    update(
                      "systemAlerts",
                      v
                    )
                  }
                />
              </>
            )}

            {activeTab ===
              "prescription" && (
              <>
                <h3>
                  Prescription Preferences
                </h3>

                <p>
                  Control defaults used
                  when creating
                  prescriptions.
                </p>

                <label>
                  Default Follow-up
                  Duration

                  <select
                    value={
                      settings.followUp
                    }
                    onChange={(e) =>
                      update(
                        "followUp",
                        e.target.value
                      )
                    }
                  >
                    <option>
                      3 days
                    </option>

                    <option>
                      7 days
                    </option>

                    <option>
                      14 days
                    </option>

                    <option>
                      30 days
                    </option>
                  </select>
                </label>

                <Toggle
                  label="Add digital signature"
                  checked={
                    settings.prescriptionSignature
                  }
                  onChange={(v) =>
                    update(
                      "prescriptionSignature",
                      v
                    )
                  }
                />

                <Toggle
                  label="Show clinic details on prescription"
                  checked={
                    settings.showClinicDetails
                  }
                  onChange={(v) =>
                    update(
                      "showClinicDetails",
                      v
                    )
                  }
                />
              </>
            )}

            {activeTab === "security" && (
              <>
                <h3>
                  Account & Security
                </h3>

                <p>
                  Manage account access
                  from the doctor portal.
                </p>

                <button
                  className="secondary-btn"
                  onClick={() =>
                    alert(
                      "Password change flow can be connected to your backend here."
                    )
                  }
                >
                  Change Password
                </button>

                <button
                  className="secondary-btn"
                  onClick={() =>
                    alert(
                      "All other active sessions have been signed out in this demo."
                    )
                  }
                >
                  Logout from All Devices
                </button>

                <div className="security-note">
                  Your profile and
                  preferences are stored
                  locally for this frontend
                  demo.
                </div>
              </>
            )}

            {activeTab ===
              "appearance" && (
              <>
                <h3>Appearance</h3>

                <p>
                  Adjust how the dashboard
                  is displayed.
                </p>

                <Toggle
                  label="Compact dashboard view"
                  checked={
                    settings.compact
                  }
                  onChange={(v) =>
                    update(
                      "compact",
                      v
                    )
                  }
                />

                <div className="security-note">
                  HEALIX currently uses
                  its default light
                  clinical theme.
                </div>
              </>
            )}

            <button
              className="primary-btn settings-save"
              onClick={onSave}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange
}) {
  return (
    <label className="toggle-row">
      <span>{label}</span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(
            e.target.checked
          )
        }
      />
    </label>
  );
}

function SimpleModal({
  title,
  eyebrow,
  onClose,
  children
}) {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="eyebrow">
          {eyebrow}
        </div>

        <h2>{title}</h2>

        {children}
      </div>
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);