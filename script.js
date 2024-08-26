function updateWeather(response){
    let temperatureElement=document.querySelector("#current-temperature");
    let temperature=response.data.temperature.current;
    let cityElement=document.querySelector("#current-city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windSpeedElement=document.querySelector("#wind-speed");
    let timeElement=document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement =document.querySelector("#icon");


    cityElement.innerHTML=response.data.city;
    descriptionElement.innerHTML=response.data.condition.description;
    humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML=`${response.data.wind.speed}km/h`;
    timeElement.innerHTML= formatDate(date);
    iconElement.innerHTML=`<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`
     temperatureElement.innerHTML=Math.round(temperature);

     getForecast(response.data.city);
}

function formatDate(date){

let minutes=date.getMinutes();
let hours=date.getHours();
let day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let today = day[date.getDay()];

if (minutes < 10) {
    minutes = `0${minutes}`;
  }

return `${today} ${hours}:${minutes}`;
}
function formatDay(timestamp){
    let date = new Date(timestamp*1000);
    let days =["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];

    return days[date.getDay()];
}

function searchCity(city){
let apiKey ="a3460f11d3801ff9feb7c65d8btoaadb";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(updateWeather);
}


function citySearchSubmit(event){
    event.preventDefault();
let searchInput=document.querySelector("#search-input");

searchCity(searchInput.value);
}

function getForecast(city){
let apiKey="a3460f11d3801ff9feb7c65d8btoaadb";
let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayForecast);
}


function displayForecast(response){
    let forecastHtml="";

    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml= 
        forecastHtml +  
        `
       <div class="weather-forecast-day">
        <div class="forecast-day">${formatDay(day.time)}</div>

            <img src="${day.condition.icon_url}" class="forecast-icon"/>  
            <div class="forecast-temperatures">
              <div class="weather-forecast-temerature">
               <strong>${Math.round(day.temperature.maximum)}°</strong> 
            </div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
          </div>
        </div>
          `;
          }
    });
  
    let forecastElement=document.querySelector("#forecast");
        forecastElement.innerHTML=forecastHtml;
   }


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearchSubmit);

searchCity("Durban");









    