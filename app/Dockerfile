FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /app

COPY build /app/build

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

CMD ["npm", "run", "build"]

COPY dist /app/dist

CMD ["npm", "run", "start:production"]