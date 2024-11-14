FROM    nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY    build . 
COPY	  ./nginx/app.conf /etc/nginx/conf.d/app.conf
COPY	  ./nginx/nginx.conf /etc/nginx/nginx.conf