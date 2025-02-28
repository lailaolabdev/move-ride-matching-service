import { NextFunction, Request, Response } from "express";
import { messages } from "../config";

export const validateCreateVehicleDriver = (req: Request, res: Response, next: NextFunction) => {
    const { vehicleModel, vehicleBrand, driver, driverFullName, frontVehicleImage, backVehicleImage, licensePlate } = req.body;
    if (!vehicleModel) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: vehicleModel'
        });
        return;
    }
    if(!vehicleBrand){
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: vehicleBrand'
        });
        return;
    }
    if(!driver) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: driver'
        });
        return;
    }
    if(!driverFullName) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: driverFullName'
        });
        return;
    }
    if(!frontVehicleImage) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: frontVehicleImage'
        });
        return;
    }
    if(!backVehicleImage) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: backVehicleImage'
        });
        return;
    }
    if(!licensePlate) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: licensePlate'
        });
        return;
    }
    next();
}