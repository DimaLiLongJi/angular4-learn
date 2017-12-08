FROM node:6
RUN npm install cnpm -g --registry=https://registry.npm.taobao.org
WORKDIR /app

#install dependences
COPY package.json .
RUN cnpm install

#build scripts
COPY webpack.config.js .
COPY ./public ./public
RUN npm run build-webpack

# Bundle app source
COPY . .
RUN npm run build-gulp

# use minimal alpine-node
FROM mhart/alpine-node:6
WORKDIR /app

RUN apk add --no-cache curl tzdata

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN echo "Asia/Shanghai" >  /etc/timezone

RUN apk del tzdata

COPY --from=0 /app .

RUN cp -r .server/* .

CMD ["node", "bin/www"]
