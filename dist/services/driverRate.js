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
exports.deleteDriverRateService = exports.updateDriverRateService = exports.getDriverRateByIdService = exports.getAllDriverRatesService = exports.createDriverRateService = void 0;
const driverRate_1 = require("../models/driverRate");
// CREATE
const createDriverRateService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ registrationSource, minDistance, maxDistance, percentage, createdBy, createdByFullName, country, countryCode }) {
    try {
        const rate = new driverRate_1.driverRateModel({
            registrationSource,
            minDistance,
            maxDistance,
            percentage,
            createdBy,
            createdByFullName,
            country,
            countryCode
        });
        const savedRate = yield rate.save();
        return savedRate;
    }
    catch (error) {
        throw error;
    }
});
exports.createDriverRateService = createDriverRateService;
// READ ALL
const getAllDriverRatesService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield driverRate_1.driverRateModel.countDocuments(filter);
        const rates = yield driverRate_1.driverRateModel
            .find(filter)
            .populate("registrationSource")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, rates };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllDriverRatesService = getAllDriverRatesService;
// READ BY ID
const getDriverRateByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverRate_1.driverRateModel.findById(id).populate("registrationSource");
    }
    catch (error) {
        throw error;
    }
});
exports.getDriverRateByIdService = getDriverRateByIdService;
// UPDATE
const updateDriverRateService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, registrationSource, minDistance, maxDistance, percentage, updatedBy, updatedByFullName, }) {
    try {
        return yield driverRate_1.driverRateModel.findByIdAndUpdate(id, {
            $set: {
                registrationSource,
                minDistance,
                maxDistance,
                percentage,
                updatedBy,
                updatedByFullName
            }
        }, { new: true }).populate("registrationSource");
    }
    catch (error) {
        throw error;
    }
});
exports.updateDriverRateService = updateDriverRateService;
// DELETE
const deleteDriverRateService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverRate_1.driverRateModel.findByIdAndDelete(id);
    }
    catch (error) {
        throw error;
    }
});
exports.deleteDriverRateService = deleteDriverRateService;
