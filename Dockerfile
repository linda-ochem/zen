# Use an official Node.js runtime as a parent image
FROM node:14

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Bundle the application code inside the Docker image
COPY . .

# Expose the port your application will run on
EXPOSE 4500

# Define the command to start your Node.js application
CMD [ "npm", "start" ]
