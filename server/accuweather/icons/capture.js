/* eslint-disable no-console */
const request = require('request');
const fs = require('fs');
for (let i = 9; i < 10; i++) {
  let s = `0${i}`.substring(0, 2);
  let url = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${s}-s.png`;
  let file = `server/accuweather/icons/${s}-s.png`;

  request
    .get(url)
    .on('error', err => {
      console.log(err);
     })
    .pipe(fs.createWriteStream(file));
}
