import { Request } from 'express'
import { redis } from '../config/redis/redis';

export const updateDriverLocationService = async (req: Request) => {
    try {
        const driverId = (req as any).user.id;

        const { longitude, latitude, isOnline } = req.body

        if (isOnline === "offline") {
            await redis.del(`driver:${driverId}:status`);
            await redis.zrem('drivers:locations', driverId);

            return true
        } else if (isOnline === "online") {
            await redis.set(`driver:${driverId}:status`, isOnline);
            await redis.geoadd('drivers:locations', longitude, latitude, driverId);

            return true
        }

        return true;
    } catch (error) {
        console.log("Error updating driver location: ", error);
        throw error;
    }
};