// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("state-input");
  const button = document.getElementById("fetch-alerts");
  const displayDiv = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  button.addEventListener("click", async () => {

    const state = input.value.trim().toUpperCase();

    if (!state) {
      errorDiv.textContent = "Please enter a state abbreviation";
      errorDiv.classList.remove("hidden");
      return;
    }

    try {
      const response = await fetch(weatherApi + state);

      if (!response.ok) {
        throw new Error("Network failure");
      }

      const data = await response.json();

      errorDiv.textContent = "";
      errorDiv.classList.add("hidden");

      input.value = "";

      const alerts = data.features || [];

      displayDiv.innerHTML = `Weather Alerts: ${alerts.length}`;


      alerts.forEach((alert) => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        displayDiv.appendChild(p);
      });

    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove("hidden");
    }
  });
});

// Your code here!