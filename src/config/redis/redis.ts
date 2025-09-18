import Redis, { RedisOptions } from "ioredis";

// Initialize Redis client with options
const options: RedisOptions = {
  host: "valkey-move-uat-o50uly.serverless.apse1.cache.amazonaws.com", // no :6379 here
  port: 6379,
  family: 4, // IPv4
  db: 0,
  tls: {}, 
  maxRetriesPerRequest: 3,
  lazyConnect: true,
};

// const options = {};

const redis = new Redis(options)

// Handle connection events
redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});


// Export the redis instance
export { redis };
