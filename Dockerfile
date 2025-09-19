# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, excluding node_modules
COPY . .

# BUILD TypeScript to JavaScript - THIS IS CRITICAL!
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package.json for production install
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production

# Copy built JavaScript from build stage (not source TypeScript)
COPY --from=build /usr/src/app/dist ./dist

# Copy any other necessary files (like .env templates if needed)
COPY --from=build /usr/src/app/package*.json ./

# Expose the port your app runs on
EXPOSE 8001

# Command to run the application
CMD ["node", "dist/index.js"]