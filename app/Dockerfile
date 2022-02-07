FROM node:latest

WORKDIR /app/client

COPY ./dist ./client

WORKDIR /app/server

COPY ./server/package*.json ./

RUN npm install

COPY ./server ./

CMD ["node", "./server.ts"]

