/**
 * VehicleHub - Authentication Module (auth.js)
 * Handles Registration, Login, Session Verification, and Logout using Supabase Auth.
 */

// Helper: Check current authenticated user session
async function getCurrentUser() {
  if (isSupabaseConfigured() && supabaseClient) {
    try {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      if (session && session.user) {
        return {
          id: session.user.id,
          email: session.user.email,
          fullName: session.user.user_metadata?.full_name || session.user.email.split("@")[0]
        };
      }
      return null;
    } catch (err) {
      console.warn("Supabase session check error:", err);
      return null;
    }
  }

  // Academic Demo / Fallback Mode (when Supabase credentials are placeholder)
  const storedUser = localStorage.getItem("vehiclehub_demo_user") || localStorage.getItem("autofinder_demo_user");
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Guard: Redirect to login.html if user is NOT authenticated
async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    // Save intended destination
    const currentPath = window.location.pathname.split("/").pop();
    if (currentPath && currentPath !== "login.html" && currentPath !== "register.html" && currentPath !== "index.html") {
      sessionStorage.setItem("vehiclehub_redirect", window.location.href);
    }
    window.location.href = "login.html";
    return null;
  }
  updateNavbarUser(user);
  return user;
}

// Guard: Redirect to dashboard.html if user is ALREADY authenticated
async function redirectIfLoggedIn() {
  const user = await getCurrentUser();
  if (user) {
    window.location.href = "dashboard.html";
  }
}

// Update navigation bar with current user info & attach logout
function updateNavbarUser(user) {
  const navUserEl = document.getElementById("nav-user-info");
  if (navUserEl && user) {
    navUserEl.innerHTML = `
      <span class="user-badge" title="${user.email}">👤 ${user.fullName || user.email}</span>
      <button id="logout-btn" class="btn btn-secondary btn-sm" title="Log Out">Logout</button>
    `;

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", handleLogout);
    }
  }

  // Update mobile/extra logout buttons if present
  const allLogoutBtns = document.querySelectorAll(".action-logout");
  allLogoutBtns.forEach(btn => {
    btn.addEventListener("click", handleLogout);
  });
}

// Action: Handle User Registration
async function handleRegister(event) {
  event.preventDefault();

  const fullName = document.getElementById("reg-name")?.value.trim();
  const email = document.getElementById("reg-email")?.value.trim();
  const password = document.getElementById("reg-password")?.value;
  const confirmPassword = document.getElementById("reg-confirm-password")?.value;
  const submitBtn = document.getElementById("btn-register");

  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    showToast("Please enter all required fields.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match.", "error");
    return;
  }

  if (password.length < 6) {
    showToast("Password should be at least 6 characters long.", "error");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Registering...";
  }

  try {
    if (isSupabaseConfigured() && supabaseClient) {
      // 1. Supabase Auth Sign Up
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) throw error;

      // 2. Also insert or record profile if user ID exists
      if (data.user) {
        try {
          await supabaseClient.from("profiles").upsert({
            id: data.user.id,
            full_name: fullName,
            email: email,
            created_at: new Date().toISOString()
          });
        } catch (profileErr) {
          console.warn("Profile table note:", profileErr);
        }
      }

      showToast("Registration successful! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);

    } else {
      // Fallback / Demo registration mode
      const demoUser = {
        id: "demo-user-" + Date.now(),
        email: email,
        fullName: fullName
      };
      localStorage.setItem("vehiclehub_demo_user", JSON.stringify(demoUser));
      showToast("Registered successfully (Demo Mode)! Redirecting to Dashboard...", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    }
  } catch (err) {
    console.error("Registration error:", err);
    showToast(err.message || "Registration failed. Please try again.", "error");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Register";
    }
  }
}

// Action: Handle User Login
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email")?.value.trim();
  const password = document.getElementById("login-password")?.value;
  const submitBtn = document.getElementById("btn-login");

  if (!email || !password) {
    showToast("Please enter all required fields.", "error");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Signing in...";
  }

  try {
    if (isSupabaseConfigured() && supabaseClient) {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        throw error;
      }

      showToast("Login successful!", "success");
      const redirectUrl = sessionStorage.getItem("vehiclehub_redirect") || sessionStorage.getItem("autofinder_redirect") || "dashboard.html";
      sessionStorage.removeItem("vehiclehub_redirect");
      sessionStorage.removeItem("autofinder_redirect");
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 800);

    } else {
      // Fallback / Demo login mode
      const demoUser = {
        id: "demo-user-12345",
        email: email,
        fullName: email.split("@")[0] || "Demo User"
      };
      localStorage.setItem("vehiclehub_demo_user", JSON.stringify(demoUser));
      showToast("Logged in successfully (Demo Mode)!", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);
    }
  } catch (err) {
    console.error("Login error:", err);
    showToast(err.message === "Invalid login credentials" ? "Invalid email or password." : (err.message || "Login failed."), "error");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Login";
    }
  }
}

// Action: Handle User Logout
async function handleLogout() {
  try {
    if (isSupabaseConfigured() && supabaseClient) {
      await supabaseClient.auth.signOut();
    }
  } catch (err) {
    console.warn("Logout error:", err);
  } finally {
    localStorage.removeItem("vehiclehub_demo_user");
    localStorage.removeItem("autofinder_demo_user");
    showToast("Logged out successfully.", "info");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 500);
  }
}

// Fill Demo credentials for quick academic testing
function fillDemoCredentials() {
  const emailInput = document.getElementById("login-email");
  const passInput = document.getElementById("login-password");
  if (emailInput && passInput) {
    emailInput.value = "student@vehiclehub.com";
    passInput.value = "student123";
    showToast("Filled demo credentials! Click 'Sign In' to proceed.", "info");
  }
}
