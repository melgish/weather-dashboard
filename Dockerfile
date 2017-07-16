FROM node:boron

RUN mkdir -p /usr/src/weather-dashboard

WORKDIR /usr/src/weather-dashboard

COPY package.json /usr/src/weather-dashboard/
COPY dist /usr/src/weather-dashboard/dist/
COPY server /usr/src/weather-dashboard/server/

ENV NODE_ENV=production
ENV APP_HOST=0.0.0.0
ENV APP_PORT=62865
ENV APP_LOGLEVEL=tiny
ENV APP_APIKEY=your-key-here

EXPOSE 62865

RUN npm install --production
CMD ["node", "server"]

