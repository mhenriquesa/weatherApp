const express = require('express');
const hbs = require('hbs');
const forecastService = require('./getWeather');

const app = express();

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', 'src/views');
hbs.registerPartials('src/views/includes');

//Setup static directory to serve
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'WeatherApp - Home',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'WeatherApp - About Us',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'WeatherApp - Help',
  });
});

app.get('/help/*', (req, res) => {
  res.render('help', {
    title: 'WeatherApp - Help',
    error: 'Não encontramos nenhum artigo sobre esse assunto',
  });
});

app.get('/weather', (req, res) => {
  const pattern = /^[a-zA-Z0-9 ]+$/;

  if (!pattern.test(req.query.address)) {
    return res.send({
      error: 'Hmm... Local estranho! Você usou apenas letras e números?',
    });
  }

  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: 'Você deve informar um localização',
    });
  }
  forecastService
    .getCurrentWeather(req.query.address)
    .then(forecast => {
      res.send({
        forecast: forecast.description,
        temp: forecast.temp,
        address: req.query.address,
      });
    })
    .catch(err => {
      console.log('Hello from forecastService.getCurrentWeather().catch', err);
      return res.send({
        error: 'Não conseguimos encontrar uma localização com esses termos',
      });
    });
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(3000, () => {
  console.log('Server is up running');
});
