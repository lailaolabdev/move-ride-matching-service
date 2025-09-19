# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies (now with package-lock.json)
RUN npm ci --omit=dev

# Copy built JavaScript
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8001

CMD ["node", "dist/index.js"]