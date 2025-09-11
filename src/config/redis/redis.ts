import Redis from "ioredis";

// Initialize Redis client with options
// const options = {
//   port: 6379,
//   host: process.env.REDIS_HOST,
//   family: 4, // IPv4
//   db: 0,
// }

const options = {};

const redis = new Redis(options)


// Export the redis instance
export { redis };
