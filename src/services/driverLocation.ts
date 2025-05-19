import { Request } from 'express'
import axios from 'axios';

export const updateDriverLocationService = async (req: Request) => {
    try {
        const driverId = (req as any).user.id;

        const { longitude, latitude, isOnline } = req.body

        if (isOnline === "online" || isOnline === "offline") {
            await axios.put(
                // `${process.env.SOCKET_SERVICE_URL}/v1/api/driver-location-socket/${driverId}`,
                `http://localhost:3000/v1/api/driver-location-socket/${driverId}`,
                { longitude, latitude, isOnline }
            )
        }

        return true;
    } catch (error) {
        console.log("Error updating driver location: ", error);
        throw error;
    }
};