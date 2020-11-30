FROM node:alpine as builder

RUN npm i lerna -g --loglevel notice

WORKDIR /app

COPY package.json yarn.lock lerna.json ./
COPY tsconfig.json ./

RUN yarn install --frozen-lockfile

COPY frontend/ ./frontend

RUN yarn bootstrap
RUN yarn build:frontend

FROM nginx
EXPOSE 80
COPY --from=0 /app/frontend/dist /usr/share/nginx/html
