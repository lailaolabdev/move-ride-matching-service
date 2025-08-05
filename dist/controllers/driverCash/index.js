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
exports.deleteDriverCash = exports.updateDriverCash = exports.getDriverCashById = exports.getAllDriverCash = exports.createDriverCash = void 0;
const driverCash_1 = require("../../services/driverCash");
const config_1 = require("../../config");
const helper_1 = require("./helper");
// CREATE Driver Cash
const createDriverCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.user.id;
        const body = (0, helper_1.validateDriverCashBody)(req.body);
        const driverCash = yield (0, driverCash_1.createDriverCashService)(driverId, body);
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: "Driver cash created successfully",
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
exports.createDriverCash = createDriverCash;
// GET ALL Driver Cash
const getAllDriverCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip = 0, limit = 10, driver } = req.query;
        const parsedSkip = parseInt(skip, 10);
        const parsedLimit = parseInt(limit, 10);
        const filter = {};
        if (driver)
            filter.driver = driver;
        const driverCashList = yield (0, driverCash_1.getAllDriverCashService)(parsedSkip, parsedLimit, filter);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Driver cash list fetched successfully",
            driverCashList,
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
exports.getAllDriverCash = getAllDriverCash;
// GET Driver Cash by ID
const getDriverCashById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverCash = yield (0, driverCash_1.getDriverCashByIdService)(req.params.id);
        if (!driverCash) {
            return res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Driver cash not found",
            });
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Driver cash fetched successfully",
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
// UPDATE Driver Cash
const updateDriverCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = (0, helper_1.validateDriverCashBody)(req.body);
        const updatedDriverCash = yield (0, driverCash_1.updateDriverCashService)(id, body);
        if (!updatedDriverCash) {
            return res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Driver cash not found",
            });
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Driver cash updated successfully",
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
            message: "Driver cash deleted successfully",
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
