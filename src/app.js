const path = require('path');
const express = require('express');
const hbs = require('hbs');

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

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(3000, () => {
  console.log('Server is up running');
});
