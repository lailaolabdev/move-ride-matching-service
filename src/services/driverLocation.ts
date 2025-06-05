import axios from "axios";

export const updateDriverLocationService = async ({
    driverId,
    longitude,
    latitude,
    isOnline,
    registrationSource,
    rating,
}: {
    driverId: string;
    longitude?: number;
    latitude?: number;
    isOnline: string;
    registrationSource?: string;
    rating?: number;
}) => {
    try {
        if (isOnline === "online" || isOnline === "offline") {
            await axios.put(
                `${process.env.SOCKET_SERVICE_URL}/v1/api/driver-location-socket/${driverId}`,
                {
                    longitude,
                    latitude,
                    isOnline,
                    registrationSource,
                    rating,
                }
            );
        }

        return true;
    } catch (error) {
        console.log("Error updating driver location: ", error);
        throw error;
    }
};