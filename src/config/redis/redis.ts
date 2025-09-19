console.log('🚨🚨🚨 REDIS CONFIG FILE IS BEING LOADED 🚨🚨🚨');
import Redis, { RedisOptions } from "ioredis";

console.log('Redis Environment Variables:');
console.log('REDIS_HOST:', process.env.REDIS_HOST);
console.log('REDIS_PORT:', process.env.REDIS_PORT);

// Initialize Redis client with options
const options: RedisOptions = {
  host: process.env.REDIS_HOST || "valkey-move-uat-o50uly.serverless.apse1.cache.amazonaws.com", // no :6379 here
  port: parseInt(process.env.REDIS_PORT || "6379"),
  family: 4, // IPv4
  db: 0,
  tls: {}
};

// const options = {};

const redis = new Redis(options);

// Export the redis instance
export { redis };
