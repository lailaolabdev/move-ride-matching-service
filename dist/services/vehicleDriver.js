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
exports.deleteVehicleDriverService = exports.updateVehicleDriverService = exports.getVehicleDriverByDriverIdService = exports.getVehicleDriverByIdService = exports.getAllVehicleDriversService = exports.createVehicleDriverService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const vehicleDriver_1 = __importDefault(require("../models/vehicleDriver"));
// CREATE
const createVehicleDriverService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ taxi, taxiType, vehicleModel, vehicleBrand, driver, driverFullName, frontVehicleImage, backVehicleImage, licensePlate, createdBy, createdByFullName }) {
    try {
        const newVehicleDriver = new vehicleDriver_1.default({
            taxi,
            taxiType,
            vehicleModel,
            vehicleBrand,
            driver,
            driverFullName,
            frontVehicleImage,
            backVehicleImage,
            licensePlate,
            createdBy,
            createdByFullName
        });
        const savedVehicleDriver = yield newVehicleDriver.save();
        return savedVehicleDriver;
    }
    catch (error) {
        console.log("Error creating taxi type: ", error);
        throw error;
    }
});
exports.createVehicleDriverService = createVehicleDriverService;
// READ (All Taxi Types)
const getAllVehicleDriversService = (filter, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("filter: ", filter);
        const pipeline = [];
        // Lookup to join Taxi and then join TaxiType
        pipeline.push({
            $lookup: {
                from: 'taxis', // Match the exact collection name in MongoDB
                localField: 'taxi',
                foreignField: '_id',
                as: 'taxi'
            }
        }, { $unwind: { path: "$taxi", preserveNullAndEmptyArrays: true } }, // Prevent missing taxi from removing record
        {
            $lookup: {
                from: 'taxitypes', // Match the exact collection name in MongoDB
                localField: 'taxi.taxiType',
                foreignField: '_id',
                as: 'taxiType'
            }
        }, { $unwind: { path: "$taxiType", preserveNullAndEmptyArrays: true } } // Prevent missing taxiType from removing record
        );
        // Apply filtering based on taxiType AFTER lookups
        if (filter.taxiType) {
            pipeline.push({
                $match: { "taxiType._id": new mongoose_1.default.Types.ObjectId(filter.taxiType) }
            });
        }
        // **Project only required fields**
        pipeline.push({
            $project: {
                _id: 1,
                driver: 1,
                driverFullName: 1,
                licensePlate: 1,
                createdAt: 1,
                createdBy: 1,
                createdByFullName: 1,
                updatedAt: 1,
                updatedBy: 1,
                updatedByFullName: 1,
                taxi: {
                    _id: 1,
                    vehicleModel: 1,
                    vehicleBrand: 1,
                    passengerMin: 1,
                    passengerMax: 1,
                    meteredFare: 1,
                    flatFare: 1
                },
                taxiType: {
                    _id: 1,
                    name: 1,
                    icon: 1
                }
            }
        });
        // Optional filtering for other fields
        const matchConditions = {};
        if (filter.driver)
            matchConditions.driver = filter.driver;
        if (filter.licensePlate)
            matchConditions.licensePlate = filter.licensePlate;
        if (Object.keys(matchConditions).length > 0) {
            pipeline.push({ $match: matchConditions });
        }
        // Pagination and Sorting
        pipeline.push({ $sort: { createdAt: -1 } });
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: limit });
        // Execute Aggregation Pipeline
        const vehicleDrivers = yield vehicleDriver_1.default.aggregate(pipeline);
        // Get total count of matching documents (excluding pagination)
        const totalPipeline = [...pipeline];
        totalPipeline.push({ $count: "total" });
        const totalResult = yield vehicleDriver_1.default.aggregate(totalPipeline);
        const total = totalResult.length > 0 ? totalResult[0].total : 0;
        return { total, vehicleDrivers };
    }
    catch (error) {
        console.error("Error retrieving vehicle drivers: ", error);
        throw error;
    }
});
exports.getAllVehicleDriversService = getAllVehicleDriversService;
// READ (Taxi Type by ID)
const getVehicleDriverByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleDriver = yield vehicleDriver_1.default.findById(id)
            .populate({
            path: 'taxi',
            select: 'vehicleModel vehicleBrand passengerMin passengerMax meteredFare flatFare taxiType', // Select relevant fields
            populate: {
                path: 'taxiType',
                select: 'name icon' // Select relevant fields from taxiType
            }
        });
        return vehicleDriver;
    }
    catch (error) {
        console.log("Error retrieving taxi type by ID: ", error);
        throw error;
    }
});
exports.getVehicleDriverByIdService = getVehicleDriverByIdService;
// READ (Taxi Type by ID)
const getVehicleDriverByDriverIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleDriver = yield vehicleDriver_1.default.findOne({ driver: id })
            .select("-_id -taxi -createdBy -createdByFullName -createdAt -updatedAt -__v");
        return vehicleDriver;
    }
    catch (error) {
        console.log("Error retrieving taxi type by ID: ", error);
        throw error;
    }
});
exports.getVehicleDriverByDriverIdService = getVehicleDriverByDriverIdService;
// UPDATE
const updateVehicleDriverService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ taxi, driver, driverFullName, frontVehicleImage, backVehicleImage, licensePlate, updatedBy, updatedByFullName }) {
    try {
        const vehicleDriver = yield vehicleDriver_1.default.findOneAndUpdate({ driver }, {
            $set: {
                taxi,
                driver,
                driverFullName,
                frontVehicleImage,
                backVehicleImage,
                licensePlate,
                updatedBy,
                updatedByFullName,
                updatedAt: new Date()
            },
        }, { new: true });
        return vehicleDriver;
    }
    catch (error) {
        console.log("Error updating taxi type: ", error);
        throw error;
    }
});
exports.updateVehicleDriverService = updateVehicleDriverService;
// DELETE
const deleteVehicleDriverService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleDriver = yield vehicleDriver_1.default.findByIdAndDelete(id);
        return vehicleDriver;
    }
    catch (error) {
        console.log("Error deleting taxi type: ", error);
        throw error;
    }
});
exports.deleteVehicleDriverService = deleteVehicleDriverService;
