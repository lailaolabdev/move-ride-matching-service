import Redis, { RedisOptions } from "ioredis";

// Initialize Redis client with options
const options: RedisOptions = {
  host: "valkey-move-uat-o50uly.serverless.apse1.cache.amazonaws.com", // no :6379 here
  port: 6379,
  family: 4, // IPv4
  db: 0,
  tls: {}, // add this if you enabled in-transit encryption
  // password: "YOUR_AUTH_TOKEN" // only if AUTH is enabled
}; 

// const options = {};

const redis = new Redis(options)

// Export the redis instance
export { redis };
