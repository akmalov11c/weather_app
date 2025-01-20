const API_key = "YOUR API KEY";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");

const weatherIcon = document.querySelector(".weather i");

const content = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${API_key}`);
  let data = await response.json();

  if (response.status == 404) {
    error.style.display = "block";
    content.style.display = "none";
  } else {
    cityName.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "&degc";
    humidity.innerHTML = data.main.humidity + " %";
    wind.innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.className = "ri-cloudy-line";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.className = "ri-moon-clear-line";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.className = "ri-rainy-line";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.className = "ri-mist-line";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.className = "ri-drizzle-line";
    }

    content.style.display = "block";
    error.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});
