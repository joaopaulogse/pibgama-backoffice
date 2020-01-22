FROM node:10.13.0-alpine AS build-vue

RUN mkdir -p /usr/app/current
WORKDIR /usr/app/current

COPY . .

RUN npm install
RUN npm run build



FROM nginx
RUN mkdir -p /usr/app/current
RUN rm -rf /etc/nginx/conf.d/*

COPY --from=build-vue /usr/app/current/dist /usr/app/current/dist
COPY --from=build-vue /usr/app/current/nginx /etc/nginx/conf.d/
EXPOSE 80

#docker build -t api-node:v1 .
