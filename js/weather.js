
const weatherIcon = document.querySelector('.weather_icon');
const API_KEY = '2617fa438a56f0ea55ba27d3939b3f80';

function geoOK(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = document.querySelector('#weather span');
      const CurrentIcon = data.weather[0].icon;
      weatherIcon.src = `http://openweathermap.org/img/wn/${CurrentIcon}@2x.png`;
      temp.innerText = `${Math.ceil(data.main.temp)}°`;
    });
}

function geoError() {}

navigator.geolocation.getCurrentPosition(geoOK, geoError);
