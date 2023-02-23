FROM node:lts-alpine
WORKDIR /usr/app
COPY package*.json ./
run npm install
COPY . .
EXPOSE 8080
RUN npm run build
CMD ["node", "dist/index.js"]