import { Request, Response } from 'express';
import { messages } from '../../config';
import { filterVehicleDriver } from './helper';
import {
    createVehicleDriverService,
    deleteVehicleDriverService,
    getAllVehicleDriversService,
    getVehicleDriverByIdService,
    updateVehicleDriverService,
    getVehicleDriverByDriverIdService
} from '../../services/vehicleDriver';
import { getAllTaxiService } from '../../services/taxi';

// CREATE Taxi
export const createVehicleDriver = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const { taxiType, vehicleModel, vehicleBrand, driver, driverFullName, frontVehicleImage, backVehicleImage, licensePlate } = req.body;

        const taxis = await getAllTaxiService(0, 1, { vehicleModel, vehicleBrand, taxiType });

        if (taxis.taxies.length < 1) {
            res.status(400).json({
                code: messages.BAD_REQUEST.code,
                message: messages.BAD_REQUEST.message,
                detail: 'Vehicle Model or Vehicle Brand not found'
            });

            return;
        }

        const vehicleDriver = await createVehicleDriverService({
            taxi: taxis.taxies[0]._id,
            taxiType: taxis.taxies.taxiType,
            vehicleModel: taxis.taxies.vehicleModel,
            vehicleBrand: taxis.taxies.vehicleBrand,
            driver,
            driverFullName,
            frontVehicleImage,
            backVehicleImage,
            licensePlate,
            createdBy: user.id,
            createdByFullName: user.fullName
        });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: 'Vehicle Driver created successfully',
            vehicleDriver
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};

// READ All Vehicles
export const getAllVehicleDrivers = async (req: Request, res: Response) => {
    try {
        const { skip, limit } = req.query;
        const parseSkip = parseInt(skip as string, 10);
        const parsedLimit = parseInt(limit as string, 10);

        const filter = await filterVehicleDriver(req.query);

        const vehicleDrivers = await getAllVehicleDriversService(filter, parseSkip, parsedLimit);
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: 'Vehicle Drivers fetched successfully',
            vehicleDrivers
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};

// READ Vehicle by ID
export const getVehicleDriver = async (req: Request, res: Response) => {
    try {
        const vehicleDriver = await getVehicleDriverByIdService(req.params.id);
        if (!vehicleDriver) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: 'Vehicle Driver not found'
            });
            return;
        }
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: 'Vehicle Driver fetched successfully',
            vehicleDriver
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};

export const getVehicleDriverByDriverId = async (req: Request, res: Response) => {
    try {
        const vehicleDriver = await getVehicleDriverByDriverIdService(req.params.id);
        if (!vehicleDriver) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: 'Vehicle Driver not found'
            });
            return;
        }
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: 'Vehicle Driver fetched successfully',
            vehicleDriver
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};

// UPDATE Vehicle
export const updateVehicleDriver = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const { taxiType, vehicleBrand, vehicleModel, driver, driverFullName, frontVehicleImage, backVehicleImage, licensePlate } = req.body;

        let taxi;
        if (taxiType && vehicleBrand && vehicleModel) {
            const taxis = await getAllTaxiService(0, 1, { taxiType, vehicleModel, vehicleBrand });
            if (!taxis.taxies) {
                res.status(400).json({
                    code: messages.BAD_REQUEST.code,
                    message: messages.BAD_REQUEST.message,
                    detail: 'Vehicle Model or Vehicle Brand not found'
                });

                return;
            }

            taxi = taxis._id;
        }

        const vehicleDriver = await updateVehicleDriverService({
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
                code: messages.NOT_FOUND.code,
                message: 'Vehicle Driver not found'
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: 'Vehicle Driver updated successfully',
            vehicleDriver
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};

// DELETE Vehicle
export const deleteVehicleDriver = async (req: Request, res: Response) => {
    try {
        const deletedVehicleDriver = await deleteVehicleDriverService(req.params.id);
        if (!deletedVehicleDriver) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: 'Vehicle Driver not found'
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: 'Vehicle Driver deleted successfully',
            vehicleDriver: deletedVehicleDriver
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};
