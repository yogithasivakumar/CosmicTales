const API_URL = "http://localhost:5000/api/auth";

// Tab switching
document.getElementById("tab-login").addEventListener("click", () => {
  document.getElementById("panel-login").classList.remove("hidden");
  document.getElementById("panel-login").setAttribute("aria-hidden", "false");
  document.getElementById("panel-signup").classList.add("hidden");
  document.getElementById("panel-signup").setAttribute("aria-hidden", "true");
  document.getElementById("tab-login").classList.add("active");
  document.getElementById("tab-signup").classList.remove("active");
});

document.getElementById("tab-signup").addEventListener("click", () => {
  document.getElementById("panel-signup").classList.remove("hidden");
  document.getElementById("panel-signup").setAttribute("aria-hidden", "false");
  document.getElementById("panel-login").classList.add("hidden");
  document.getElementById("panel-login").setAttribute("aria-hidden", "true");
  document.getElementById("tab-signup").classList.add("active");
  document.getElementById("tab-login").classList.remove("active");
});

// Signup
document.getElementById("signupBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirm = document.getElementById("signupConfirm").value.trim();

  if (password !== confirm) {
    document.getElementById("signupMsg").textContent = "Passwords do not match";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    document.getElementById("signupMsg").textContent = data.msg || "Signup complete!";
  } catch (err) {
    console.error(err);
    document.getElementById("signupMsg").textContent = "Error signing up";
  }
});

// Login
document.getElementById("loginBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      sessionStorage.setItem("cosmic_token", data.token);
      sessionStorage.setItem("cosmic_name", data.name);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("loginMsg").textContent = data.msg;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("loginMsg").textContent = "Error logging in";
  }
});

