// Get DOM elements
const currentYearElement = document.getElementById('current-year');
const lastModifiedElement = document.getElementById('last-modified');
const temperatureElement = document.getElementById('temperature');
const windSpeedElement = document.getElementById('wind-speed');
const windChillElement = document.getElementById('wind-chill');

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Set last modified date
lastModifiedElement.textContent = document.lastModified;

// Static weather data
const temperature = 22; // °C
const windSpeed = 15; // km/h

// Display static weather data
temperatureElement.textContent = temperature;
windSpeedElement.textContent = windSpeed;

// Calculate and display wind chill
function calculateWindChill(temp, windSpeed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
}

// Check conditions and calculate wind chill if applicable
if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${windChill.toFixed(1)}°C`;
} else {
    windChillElement.textContent = "N/A";
}