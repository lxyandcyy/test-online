FROM nginx
RUN echo '这是本地构建的nginx镜像' > /usr/shar/nginx/html/index.html

