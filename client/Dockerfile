FROM node:12.2.0-alpine as react_build

WORKDIR /app

COPY package.json .

RUN npm install npm@latest -g && npm install

COPY . .

ENV REACT_APP_BACKEND=http://151.106.112.137:5000/

RUN npm run build 

EXPOSE 3000

CMD [ "npx", "serve", "-s", "build", "-l", "3000" ]
