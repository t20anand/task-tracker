# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

COPY . .

# RUN npm cache clean --force

# Install Dependencies
RUN npm install

# port
EXPOSE 3000

# Set the command to run the application
ENTRYPOINT npm start