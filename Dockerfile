FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /client

RUN npm install

CMD ["npm", "run", "build"]

COPY build /app

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

ADD . /app/

CMD ["npm", "run", "build"]

CMD ["npm", "run", "start"]
