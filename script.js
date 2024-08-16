function updateWeather(response){
    let temperatureElement=document.querySelector("#current-temperature");
    let temperature=response.data.temperature.current;
    
let cityElement=document.querySelector("#current-city");
    cityElement.innerHTML=response.data.city;
    temperatureElement.innerHTML=Math.round(temperature);
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

