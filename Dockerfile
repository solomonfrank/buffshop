FROM node:18-alpine As builder
WORKDIR /app
COPY package.json ./

RUN npm install --frozen-lockfile

RUN npx browserslist@latest --update-db

COPY . .
RUN npm run build
EXPOSE 3000
CMD ["pm2", "restart", "nextapp"]
