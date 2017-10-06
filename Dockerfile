FROM node:alpine

ARG WORK_DIR=/usr/src/weather-dashboard

ENV \
  NODE_ENV=production \
  APP_HOST=0.0.0.0 \
  APP_PORT=62865 \
  APP_LOGLEVEL=tiny \
  APP_APIKEY=your-api-key-here \
  SSL_PFX=${WORK_DIR}/certs/ssl.pfx \
  SSL_PFX=${WORK_DIR}/certs/ssl.pfx \
  SSL_SECRET=${WORK_DIR}/certs/ssl.secret

WORKDIR ${WORK_DIR}

COPY . ${WORK_DIR}/

RUN npm install --production

EXPOSE $APP_PORT

CMD ["node", "server"]
