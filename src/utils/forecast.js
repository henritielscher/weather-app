const request = require("postman-request");

// Weather
const weatherURL = "http://api.weatherstack.com/";
const API_KEY = "access_key=585fd003e573bf1707db68477b8ff6f9";
const unit = "units=m";

const forecast = (longitude, latitude, callback) => {
  const url = `${weatherURL}current?${API_KEY}&query=${longitude},${latitude}&${unit}`;
  request(
    {
      url,
      json: true,
    },
    (err, res) => {
      if (err) {
        callback("Unable to connect to weather service!", undefined);
      } else if (res.body.error) {
        callback("Unable to find location!", undefined);
      } else {
        const data = res.body.current;
        const { feelslike, temperature, weather_descriptions } = data;
        callback(
          undefined,
          `${weather_descriptions[0]}. It is currently ${temperature}°C out. It feels like ${feelslike}°C out.`
        );
      }
    }
  );
};

module.exports = forecast;
