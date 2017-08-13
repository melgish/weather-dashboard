const Router = require('express').Router;
const accuweather = require('./accuweather');
const mocks = require('./accuweather/mocks');
const icons = require('./accuweather/icons');

const router = new Router();

const weatherApi =
  process.env.NODE_ENV !== 'production' ? mocks : accuweather;

router.get('/icon/:id', (req, res, next) => {
  let iconPath = icons.getIconPath(req.params.id);
  res.sendFile(iconPath, { maxAge: '365d', headers: { Vary: 'Accept-Encoding'} }, err => {
    if (err) {
      next(err);
    }
  });
});

router.get('/location/:zip(\\d{5})', (req, res) => {
  return weatherApi
    .getLocation(req.params.zip)
    .pipe(res);
});

router.get('/location/:lat(-?[0-9.]+),:lng(-?[0-9.]+)', (req, res) => {
  return weatherApi
    .getGeoLocation(req.params.lat, req.params.lng)
    .pipe(res);
});

router.get('/conditions/:loc', (req, res) => {
  return weatherApi
    .getConditions(req.params.loc)
    .pipe(res);
});

router.get('/forecast/:loc', (req, res) => {
  return weatherApi
    .getForecast(req.params.loc)
    .pipe(res);
});

router.get('/stats', (req, res) => {
  // set same headers that weather api would
  const stats = weatherApi.getStats();
  res.set({
    'ratelimit-limit': stats.limit,
    'ratelimit-remaining': stats.remaining,
  });
  return res.json(stats);
});

module.exports = router;
