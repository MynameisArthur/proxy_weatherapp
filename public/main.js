const weatherDisplay = document.querySelector('.weather');
const weatherForm = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');

const apiKey = '6f7351a404925ddfaf5b2001b5e37e14';
const addWeatherToDOM = (data) => {
    weatherDisplay.innerHTML = `
        <h1>Weather in ${data.city}</h1>
        <h2>${data.temp} &deg;C</h2>
    `;
    cityInput.value = '';
};

//Convert Kelvin to fahrenheit
const kelvinToFahrenheit = (temp) => {
    return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
};
const kelvinToCelsius = (temp) => {
    return Math.ceil(temp - 273.15);
};

const fetchWeather = async (city) => {
    const url = `/api?q=${city}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === '404') {
        alert('City not found');
        return;
    }
    const displayData = {
        city: data.name,
        temp: kelvinToCelsius(data.main.temp),
    };
    addWeatherToDOM(displayData);
};
//Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (cityInput.value === '') {
        alert('Please enter a city');
    } else {
        fetchWeather(cityInput.value);
    }
});

fetchWeather('Warsaw');
