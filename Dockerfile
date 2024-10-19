FROM node:20-alpine

WORKDIR /app

# set up multiple background process
# RUN apk add --no-cache supervisor

# COPY supervisord.conf /etc/supervisord.conf

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# RUN npx prisma migrate deploy

# RUN npm run build

EXPOSE 3000
EXPOSE 5555

# CMD ["npm", "start"]
# CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
