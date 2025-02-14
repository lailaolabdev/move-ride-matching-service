import Redis, { RedisOptions } from "ioredis";

// Define the options with proper typing
// const options: RedisOptions = {
//   port: 6379,
//   host: "redis",
//   family: 4, // IPv4
//   db: 0,
// };
const options = {};

// Initialize Redis client with options
const redis = new Redis(options);

// Export the redis instance
export { redis };
