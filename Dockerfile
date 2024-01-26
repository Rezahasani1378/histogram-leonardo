FROM node:alpine3.19

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

CMD node server.js