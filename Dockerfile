FROM node:18.10.0-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN yarn install

RUN yarn build

ENV NODE_ENV=production

CMD ["yarn", "start:prod"]  