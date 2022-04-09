# FROM node:16.13

# ENV NODE_ENV=production

# WORKDIR /app/client

# COPY build /app/client/

# WORKDIR /app/server

# COPY package*.json ./

# COPY ./ ./

# RUN npm install

# CMD ["node", "./src/server.ts"]


FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /app

COPY build /app

COPY ["package.json", "package-lock.json", "./"]

COPY ./ ./

RUN npm install

CMD ["npm", "run", "start"]