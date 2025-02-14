import { redis } from "./redis/redis";

export interface IErrorResponse {
    code: string;
    message: string;
    detail?: string;
}

export const deleteKeysByPattern = async (pattern: string) => {
    try {
        // Fetch all keys matching the pattern
        const keys = await redis.keys(pattern);

        if (keys.length > 0) {
            // Delete all matching keys
            const deleted = await redis.del(...keys);
            console.log(`Deleted ${deleted} keys matching pattern: ${pattern}`);
        } else {
            console.log('No keys found matching the pattern:', pattern);
        }
    } catch (error) {
        console.error('Error deleting keys from Redis:', error);
    }
};


export const messages = {
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