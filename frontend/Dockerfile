# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js project
RUN npm run build

# Expose port 3000 (or the port on which your app will run)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
