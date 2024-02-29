FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY .env ./
COPY index.js ./index.js
COPY prisma ./prisma/
RUN npx prisma generate
# RUN npx prisma migrate dev --name init
EXPOSE 3000
CMD ["npm", "run", "start:migrate:dev"]
