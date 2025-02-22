const apiKey = "5a98159efce1b660f3bc115743e17aee";
 

async function searchWeather() {
    const state = document.getElementById("searchBox").value.trim();
    if (state === "") {
        alert("Please enter a valid Indian state name!");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${state},IN&units=metric&appid=${5a98159efce1b660f3bc115743e17aee}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            alert("Invalid state name or data unavailable!");
            return;
        }

        document.getElementById("stateName").innerText = `Weather in ${data.name}`;
        document.getElementById("currentTemperature").innerText = `Temperature: ${data.main.temp}°C`;
        document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById("weatherCondition").innerText = `Condition: ${data.weather[0].description}`;
        document.getElementById("weatherDisplay").style.display = "block";

        fetchForecast(data.coord.lat, data.coord.lon);
    } catch (error) {
        alert("An error occurred! Please try again.");
        console.error(error);
    }
}

async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${5a98159efce1b660f3bc115743e17aee}`
        );
        const forecastData = await response.json();

        const forecastContainer = document.getElementById("forecastContainer");
        forecastContainer.innerHTML = "";

        const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0);

        dailyForecasts.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
            });

            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-card");
            forecastCard.innerHTML = `
                <p>${date}</p>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather Icon">
                <p>${forecast.main.temp}°C</p>
            `;

            forecastContainer.appendChild(forecastCard);
        });
    } catch (error) {
        alert("Error loading forecast data!");
        console.error(error);
    }
}

