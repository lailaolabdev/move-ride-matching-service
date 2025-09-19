# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, excluding node_modules
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Install nodemon globally
RUN npm install nodemon -g

# Expose the port your app runs on
EXPOSE 8001

# Command to run the application
CMD ["npm", "run", "start:prod"]
# CMD ["npm", "run", "start:prod"]