import { Request, Response } from 'express';
import { createTaxiService, deleteTaxiService, getAllTaxiService, getTaxiByIdService, updateTaxiService } from '../../services/taxi';
import { messages } from '../../config';
import { filterTaxis } from './helper';

// CREATE Taxi
export const createTaxi = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const { taxiType, vehicleModel,vehicleModelName, vehicleBrand, vehicleBrandName, passengerMin, passengerMax, meteredFare, flatFare } = req.body;

        const taxi = await createTaxiService({
            taxiType,
            vehicleModel,
            vehicleModelName,
            vehicleBrand,
            vehicleBrandName,
            passengerMin,
            passengerMax,
            meteredFare,
            flatFare,
            createdBy: user.id,
            createdByFullName: user.fullName
        });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: 'Vehicle created successfully',
            taxi
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
export const getAllTaxies = async (req: Request, res: Response) => {
    try {
        const { skip, limit } = req.query;
        const parseSkip = parseInt(skip as string, 10);
        const parsedLimit = parseInt(limit as string, 10);

        const filter = await filterTaxis(req);

        const taxies = await getAllTaxiService(parseSkip, parsedLimit, filter);
        res.status(200).json({
            code: messages.SUCCESSFUL.code,
            message: 'Vehicles fetched successfully',
            taxies
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
export const getVehicleById = async (req: Request, res: Response) => {
    try {
        const taxi = await getTaxiByIdService(req.params.id);
        if (!taxi) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: 'Vehicle not found'
            });
            return;
        }
        res.status(200).json({
            code: messages.SUCCESSFUL.code,
            message: 'Vehicle fetched successfully',
            taxi 
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
export const updateTaxi = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        const updatedTaxi = await updateTaxiService({
            id: req.params.id,
            taxiType: req.body.taxiType,
            vehicleModel: req.body.vehicleModel,
            vehicleBrand: req.body.vehicleBrand,
            passengerMin: req.body.passengerMin,
            passengerMax: req.body.passengerMax,
            meteredFare: req.body.meteredFare,
            flatFare: req.body.flatFare,
            updatedBy: user.id,
            updatedByFullName: user.fullName
        });

        if (!updatedTaxi) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: 'Vehicle not found'
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFUL.code,
            message: 'Vehicle updated successfully',
            taxi: updatedTaxi
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
export const deleteTaxi = async (req: Request, res: Response) => {
    try {
        const deletedTaxi = await deleteTaxiService(req.params.id);
        if (!deletedTaxi) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: 'Vehicle not found'
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFUL.code,
            message: 'Vehicle deleted successfully',
            taxi: deletedTaxi
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
