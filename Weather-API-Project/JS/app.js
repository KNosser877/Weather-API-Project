// Get user's location
const findMe = () => {
  const success = (position) => {
    const { latitude, longitude } = position.coords;
    console.log("Location found:", latitude, longitude);
    getPointData(latitude, longitude); // Start API chain
  };

  const error = () => {
    console.error("Unable to retrieve your location.");
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

// Fetch metadata from /points/{lat},{lon}
function getPointData(latitude, longitude) {
  const pointUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
  console.log("Fetching point data from:", pointUrl);

  fetch(pointUrl)
    .then(res => res.json())
    .then(data => {
      const forecastUrl = data.properties.forecast;
      console.log("Forecast URL:", forecastUrl);
      getForecast(forecastUrl); // <-- Correct function and variable name
    })
    .catch(error => {
      console.error("Error fetching point data:", error);
    });
}

// Fetch forecast data from forecast URL
function getForecast(forecastUrl) {
  fetch(forecastUrl)
    .then(res => res.json())
    .then(data => {
      const periods = data.properties.periods;
      console.log("Forecast periods:", periods);
    })
    .catch(error => {
      console.error("Error fetching forecast data:", error);
    });
}

findMe();


function displayForecast(periods) {
  const forecastDiv = document.getElementById('forecast');
  if (!forecastDiv) return;

  forecastDiv.innerHTML = periods.slice(0, 5).map(period => `
    <div class="card mb-2">
      <div class="card-body">
        <h5 class="card-title">${period.name}</h5>
        <p class="card-text">${period.detailedForecast}</p>
        <p><strong>Temperature:</strong> ${period.temperature}°${period.temperatureUnit}</p>
        <img src="${period.icon}" alt="${period.shortForecast}" />
      </div>
    </div>
  `).join('');
}



function getForecast(forecastUrl) {
  fetch(forecastUrl)
    .then(res => res.json())
    .then(data => {
      const periods = data.properties.periods;
      console.log("Forecast periods:", periods);
      displayForecast(periods); // Call the display function here
    })
    .catch(error => {
      console.error("Error fetching forecast data:", error);
    });
}

