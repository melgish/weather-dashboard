FROM node:latest

ARG WORK_DIR=/usr/src/weather-dashboard

RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}/
ENV NODE_ENV=production
RUN npm install --production

COPY dist ${WORK_DIR}/dist/
COPY server ${WORK_DIR}/server/
COPY certs ${WORK_DIR}/certs/

ENV APP_HOST=0.0.0.0
ENV APP_PORT=62865
ENV APP_LOGLEVEL=tiny
ENV APP_APIKEY=your-api-key-here
ENV SSL_PFX=${WORK_DIR}/certs/ssl.pfx
ENV SSL_SECRET=${WORK_DIR}/certs/ssl.secret

EXPOSE $APP_PORT

CMD ["node", "server"]
