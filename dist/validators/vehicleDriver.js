"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateVehicleDriver = void 0;
const config_1 = require("../config");
const validateCreateVehicleDriver = (req, res, next) => {
    const { vehicleModel, vehicleBrand, driver, driverFullName, frontVehicleImage, backVehicleImage, licensePlate } = req.body;
    if (!vehicleModel) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing requird field: vehicleModel'
        });
        return;
    }
    if (!vehicleBrand) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing requird field: vehicleBrand'
        });
        return;
    }
    if (!driver) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing requird field: driver'
        });
        return;
    }
    if (!driverFullName) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing requird field: driverFullName'
        });
        return;
    }
    if (!frontVehicleImage) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing requird field: frontVehicleImage'
        });
        return;
    }
    if (!backVehicleImage) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing requird field: backVehicleImage'
        });
        return;
    }
    if (!licensePlate) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing requird field: licensePlate'
        });
        return;
    }
    next();
};
exports.validateCreateVehicleDriver = validateCreateVehicleDriver;
