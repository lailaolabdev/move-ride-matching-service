import { driverLocationModel } from "../models/driverLocation";

export const getNearbyDriversService = async (
    { longitude, latitude }: { longitude: number, latitude: number }
): Promise<any> => {
    try {
        const radiusInKm = 5
        const radiusInMeters = radiusInKm * 1000; // Convert kilometers to meters

        const nearbyTaxis = await driverLocationModel.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude], // User's current location [longitude, latitude]
                    },
                    $maxDistance: radiusInMeters, // Maximum distance in meters (5 km)
                },
            },
        });

        return nearbyTaxis;
    } catch (error) {
        console.log("Error retrieving loyalties: ", error);
        throw error;
    }
};
