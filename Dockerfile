FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm link

CMD ["todo-solution-1", "list"]

# CMD ["todo-solution-2", "list"]  another commad to run different function to fetch TODO's
