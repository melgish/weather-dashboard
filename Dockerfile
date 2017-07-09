FROM node:boron

RUN mkdir -p /usr/src/weather-dashboard/ssl

WORKDIR /usr/src/weather-dashboard

COPY package.json /usr/src/weather-dashboard/
COPY dist /usr/src/weather-dashboard/dist/
COPY server /usr/src/weather-dashboard/server/

ENV NODE_ENV=production
ENV APP_HOST=0.0.0.0
ENV APP_PORT=3000
ENV APP_LOGLEVEL=tiny
ENV APP_APIKEY=your-key-here
ENV APP_SSLKEY=/usr/src/weather-dashboard/ssl/private.key
ENV APP_SSLCRT=/usr/src/weather-dashboard/ssl/certificate.crt

EXPOSE 3000

RUN npm install --production
CMD ["node", "server"]
