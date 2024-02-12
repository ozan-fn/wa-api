FROM node:alpine as base 

FROM base as build 
RUN apk add git
WORKDIR /app
COPY package.json .
RUN npm i 

FROM base
WORKDIR /app
COPY . .
RUN rm -rf node_modules*
COPY --from=build /app .
EXPOSE 3000
CMD npm start