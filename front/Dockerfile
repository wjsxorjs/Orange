#기존
FROM node:20-alpine as builder
WORKDIR /usr/src/app

# UTF-8 설정
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

COPY package*.json ./
RUN npm install
COPY ./ ./

#nodemon 사용 
CMD ["npm", "run", "dev"]

# gpt 추천
# FROM node:20-alpine as builder
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY ./ ./
# RUN npm run build

# CMD ["npm", "start"]