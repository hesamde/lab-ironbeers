const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, './views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(data => {
      res.render('beers', { beers: data });
    })
    .catch(error => {
      console.log(error);
      res.status(404).send('database error');
    });
});
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(data => {
      res.render('random-beer', { beer: data });
    })
    .catch(error => {
      console.log(error);
      res.status(404).send('database error');
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
