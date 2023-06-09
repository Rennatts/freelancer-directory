FROM node:18

WORKDIR /usr/src/app

COPY . .

COPY ./.env.production ./.env

RUN npm install  --quiet --no-optional --loglevel=error

RUN npm run build

EXPOSE 4000

CMD ["yarn", "run", "start:prod"]
