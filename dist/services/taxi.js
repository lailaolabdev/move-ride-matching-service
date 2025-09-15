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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleModelsService = exports.getVehicleBrandsService = exports.deleteTaxiService = exports.updateTaxiService = exports.getTaxiByIdService = exports.getAllTaxiService = exports.createTaxiService = void 0;
const config_1 = require("../config");
const taxi_1 = __importDefault(require("../models/taxi"));
// CREATE
const createTaxiService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ taxiType, vehicleModel, vehicleModelName, vehicleBrand, vehicleBrandName, 
// passengerMin,
// passengerMax,
// meteredFare,
// flatFare,
createdBy, createdByFullName, country }) {
    try {
        const taxi = new taxi_1.default({
            taxiType,
            vehicleModel,
            vehicleModelName,
            vehicleBrand,
            vehicleBrandName,
            // passengerMin,
            // passengerMax,
            // meteredFare,
            // flatFare,
            country,
            createdBy,
            createdByFullName,
        });
        if (taxi) {
            yield (0, config_1.deleteKeysByPattern)('taxies*'); // Invalidate the cache (if needed)
        }
        const savedTaxi = yield taxi.save();
        return savedTaxi;
    }
    catch (error) {
        console.log("Error creating vehicle: ", error);
        throw error;
    }
});
exports.createTaxiService = createTaxiService;
// READ (All Vehicles)
const getAllTaxiService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield taxi_1.default.countDocuments(filter);
        const taxies = yield taxi_1.default.find(filter)
            .skip(skip)
            .limit(limit)
            .populate({
            path: 'taxiType',
            select: 'name icon',
        })
            .sort({ createdAt: -1 });
        return { total, taxies };
    }
    catch (error) {
        console.log("Error retrieving vehicles: ", error);
        throw error;
    }
});
exports.getAllTaxiService = getAllTaxiService;
// READ (Vehicle by ID)
const getTaxiByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxi = yield taxi_1.default.findById(id)
            .populate({
            path: 'taxiType',
            select: 'name icon',
        });
        return taxi;
    }
    catch (error) {
        console.log("Error retrieving vehicle by ID: ", error);
        throw error;
    }
});
exports.getTaxiByIdService = getTaxiByIdService;
// UPDATE
const updateTaxiService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, taxiType, vehicleModel, vehicleBrand, isOpened, 
// passengerMin, passengerMax, meteredFare, flatFare,
updatedBy, updatedByFullName }) {
    try {
        const updatedTaxi = yield taxi_1.default.findByIdAndUpdate(id, {
            $set: {
                taxiType,
                vehicleModel,
                vehicleBrand,
                isOpened,
                // passengerMin,
                // passengerMax,
                // meteredFare,
                // flatFare,
                updatedBy,
                updatedAt: new Date(),
                updatedByFullName
            },
        }, { new: true });
        return updatedTaxi;
    }
    catch (error) {
        console.log("Error updating vehicle: ", error);
        throw error;
    }
});
exports.updateTaxiService = updateTaxiService;
// DELETE
const deleteTaxiService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTaxi = yield taxi_1.default.findByIdAndDelete(id);
        return deletedTaxi;
    }
    catch (error) {
        console.log("Error deleting vehicle: ", error);
        throw error;
    }
});
exports.deleteTaxiService = deleteTaxiService;
const getVehicleBrandsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTaxi = yield taxi_1.default.aggregate([
            {
                $match: {
                    isOpened: true
                }
            },
            {
                $group: {
                    _id: {
                        taxiType: "$taxiType",
                        vehicleBrand: "$vehicleBrand",
                        vehicleBrandName: "$vehicleBrandName"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    taxiType: "$_id.taxiType",
                    vehicleBrand: "$_id.vehicleBrand",
                    vehicleBrandName: "$_id.vehicleBrandName"
                }
            }
        ]);
        return deletedTaxi;
    }
    catch (error) {
        console.log("Error deleting vehicle: ", error);
        throw error;
    }
});
exports.getVehicleBrandsService = getVehicleBrandsService;
const getVehicleModelsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleModels = yield taxi_1.default.aggregate([
            {
                $match: {
                    isOpened: true
                }
            },
            {
                $group: {
                    _id: {
                        taxiType: "$taxiType",
                        vehicleBrand: "$vehicleBrand",
                        vehicleBrandName: "$vehicleBrandName"
                    },
                    models: {
                        $push: {
                            _id: "$vehicleModel",
                            name: "$vehicleModelName",
                            isOpened: { $ifNull: ["$isOpened", false] }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    taxiType: "$_id.taxiType",
                    vehicleBrand: "$_id.vehicleBrand",
                    vehicleBrandName: "$_id.vehicleBrandName",
                    models: 1
                }
            }
        ]);
        return vehicleModels;
    }
    catch (error) {
        console.log("Error deleting vehicle: ", error);
        throw error;
    }
});
exports.getVehicleModelsService = getVehicleModelsService;
