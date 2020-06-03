const path = require('path');
const requester = require('./requester');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const Weather = function (dataFromAPI) {
  (this.description = dataFromAPI.current.weather[0].description),
    (this.temp = dataFromAPI.current.temp);
};

Weather.prototype.print = function () {
  console.log(`Situação atual: ${this.description}`);
  console.log(`Temperatura: ${Math.round(this.temp)}°C`);
};

Weather.getWeatherFrom = coords => {
  return new Promise(async (resolve, reject) => {
    const weatherAPI = `http://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&units=metric&lang=pt_br&${process.env.WEATHERAPI}`;
    await requester
      .requestingAPI(weatherAPI)
      .then(dataFromAPI => {
        let forecast = new Weather(dataFromAPI);
        forecast.print();
        resolve(forecast);
      })
      .catch(err => {
        console.log('Hello from Weather.getWeatherFrom reject');
        reject(err);
      });
  });
};

module.exports = Weather;
