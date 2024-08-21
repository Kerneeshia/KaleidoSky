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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearchSubmit);

searchCity("Durban");