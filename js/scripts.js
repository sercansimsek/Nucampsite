const weatherIcon = document.querySelector("#weather-icon");
const weatherTemp = document.querySelector("#weather-temp");
const weatherDescription = document.querySelector("#weather-description");

const carousel = new bootstrap.Carousel("#homeCarousel", {
  interval: 5000,
  pause: false,
});

const carouselButton = document.getElementById("carouselButton");
const faIcon = document.getElementById("faButton");

carouselButton.addEventListener("click", function () {
  if (faIcon.classList.contains("fa-pause")) {
    faIcon.classList.remove("fa-pause");
    faIcon.classList.add("fa-play");
    carousel.pause();
  } else {
    faIcon.classList.remove("fa-play");
    faIcon.classList.add("fa-pause");
    carousel.cycle();
  }
});

async function fetchWeather() {
  try {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = "Bratislava";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}

function displayWeather(data) {
  const img = document.createElement("img");
  img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.appendChild(img);
  weatherTemp.textContent = `${Math.floor(data.main.temp)}\u00B0`;
  weatherDescription.textContent = `${data.weather[0].description}`;
}

fetchWeather();
