FROM node:15.7-alpine3.10 as builder
COPY package.json package-lock.json ./
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN npm run ng build --prod --outputPath=./dist
FROM nginx:1.19.6-alpine
COPY --from=builder /ng-app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /ng-app/dist/project-crypto /usr/share/nginx/html
