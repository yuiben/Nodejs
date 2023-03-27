FROM node:16.14.2-alpine

WORKDIR /usr/src/app
RUN mkdir -p /usr/export

# SET TIMEZONE
RUN apk add -U tzdata
ENV TZ="Asia/Ho_Chi_Minh"
RUN cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime

# INSTALL YARN
RUN set -eux apk add --no-cache yarn

# INSTALL SOURCE
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install
RUN yarn global add @pm2/io pm2 pm2-logrotate

# Copy source
COPY src ./src
COPY .env ./.env
COPY ecosystem.config.js ./ecosystem.config.js
COPY tsconfig.json ./tsconfig.json
COPY webpack.config.ts ./webpack.config.ts

RUN yarn run build

RUN pm2 set pm2-logrotate:compress true
RUN pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
RUN pm2 set pm2-logrotate:max_size 30M
RUN pm2 set pm2-logrotate:retain 10000

EXPOSE 5101

CMD ["pm2-runtime", "/usr/src/app/ecosystem.config.js"]