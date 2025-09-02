import axios from "axios";

export const updateDriverLocationService = async ({
    driverId,
    longitude,
    latitude,
    isOnline = "offline",
    registrationSource,
    rating,
    taxiType
}: {
    driverId: string;
    longitude?: number;
    latitude?: number;
    isOnline?: string;
    registrationSource?: string;
    rating?: number;
    taxiType?: string;
}) => {
    try {
        if (isOnline === "online" || isOnline === "offline") {
            const test = await axios.put(
                `${process.env.SOCKET_SERVICE_URL}/v1/api/driver-location-socket/${driverId}`,
                {
                    longitude,
                    latitude,
                    isOnline,
                    registrationSource,
                    rating,
                    taxiType,
                }
            );
        }

        return true;
    } catch (error) {
        console.log("Error updating driver location: ", error);
        throw error;
    }
};