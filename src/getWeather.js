const Weather = require('./Weather');
const Coords = require('./Coords');

const getCurrentWeather = userQuery => {
  return new Promise((resolve, reject) => {
    Coords.findCoordByQueryUser(userQuery)
      .then(coords => Weather.getWeatherFrom(coords))
      .then(forecast => {
        resolve(forecast);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

module.exports = {
  getCurrentWeather: getCurrentWeather,
};
