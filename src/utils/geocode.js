const request = require("postman-request");

// Coordinates
const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const API_KEY_MAPS =
  "access_token=pk.eyJ1IjoicG9vcmFuZHdlaXJkIiwiYSI6ImNrbmVwOWlxaTF0djYycG11bnRqejh0OXIifQ.T5w9ZzHS5BnOWi-EVlp-DQ";

const geocode = (address, callback) => {
  const url = `${geoURL}/${encodeURIComponent(
    address
  )}.json?${API_KEY_MAPS}&limit=1`;
  request(
    {
      url,
      json: true,
    },
    (err, { body }) => {
      if (err) {
        callback("Unable to connect to location service!", undefined);
      } else if (body.features.length === 0) {
        callback(
          "Unable to find location. Try again with different search term.",
          undefined
        );
      } else {
        const data = body.features[0];
        callback(undefined, {
          longitude: data.center[1],
          latitude: data.center[0],
          location: data.place_name,
        });
      }
    }
  );
};

module.exports = geocode;
