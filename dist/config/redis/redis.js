"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
// Define the options with proper typing
const options = {
    port: 6379,
    host: "localhost",
    family: 4, // IPv4
    db: 0,
};
// const options = {};
// Initialize Redis client with options
const redis = new ioredis_1.default({
    port: 6379,
    host: "redis",
});
exports.redis = redis;
