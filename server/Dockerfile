FROM node:12

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV CLIENT_URL=http://151.106.112.137:3000/

EXPOSE 5000

CMD ["npm","start"]