FROM node:alpine

RUN npm i lerna -g --loglevel notice

WORKDIR /app
COPY package.json yarn.lock lerna.json ./

RUN yarn install --pure-lockfile

COPY frontend/ ./frontend

RUN yarn bootstrap
RUN yarn build:frontend

FROM nginx
EXPOSE 80
COPY --from=0 /app/dist /usr/share/nginx/html
