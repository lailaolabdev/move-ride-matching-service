# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm install

# Copy source code
COPY . .

# BUILD TypeScript to JavaScript - THIS IS CRITICAL!
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package.json for production install
COPY package*.json ./

# Use npm install instead of npm ci (since you don't have package-lock.json)
RUN npm install --only=production

# Copy built JavaScript from build stage (not source TypeScript)
COPY --from=build /usr/src/app/dist ./dist

# Expose the port
EXPOSE 8001

# Run in production mode
CMD ["node", "dist/index.js"]