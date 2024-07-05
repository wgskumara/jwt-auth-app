FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .
EXPOSE 82

CMD ["npm", "start"] 

