FROM node:8-alpine

COPY ./app /home/node/app
WORKDIR /home/node/app
EXPOSE 3000

CMD echo "node启动！" && \
npm install -g cnpm --registry=https://registry.npm.taobao.org && \
cnpm install && \
npm start