FROM nginx:1.23.3-alpine

RUN rm /etc/nginx/conf.d/*

COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80