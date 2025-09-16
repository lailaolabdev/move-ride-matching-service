import Redis from "ioredis";

// Initialize Redis client with options
const options = {
  port: 6379,
  host: "redis",
  family: 4, // IPv4
  db: 0,
}

// const options = {};

const redis = new Redis(options)


// Export the redis instance
export { redis };
