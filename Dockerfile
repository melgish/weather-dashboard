FROM node:carbon-alpine

ARG WORK_DIR=/usr/src/weather-dashboard

ENV \
  NODE_ENV=production \
  APP_HOST=0.0.0.0 \
  APP_PORT=443 \
  APP_LOGLEVEL=tiny \
  APP_APIKEY=your-api-key-here \
  SSL_PFX=${WORK_DIR}/certs/ssl.pfx \
  SSL_PFX=${WORK_DIR}/certs/ssl.pfx \
  SSL_SECRET=${WORK_DIR}/certs/ssl.secret

WORKDIR ${WORK_DIR}

COPY . ${WORK_DIR}/

# RUN echo "151.101.4.162 registry.npmjs.org" >> /etc/hosts && npm install --no-save --production
RUN npm install --no-save --production

EXPOSE 443

CMD ["node", "server"]
