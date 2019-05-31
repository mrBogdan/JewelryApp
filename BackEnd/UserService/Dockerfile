FROM node:10

WORKDIR /

RUN yarn install && yarn build

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]
