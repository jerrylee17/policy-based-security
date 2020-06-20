FROM node:alpine
WORKDIR /policy_manager_service
COPY ./package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start"]