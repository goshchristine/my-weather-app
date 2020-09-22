let now = new Date();

let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day}, ${month} ${date} ${hours}:${minutes}`;

function showTemperature(response) {
  let mainTemp = document.querySelector("#mainTemp");
  let temp = Math.round(response.data.main.temp);
  mainTemp.innerHTML = `${temp}`;
}

function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("#cityEntered");
  let h1 = document.querySelector("h1");

  if (input.value) {
    h1.innerHTML = `${input.value}`;
  } else {
    alert("You did not enter a city!");
  }
  let apiKey = "efa461f8eba76234d37349aa6790ea03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

function showCurrentLocation(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let mainTemp = document.querySelector("#mainTemp");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
}

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "efa461f8eba76234d37349aa6790ea03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentLocation);
}

function findCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", findCurrentLocation);
