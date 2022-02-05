FROM alpine:3.15.0
ARG PORT
EXPOSE ${PORT}
WORKDIR /usr/app
RUN apk --no-cache add nodejs npm
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]
