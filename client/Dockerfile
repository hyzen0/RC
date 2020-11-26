FROM node:12

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV REACT_APP_API_URL=http://151.106.112.137:5000

RUN npm run build 

EXPOSE 3000

CMD [ "npx", "serve", "-s", "build", "-l", "3000" ]
