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
exports.getNearbyDriversService = void 0;
const driverLocation_1 = require("../models/driverLocation");
const getNearbyDriversService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ longitude, latitude }) {
    try {
        // Can change 5 km
        const radiusInKm = 1000000;
        const radiusInMeters = radiusInKm * 1000; // Convert kilometers to meters
        const nearbyTaxis = yield driverLocation_1.driverLocationModel.aggregate([
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
    }
    catch (error) {
        console.log("Error retrieving loyalties: ", error);
        throw error;
    }
});
exports.getNearbyDriversService = getNearbyDriversService;
