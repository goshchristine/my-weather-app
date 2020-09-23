function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
     hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
     minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
let temperatureElement = document.querySelector("#mainTemp");
let cityElement = document.querySelector("h1");
let descriptionElement = document.querySelector("#description");
let dateElement = document.querySelector("h3");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");

temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
console.log(response.data);
}

let apiKey = "efa461f8eba76234d37349aa6790ea03";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);