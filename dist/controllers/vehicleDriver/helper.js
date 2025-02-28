"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterVehicleDriver = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const filterVehicleDriver = (query) => {
    let filter = {};
    if (query.driver) {
        filter.driver = query.driver;
    }
    if (query.licensePlate) {
        filter.licensePlate = query.licensePlate;
    }
    if (query.taxiType) {
        filter.taxiType = new mongoose_1.default.Types.ObjectId(query.taxiType);
    }
    if (query.vehicleBrand) {
        filter['taxi.vehicleBrand'] = query.vehicleBrand; // Filter by vehicleBrand
    }
    if (query.vehicleModel) {
        filter['taxi.vehicleModel'] = query.vehicleModel; // Filter by vehicleModel
    }
    return filter;
};
exports.filterVehicleDriver = filterVehicleDriver;
