import Redis, { RedisOptions } from "ioredis";

// Define the options with proper typing
const options: RedisOptions = {
  port: 6379,
  host: "localhost",
  family: 4, // IPv4
  db: 0,
};
// const options = {};

// Initialize Redis client with options
const redis = new Redis({
  port: 6379,
  host: "redis",
});

// Export the redis instance
export { redis };
