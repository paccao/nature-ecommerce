FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /usr/src/app

COPY build /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

ADD . /usr/src/app/

CMD ["npm", "run", "start"]