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
exports.deleteDriverCashService = exports.updateDriverCashServiceByDriverId = exports.updateDriverCashServiceById = exports.getDriverCashByDriverIdService = exports.getDriverCashByIdService = exports.getAllDriverCashService = exports.createDriverCashService = void 0;
const driverCash_1 = __importDefault(require("../models/driverCash"));
// Create
const createDriverCashService = (driverId, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverCash = yield driverCash_1.default.create(Object.assign({ driver: driverId }, body));
        return yield driverCash_1.default.findById(driverCash._id)
            .select("firstName lastName fullName phone email country countryCode driver amount limit");
    }
    catch (error) {
        console.error("Error creating driver cash: ", error);
        throw error;
    }
});
exports.createDriverCashService = createDriverCashService;
// Get All
const getAllDriverCashService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield driverCash_1.default.countDocuments(filter);
        const driverCashList = yield driverCash_1.default.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, driverCashList };
    }
    catch (error) {
        console.error("Error retrieving driver cash: ", error);
        throw error;
    }
});
exports.getAllDriverCashService = getAllDriverCashService;
// Get by ID
const getDriverCashByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverCash_1.default
            .findById(id)
            .select("firstName lastName fullName phone email country countryCode driver amount limit");
    }
    catch (error) {
        console.error("Error retrieving driver cash by ID: ", error);
        throw error;
    }
});
exports.getDriverCashByIdService = getDriverCashByIdService;
const getDriverCashByDriverIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverCash_1.default
            .findOne({ driver: id })
            .select("firstName lastName fullName phone email country countryCode driver amount limit");
    }
    catch (error) {
        console.error("Error retrieving driver cash by driver ID: ", error);
        throw error;
    }
});
exports.getDriverCashByDriverIdService = getDriverCashByDriverIdService;
// Update
const updateDriverCashServiceById = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDriverCash = yield driverCash_1.default.findByIdAndUpdate(id, { $set: body }, { new: true });
        return updatedDriverCash;
    }
    catch (error) {
        console.error("Error updating driver cash: ", error);
        throw error;
    }
});
exports.updateDriverCashServiceById = updateDriverCashServiceById;
// Update
const updateDriverCashServiceByDriverId = (driverId, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDriverCash = yield driverCash_1.default.findOneAndUpdate({ driver: driverId }, { $set: body }, { new: true });
        return updatedDriverCash;
    }
    catch (error) {
        console.error("Error updating driver cash: ", error);
        throw error;
    }
});
exports.updateDriverCashServiceByDriverId = updateDriverCashServiceByDriverId;
// Delete
const deleteDriverCashService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverCash_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        console.error("Error deleting driver cash: ", error);
        throw error;
    }
});
exports.deleteDriverCashService = deleteDriverCashService;
