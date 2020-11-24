FROM node:12.2.0-alpine as react_build

WORKDIR /app

COPY package.json .

RUN npm install --silent

COPY . .

ENV REACT_APP_BACKEND=http://31.220.48.21:5000/

RUN npm run build 

EXPOSE 80

CMD [ "npx", "serve", "-s", "build", "-l", "80" ]
