FROM node:12-alpine
WORKDIR "$app"
COPY package*.json ./
RUN npm install
COPY ["/","$app/"]

EXPOSE 4000
CMD ["node", "index.js"]