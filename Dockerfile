FROM node:14

COPY . .

RUN npm install

CMD ["node", "index.js"]