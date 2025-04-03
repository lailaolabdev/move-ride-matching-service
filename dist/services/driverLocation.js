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
exports.deleteDriverLocationService = exports.updateDriverLocationService = exports.getDriverLocationByIdService = exports.getAllDriverLocationService = exports.createDriverLocationService = void 0;
const driverLocation_1 = require("../models/driverLocation");
const createDriverLocationService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        const { latitude, longitude, area } = req.body;
        const driverLocation = yield driverLocation_1.driverLocationModel.create({
            driverId: user,
            latitude,
            longitude,
            area
        });
        return driverLocation;
    }
    catch (error) {
        console.log("Error creating driver location: ", error);
        throw error;
    }
});
exports.createDriverLocationService = createDriverLocationService;
const getAllDriverLocationService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield driverLocation_1.driverLocationModel.countDocuments();
        const driverLocation = yield driverLocation_1.driverLocationModel.find();
        return { total, driverLocation };
    }
    catch (error) {
        console.log("Error retrieving driverLocation: ", error);
        throw error;
    }
});
exports.getAllDriverLocationService = getAllDriverLocationService;
const getDriverLocationByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverLocation = yield driverLocation_1.driverLocationModel.findById(id);
        return driverLocation;
    }
    catch (error) {
        console.log("Error retrieving driverLocation by ID: ", error);
        throw error;
    }
});
exports.getDriverLocationByIdService = getDriverLocationByIdService;
const updateDriverLocationService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.user.id;
        const { latitude, longitude, area } = req.body;
        const updatedDriverLocation = yield driverLocation_1.driverLocationModel.findOneAndUpdate({ driverId }, { latitude, longitude, area }, { new: true });
        return updatedDriverLocation;
    }
    catch (error) {
        console.log("Error updating driver location: ", error);
        throw error;
    }
});
exports.updateDriverLocationService = updateDriverLocationService;
const deleteDriverLocationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDriverLocation = yield driverLocation_1.driverLocationModel.findByIdAndDelete(id);
        return deletedDriverLocation;
    }
    catch (error) {
        console.log("Error deleting driver location: ", error);
        throw error;
    }
});
exports.deleteDriverLocationService = deleteDriverLocationService;
