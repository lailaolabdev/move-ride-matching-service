import Redis from "ioredis";

// Initialize Redis client with options
const redis = new Redis({
  port: 6379,
  host: process.env.REDIS_HOST,
})

// Export the redis instance
export { redis };
