function formatDate(timestamp) {
     let now = new Date(timestamp);
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
       "December"
     ];
     let month = months[now.getMonth()];
     let date = now.getDate();
     let days = [
       "Sunday",
       "Monday",
       "Tuesday",
       "Wednesday",
       "Thursday",
       "Friday",
       "Saturday"
     ];
     let day = days[now.getDay()];
     return `Last updated on: <br/> ${day}, ${month} ${date} <br/>@ ${formatHours(
       timestamp
     )}`;
   }
   
   function formatHours(timestamp) {
     let date = new Date(timestamp);
     let hours = date.getHours();
     if (hours < 10) {
       hours = `0${hours}`;
     }
     let minutes = date.getMinutes();
     if (minutes < 10) {
       minutes = `0${minutes}`;
     }
     return `${hours}:${minutes}`;
   }
   
   function displayTemperature(response) {
     let temperatureElement = document.querySelector("#mainTemp");
     let cityElement = document.querySelector("h1");
     let iconElement = document.querySelector("#icon");
     let descriptionElement = document.querySelector("#description");
     let dateElement = document.querySelector("h3");
     let humidityElement = document.querySelector("#humidity");
     let windElement = document.querySelector("#wind");
     let sunriseElement = document.querySelector("#sunrise");
     let sunsetElement = document.querySelector("#sunset");
      
     celsiusTemperature = Math.round(response.data.main.temp);
   
     temperatureElement.innerHTML = Math.round(response.data.main.temp);
     cityElement.innerHTML = response.data.name;
     iconElement.setAttribute(
       "src",
       `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
     );
     iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
     descriptionElement.innerHTML = response.data.weather[0].description;
     dateElement.innerHTML = formatDate(response.data.dt * 1000);
     humidityElement.innerHTML = response.data.main.humidity;
     windElement.innerHTML = Math.round(response.data.wind.speed);
     sunriseElement.innerHTML = formatHours(response.data.sys.sunrise * 1000);
     sunsetElement.innerHTML = formatHours(response.data.sys.sunset * 1000);
   }
   
   function formatDay(timestamp) {
     let now = new Date(timestamp);
     let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
     let day = days[now.getDay()];
     return `${day}`;
   }
   
   function displayForecast(response) {
     let forecastElement = document.querySelector("#forecast");
     forecastElement.innerHTML = null;
     let forecast = null;
     for (let index = 0; index < 5; index++) {
       forecast = response.data.daily[index];
       forecastElement.innerHTML += ` 
               <div class="col-2">
               <p class="times"><strong>${formatDay(
                 forecast.dt * 1000
               )}</strong></p>
               <img src="https://openweathermap.org/img/wn/${
                 forecast.weather[0].icon
               }@2x.png" />
               <p class="temps"><strong>${Math.round(forecast.temp.max)}°</strong><br /> ${Math.round(forecast.temp.min)}°</p></p>
             </div>`;
     }
   }
   
   function callForecast(response) {
     let latitude = response.data.city.coord.lat;
     let longitude = response.data.city.coord.lon;
     let apiKey = "efa461f8eba76234d37349aa6790ea03";
     let apiDailyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
     axios.get(apiDailyUrl).then(displayForecast);
   }
   
   function search(city) {
     let apiKey = "efa461f8eba76234d37349aa6790ea03";
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
     axios.get(apiUrl).then(displayTemperature);
   
     apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
     axios.get(apiUrl).then(callForecast);
   }
   
   function handleSubmit(event) {
     event.preventDefault();
     let cityInputElement = document.querySelector("#cityEntered");
     if (cityInputElement.value) {
       search(cityInputElement.value);
     } else {
       alert("You did not enter a city!");
     }
   }
   
   function displayFahrenheitTemperature(event) {
     event.preventDefault();
     let farhenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
     celsiusLink.classList.remove("active");
     fahrenheitLink.classList.add("active");
     let temperatureElement = document.querySelector("#mainTemp");
     temperatureElement.innerHTML = Math.round(farhenheitTemperature);
   }
   
   function displayCelsiusTemperature(event) {
     event.preventDefault();
     let temperatureElement = document.querySelector("#mainTemp");
     temperatureElement.innerHTML = celsiusTemperature;
     fahrenheitLink.classList.remove("active");
     celsiusLink.classList.add("active");
   }
   
   let celsiusTemperature = null;
   
   let form = document.querySelector("#search-form");
   form.addEventListener("submit", handleSubmit);
   
   let fahrenheitLink = document.querySelector("#fahrenheit");
   fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
   
   let celsiusLink = document.querySelector("#celsius");
   celsiusLink.addEventListener("click", displayCelsiusTemperature);
   
   search("Toronto");
   