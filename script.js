// script.js
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const locationInput = document.getElementById('location-input');
  const weatherDisplay = document.getElementById('weather-display');
  const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value;
    fetchWeatherData(location);
  });

  toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  async function fetchWeatherData(location) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d29f227531c5ea1fb01c5ec5724772a0&units=metric`);
      if (!response.ok) {
        throw new Error('Invalid location');
      }
      const data = await response.json();
      displayWeatherData(data);
    } catch (error) {
      alert(error.message);
      weatherDisplay.style.display = 'none';
    }
  }

  function displayWeatherData(data) {
    const { name, main, weather, wind, dt } = data;
    const date = new Date(dt * 1000);
    weatherDisplay.innerHTML = `
      <h2>${name}</h2>
      <p>Temperature: ${main.temp} °C</p>
      <p>Date & Time: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
      <p>Condition: ${weather[0].description}</p>
    `;
    weatherDisplay.style.display = 'block';
  }
});
