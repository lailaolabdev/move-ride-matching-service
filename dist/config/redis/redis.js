"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
// Initialize Redis client with options
const redis = new ioredis_1.default({
    port: 6380,
    host: process.env.REDIS_HOST,
    family: 4, // IPv4
    db: 0,
});
exports.redis = redis;
