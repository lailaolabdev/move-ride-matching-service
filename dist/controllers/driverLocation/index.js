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
exports.deleteDriverLocation = exports.updateDriverLocation = exports.getDriverLocationByTokenId = exports.getAllDriverLocation = exports.createDriverLocation = void 0;
const driverLocation_1 = require("../../services/driverLocation");
const config_1 = require("../../config");
const createDriverLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverLocation = yield (0, driverLocation_1.createDriverLocationService)(req);
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: "DriverLocation created successfully",
            driverLocation,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createDriverLocation = createDriverLocation;
const getAllDriverLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loyalties = yield (0, driverLocation_1.getAllDriverLocationService)();
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Driver socation fetched successfully",
            loyalties,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getAllDriverLocation = getAllDriverLocation;
const getDriverLocationByTokenId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        console.log(id);
        const taxi = yield (0, driverLocation_1.getDriverLocationByIdService)(id);
        if (!taxi) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Driver location not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Driver location fetched successfully",
            taxi,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getDriverLocationByTokenId = getDriverLocationByTokenId;
const updateDriverLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDriverLocation = yield (0, driverLocation_1.updateDriverLocationService)(req);
        if (!updatedDriverLocation) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Driver location not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Driver location updated successfully",
            taxi: updatedDriverLocation,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateDriverLocation = updateDriverLocation;
const deleteDriverLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDriverLocation = yield (0, driverLocation_1.deleteDriverLocationService)(req.params.id);
        if (!deletedDriverLocation) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Vehicle not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Vehicle deleted successfully",
            taxi: exports.deleteDriverLocation,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.deleteDriverLocation = deleteDriverLocation;
