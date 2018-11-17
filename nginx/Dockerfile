# docker build -t telefunken-nginx .
# docker run --name telefunken-nginx --rm -it -p 80:80 telefunken-nginx
FROM nginx:alpine

ADD default.conf /etc/nginx/conf.d/default.conf
ADD htpasswd /etc/nginx/htpasswd

EXPOSE 80 443
