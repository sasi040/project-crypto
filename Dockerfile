FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/project-crypto /usr/share/nginx/html
