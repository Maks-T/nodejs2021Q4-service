FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN mkdir -p ./logs/
RUN mkdir -p ./src/
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]
