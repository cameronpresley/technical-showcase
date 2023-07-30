FROM node:20-buster-slim
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY src/ /app/src/
COPY *.json /app
EXPOSE 4200
ENTRYPOINT [ "npm", "run", "start" ]