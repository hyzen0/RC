FROM node:14.15.0
WORKDIR /app
COPY package.json .
RUN mkdir client
COPY client/package.json client/package.json
RUN npm i 
RUN cd client && npm i 
COPY . .
RUN cd client && npm run build
CMD ["npm", "run", "prod"]