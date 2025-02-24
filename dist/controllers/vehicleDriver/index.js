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
exports.deleteVehicleDriver = exports.updateVehicleDriver = exports.getVehicleDriver = exports.getAllVehicleDrivers = exports.createVehicleDriver = void 0;
const config_1 = require("../../config");
const helper_1 = require("./helper");
const vehicleDriver_1 = require("../../services/vehicleDriver");
const taxi_1 = require("../../services/taxi");
// CREATE Taxi
const createVehicleDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { taxiType, vehicleModel, vehicleBrand, driver, driverFullName, frontVehicleImage, backVehicleImage, licensePlate } = req.body;
        const taxis = yield (0, taxi_1.getAllTaxiService)(0, 1, { vehicleModel, vehicleBrand, taxiType });
        if (taxis.taxies.length < 1) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: config_1.messages.BAD_REQUEST.message,
                detail: 'Vehicle Model or Vehicle Brand not found'
            });
            return;
        }
        console.log("taxis.taxies[0]._id: ", taxis.taxies[0]._id);
        const vehicleDriver = yield (0, vehicleDriver_1.createVehicleDriverService)({
            taxi: taxis.taxies[0]._id,
            driver,
            driverFullName,
            frontVehicleImage,
            backVehicleImage,
            licensePlate,
            createdBy: user.id,
            createdByFullName: user.fullName
        });
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: 'Vehicle Driver created successfully',
            vehicleDriver
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.createVehicleDriver = createVehicleDriver;
// READ All Vehicles
const getAllVehicleDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit } = req.query;
        const parseSkip = parseInt(skip, 10);
        const parsedLimit = parseInt(limit, 10);
        const filter = yield (0, helper_1.filterVehicleDriver)(req.query);
        const vehicleDrivers = yield (0, vehicleDriver_1.getAllVehicleDriversService)(filter, parseSkip, parsedLimit);
        res.status(200).json({
            code: config_1.messages.SUCCESSFUL.code,
            message: 'Vehicle Drivers fetched successfully',
            vehicleDrivers
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.getAllVehicleDrivers = getAllVehicleDrivers;
// READ Vehicle by ID
const getVehicleDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleDriver = yield (0, vehicleDriver_1.getVehicleDriverByIdService)(req.params.id);
        if (!vehicleDriver) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: 'Vehicle Driver not found'
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFUL.code,
            message: 'Vehicle Driver fetched successfully',
            vehicleDriver
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.getVehicleDriver = getVehicleDriver;
// UPDATE Vehicle
const updateVehicleDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { taxiType, vehicleBrand, vehicleModel, driver, driverFullName, frontVehicleImage, backVehicleImage, licensePlate } = req.body;
        let taxi;
        if (taxiType && vehicleBrand && vehicleModel) {
            const taxis = yield (0, taxi_1.getAllTaxiService)(0, 1, { taxiType, vehicleModel, vehicleBrand });
            if (taxis.taxies.length > 0) {
                taxi = taxis.taxies[0]._id;
            }
        }
        const vehicleDriver = yield (0, vehicleDriver_1.updateVehicleDriverService)({
            id: req.params.id,
            taxi,
            driver,
            driverFullName,
            frontVehicleImage,
            backVehicleImage,
            licensePlate,
            updatedBy: user.id,
            updatedByFullName: user.fullName
        });
        if (!vehicleDriver) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: 'Vehicle Driver not found'
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFUL.code,
            message: 'Vehicle Driver updated successfully',
            vehicleDriver
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.updateVehicleDriver = updateVehicleDriver;
// DELETE Vehicle
const deleteVehicleDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedVehicleDriver = yield (0, vehicleDriver_1.deleteVehicleDriverService)(req.params.id);
        if (!deletedVehicleDriver) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: 'Vehicle Driver not found'
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFUL.code,
            message: 'Vehicle Driver deleted successfully',
            vehicleDriver: deletedVehicleDriver
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.deleteVehicleDriver = deleteVehicleDriver;
