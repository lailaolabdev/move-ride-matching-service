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
exports.deleteDriverRate = exports.updateDriverRate = exports.getDriverRateById = exports.getAllDriverRates = exports.createDriverRate = void 0;
const driverRate_1 = require("../../services/driverRate");
const index_1 = require("../../config/index");
// CREATE Driver Rate
const createDriverRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { taxiType, minDistance, maxDistance, percentage, country, countryCode } = req.body;
        const rate = yield (0, driverRate_1.createDriverRateService)({
            taxiType,
            minDistance,
            maxDistance,
            percentage,
            country,
            countryCode,
            createdBy: user.id,
            createdByFullName: user.fullName,
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Driver rate created successfully",
            rate,
        });
    }
    catch (error) {
        console.error("Error creating driver rate:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createDriverRate = createDriverRate;
// READ All Driver Rates
const getAllDriverRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit, country, countryCode, taxiType } = req.query;
        const parseSkip = parseInt(skip, 10) || 0;
        const parsedLimit = parseInt(limit, 10) || 20;
        const filter = {};
        if (country)
            filter.country = country;
        if (countryCode)
            filter.countryCode = countryCode;
        if (taxiType)
            filter.taxiType = taxiType;
        const driverRates = yield (0, driverRate_1.getAllDriverRatesService)(parseSkip, parsedLimit, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Driver rates fetched successfully",
            driverRates,
        });
    }
    catch (error) {
        console.error("Error fetching driver rates:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getAllDriverRates = getAllDriverRates;
// READ Driver Rate by ID
const getDriverRateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverRate = yield (0, driverRate_1.getDriverRateByIdService)(req.params.id);
        if (!driverRate) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Driver rate not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Driver rate fetched successfully",
            driverRate,
        });
    }
    catch (error) {
        console.error("Error fetching driver rate by ID:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getDriverRateById = getDriverRateById;
// UPDATE Driver Rate
const updateDriverRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const { taxiType, minDistance, maxDistance, percentage, } = req.body;
        console.log({});
        const updatedDriverRate = yield (0, driverRate_1.updateDriverRateService)({
            id,
            taxiType,
            minDistance,
            maxDistance,
            percentage,
            updatedBy: user.id,
            updatedByFullName: user.fullName,
        });
        if (!updatedDriverRate) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Driver rate not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Driver rate updated successfully",
            updatedDriverRate,
        });
    }
    catch (error) {
        console.error("Error updating driver rate:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateDriverRate = updateDriverRate;
// DELETE Driver Rate
const deleteDriverRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDriverRate = yield (0, driverRate_1.deleteDriverRateService)(req.params.id);
        if (!deletedDriverRate) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Driver rate not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Driver rate deleted successfully",
            deletedDriverRate,
        });
    }
    catch (error) {
        console.error("Error deleting driver rate:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.deleteDriverRate = deleteDriverRate;
