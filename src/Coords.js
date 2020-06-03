const path = require('path');
const requester = require('./requester');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

class Coords {
  constructor(dataFromAPI) {
    (this.local = dataFromAPI.features[0].place_name),
      (this.long = dataFromAPI.features[0].center[0]),
      (this.lat = dataFromAPI.features[0].center[1]);
  }
  printBannerLocation() {
    console.log('---------------------');
    console.log(`Localização: ${this.local}`);
    console.log(`Latitude: ${this.lat}`);
    console.log(`Longitude: ${this.long}`);
    console.log('------------------------');
  }
}

Coords.findCoordByQueryUser = queryUser => {
  return new Promise(async (resolve, reject) => {
    const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${queryUser}.json?${process.env.COORDSAPI}`;
    await requester
      .requestingAPI(urlMapBox)
      .then(dataFromAPI => {
        if (!dataFromAPI.features.length) {
          reject('Erro na localização das coordenadas');
          return;
        }

        let coords = new Coords(dataFromAPI);
        coords.printBannerLocation();
        resolve(coords);
      })
      .catch(err => {
        console.log('Hello From Coords.findCoordByQueryUser Catch');
        reject(err);
      });
  });
};

module.exports = Coords;
