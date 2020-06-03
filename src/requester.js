const request = require('request');

exports.requestingAPI = anUrl => {
  return new Promise((resolve, reject) => {
    request({ url: anUrl, json: true }, (err, response) => {
      if (err) reject('Hi from Reject Requester. Não foi possivel conectar ao servidor');
      else resolve(response.body);
    });
  });
};
