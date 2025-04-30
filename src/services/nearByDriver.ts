import { driverLocationModel } from "../models/driverLocation";

interface IGetNearbyDrivers {
    longitude: number,
    latitude: number
}

export const getNearbyDriversService = async ({ longitude, latitude }: IGetNearbyDrivers): Promise<any> => {
    try {
        const radiusInKm = 5
        const radiusInMeters = radiusInKm * 1000; // Convert kilometers to meters

        const nearbyTaxis = await driverLocationModel.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    distanceField: 'distance',
                    spherical: true,
                    maxDistance: radiusInMeters,
                    query: {
                        isOnline: true, // filter within geoNear
                    },
                },
            },
            {
                $lookup: {
                    from: 'users', // the collection to join
                    localField: 'driverId', // field in the current collection
                    foreignField: '_id', // field in the drivers collection
                    as: 'driver', // name of the new field to hold the populated data
                },
            },
            {
                $unwind: '$driver', // unwind the driver array if there's only one driver
            },
            {
                $project: {
                    driver: {
                        _id: 1,
                        registrationSource: 1, // include only the registrationSource field
                    },
                    _id: 1,
                    isOnline: 1,
                    distance: 1,
                },
            },
        ]);

        return nearbyTaxis;
    } catch (error) {
        console.log("Error retrieving loyalties: ", error);
        throw error;
    }
};
