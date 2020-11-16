FROM node:14.15.0-alpine3.12
WORKDIR /app
COPY package.json .
RUN mkdir client
COPY client/package.json client/package.json
RUN npm i 
RUN cd client && npm i
COPY . .
CMD ["npm", "run", "dev"]
