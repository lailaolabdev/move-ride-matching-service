"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
// Initialize Redis client with options
const options = {
    host: process.env.REDIS_HOST || "valkey-move-uat-o50uly.serverless.apse1.cache.amazonaws.com", // no :6379 here
    port: parseInt(process.env.REDIS_PORT || "6379"),
    family: 4, // IPv4
    db: 0,
    tls: {}
};
// const options = {};
const redis = new ioredis_1.default(options);
exports.redis = redis;
