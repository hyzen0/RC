FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV CLIENT_URL=http://rightcompanion.org.in

EXPOSE 5000

CMD ["npm","start"]