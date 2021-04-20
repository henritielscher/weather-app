const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecastImage = document.querySelector(".forecast-image");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

console.dir(forecastImage);

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading weather data...";
  messageTwo.textContent = "";
  forecastImage.src = "";

  fetch(`/weather?address=${location}`).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        forecastImage.src = data.image;
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
  );
});
