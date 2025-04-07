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
        const radiusInKm = 5;
        const radiusInMeters = radiusInKm * 1000; // Convert kilometers to meters
        const nearbyTaxis = yield driverLocation_1.driverLocationModel.find({
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
    }
    catch (error) {
        console.log("Error retrieving loyalties: ", error);
        throw error;
    }
});
exports.getNearbyDriversService = getNearbyDriversService;
