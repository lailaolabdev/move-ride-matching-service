import Redis from "ioredis";

// Initialize Redis client with options
const redis = new Redis({
  port: 6379,
  host: process.env.REDIS_HOST,
  family: 4, // IPv4
  db: 0,
})

// Export the redis instance
export { redis };
