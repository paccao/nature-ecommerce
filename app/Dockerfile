FROM node:16.13

ENV NODE_ENV=production

WORKDIR /app/client

COPY cd ../client/build

WORKDIR /app/server

COPY ./server/package*.json ./

RUN npm install

COPY ./app ./

CMD ["node", "./src/server.ts"]