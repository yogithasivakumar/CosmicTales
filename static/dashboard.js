// Redirect to login if not logged in
if (!sessionStorage.getItem("cosmic_token")) {
  window.location.href = "index.html";
}

const storyData = {
  farmer: "🌾 Farmer: Solar storms can affect GPS signals for farming equipment and crop monitoring. Farmers must check forecasts to plan fieldwork.",
  pilot: "🛩️ Pilot: Space weather can disrupt communication and navigation for flights, especially over polar regions.",
  astronaut: "👩‍🚀 Astronaut: Astronauts in space can be exposed to radiation during solar flares and need protection in their spacecraft.",
  power: "⚡ Power Grid Operator: Strong solar storms can induce currents in power lines, causing blackouts or equipment damage.",
  public: "👨‍👩‍👧‍👦 General Public: Auroras are visible in the sky, but solar storms can also disrupt satellites and communication networks."
};

document.querySelectorAll(".page").forEach(page => {
  page.addEventListener("click", () => {
    const character = page.dataset.character;
    document.getElementById("storyText").textContent = storyData[character];
  });
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});
