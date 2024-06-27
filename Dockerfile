FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json config public ./

RUN npm install

ADD .next .next

EXPOSE 3000

CMD ["npm", "start"]