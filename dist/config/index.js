"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = exports.deleteKeysByPattern = void 0;
const redis_1 = require("./redis/redis");
const deleteKeysByPattern = (pattern) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all keys matching the pattern
        const keys = yield redis_1.redis.keys(pattern);
        if (keys.length > 0) {
            // Delete all matching keys
            const deleted = yield redis_1.redis.del(...keys);
            console.log(`Deleted ${deleted} keys matching pattern: ${pattern}`);
        }
        else {
            console.log('No keys found matching the pattern:', pattern);
        }
    }
    catch (error) {
        console.error('Error deleting keys from Redis:', error);
    }
});
exports.deleteKeysByPattern = deleteKeysByPattern;
exports.messages = {
    BAD_REQUEST: {
        code: "RIDE-400",
        message: "Bad Request"
    },
    INTERNAL_SERVER_ERROR: {
        code: "RIDE-500",
        message: "Internal Server Error"
    },
    NOT_FOUND: {
        code: "RIDE-404",
        message: "Not Found"
    },
    UNAUTHORIZED: {
        code: "RIDE-401",
        message: "Unauthorized"
    },
    FORBIDDEN: {
        code: "RIDE-403",
        message: "Forbidden"
    },
    CREATE_SUCCESSFUL: {
        code: "RIDE-201",
        message: "Created Successfully"
    },
    SUCCESSFUL: {
        code: "RIDE-200",
        message: "Successful"
    }
};
