import Redis from "ioredis";

// Initialize Redis client with options
const redis = new Redis({
  port: 6379,
  host: "redis",
});

// Export the redis instance
export { redis };
