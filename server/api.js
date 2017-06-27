const Router = require('express').Router;
const accuweather = require('./accuweather');
const mocks = require('./accuweather/mocks');
const icons = require('./accuweather/icons');

const router = new Router();

const weatherApi =
  process.env.NODE_ENV !== 'production' ? mocks : accuweather;

router.get('/icon/:id', (req, resp) => {
  return icons
    .getIcon(req.params.id)
    .pipe(resp);
});

router.get('/location/:zip(\\d{5})', (req, resp) => {
  return weatherApi
    .getLocation(req.params.zip)
    .pipe(resp);
});

router.get('/conditions/:loc', (req, resp) => {
  return weatherApi
    .getConditions(req.params.loc)
    .pipe(resp);
});

router.get('/forecast/:loc', (req, resp) => {
  return weatherApi
    .getForecast(req.params.loc)
    .pipe(resp);
});


module.exports = router;
