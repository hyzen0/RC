FROM node:alpine 
WORKDIR /usr/src/app
RUN npm install express --save && npm install 
COPY . .
EXPOSE 5000
CMD ["npm","start"]