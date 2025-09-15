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
exports.adjustDriverCash = exports.deleteDriverCash = exports.updateDriverCash = exports.getDriverCashByDriverId = exports.getDriverCashById = exports.getAllDriverCash = exports.createDriverCash = void 0;
const driverCash_1 = require("../../services/driverCash");
const config_1 = require("../../config");
const helper_1 = require("./helper");
const axios_1 = __importDefault(require("axios"));
// Create DriverCash
const createDriverCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { driver, firstName, lastName, fullName, phone, email, country, countryCode, amount, limit } = req.body;
        const existingDriverCash = yield (0, driverCash_1.getDriverCashByDriverIdService)(driver);
        if (existingDriverCash) {
            res.status(400).json({
                code: config_1.messages.ALREADY_EXIST.code,
                message: "Driver cash already exists for this driver",
            });
            return;
        }
        const driverId = req.user.id;
        const driverCash = yield (0, driverCash_1.createDriverCashService)(driverId, {
            firstName,
            lastName,
            fullName,
            phone,
            email,
            country,
            countryCode,
            amount,
            limit
        });
        return res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: config_1.messages.CREATE_SUCCESSFUL.message,
            data: driverCash
        });
    }
    catch (error) {
        console.error("Error in createDriverCash: ", error);
        return res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
    }
});
exports.createDriverCash = createDriverCash;
// Get All DriverCash
const getAllDriverCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const filter = {};
        const result = yield (0, driverCash_1.getAllDriverCashService)(skip, limit, filter);
        return res.status(200).json({
            success: true,
            total: result.total,
            data: result.driverCashList
        });
    }
    catch (error) {
        console.error("Error in getAllDriverCash: ", error);
        return res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
    }
});
exports.getAllDriverCash = getAllDriverCash;
// GET Driver Cash by ID
const getDriverCashById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverCash = yield (0, driverCash_1.getDriverCashByIdService)(req.params.id);
        if (!driverCash) {
            return res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: config_1.messages.NOT_FOUND.message,
                detail: "Driver cash not found",
            });
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            detail: "Driver cash fetched successfully",
            driverCash,
        });
    }
    catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getDriverCashById = getDriverCashById;
const getDriverCashByDriverId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.user.id;
        const driverCash = yield (0, driverCash_1.getDriverCashByDriverIdService)(driverId);
        if (!driverCash) {
            return res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: config_1.messages.NOT_FOUND.message,
                detail: "Driver cash not found",
            });
        }
        return res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            detail: "Driver cash fetched successfully",
            dr: driverCash,
        });
    }
    catch (error) {
        console.error("Error in getDriverCashByDriverIdController: ", error);
        return res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getDriverCashByDriverId = getDriverCashByDriverId;
// UPDATE Driver Cash
const updateDriverCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = (0, helper_1.validateDriverCashBody)(req.body);
        const updatedDriverCash = yield (0, driverCash_1.updateDriverCashServiceById)(id, body);
        if (!updatedDriverCash) {
            return res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: config_1.messages.NOT_FOUND.message,
                detail: "Driver cash not found",
            });
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            detail: "Driver cash updated successfully",
            updatedDriverCash,
        });
    }
    catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateDriverCash = updateDriverCash;
// DELETE Driver Cash
const deleteDriverCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDriverCash = yield (0, driverCash_1.deleteDriverCashService)(req.params.id);
        if (!deletedDriverCash) {
            return res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Driver cash not found",
            });
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            detail: "Driver cash deleted successfully",
            deletedDriverCash,
        });
    }
    catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.deleteDriverCash = deleteDriverCash;
// Adjust Driver Cash
// This endpoint adjusts the driver's cash balance based on the provided body
// If the driver cash does not exist, it creates a new entry
const adjustDriverCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const driverId = req.user.id;
        const body = (0, helper_1.validateDriverCashBody)(req.body);
        const driverCashExists = yield (0, driverCash_1.getDriverCashByDriverIdService)(driverId);
        let driverCash;
        if (driverCashExists) {
            body.amount = (driverCashExists.amount || 0) + (body.amount || 0);
            driverCash = yield (0, driverCash_1.updateDriverCashServiceByDriverId)(driverId, body);
        }
        else {
            const driver = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${driverId}`);
            const driverData = (_a = driver === null || driver === void 0 ? void 0 : driver.data) === null || _a === void 0 ? void 0 : _a.user;
            if (!driverData) {
                res.status(400).json({
                    code: config_1.messages.BAD_REQUEST.code,
                    message: `User with this id: ${driverId} not found`,
                });
                return;
            }
            const createData = {
                firstName: (driverData === null || driverData === void 0 ? void 0 : driverData.firstName) || "",
                lastName: (driverData === null || driverData === void 0 ? void 0 : driverData.lastName) || "",
                fullName: (driverData === null || driverData === void 0 ? void 0 : driverData.fullName) || "",
                phone: (driverData === null || driverData === void 0 ? void 0 : driverData.phone) || "",
                email: (driverData === null || driverData === void 0 ? void 0 : driverData.email) || "",
                country: ((_b = driverData === null || driverData === void 0 ? void 0 : driverData.country) === null || _b === void 0 ? void 0 : _b._id) || "",
                countryCode: ((_c = driverData === null || driverData === void 0 ? void 0 : driverData.country) === null || _c === void 0 ? void 0 : _c.code) || "",
                amount: body.amount || 0
            };
            driverCash = yield (0, driverCash_1.createDriverCashService)(driverId, createData);
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            detail: "Driver cash updated successfully",
            driverCash,
        });
    }
    catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.adjustDriverCash = adjustDriverCash;
