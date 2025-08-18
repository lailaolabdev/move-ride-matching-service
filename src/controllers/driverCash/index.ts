import { Request, Response } from "express";
import {
    createDriverCashService,
    deleteDriverCashService,
    getAllDriverCashService,
    getDriverCashByIdService,
    updateDriverCashServiceById,
    updateDriverCashServiceByDriverId,
    getDriverCashByDriverIdService,
} from "../../services/driverCash";
import { messages } from "../../config";
import { validateDriverCashBody } from "./helper";
import { IDriverCash } from "../../models/driverCash";

// CREATE Driver Cash
export const createDriverCash = async (req: Request, res: Response) => {
    try {
        const driverId = (req as any).user.id;
        const body = validateDriverCashBody(req.body);

        const existingDriverCash = await getDriverCashByDriverIdService(body.driver);

        if (existingDriverCash) {
            res.status(400).json({
                code: messages.ALREADY_EXIST.code,
                message: "Driver cash already exists for this driver",
            });

            return
        }

        const driverCash = await createDriverCashService(driverId, body);

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: "Driver cash created successfully",
            driverCash,
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// GET ALL Driver Cash
export const getAllDriverCash = async (req: Request, res: Response) => {
    try {
        const { skip = 0, limit = 10, driver } = req.query;

        const parsedSkip = parseInt(skip as string, 10);
        const parsedLimit = parseInt(limit as string, 10);

        const filter: any = {};
        if (driver) filter.driver = driver;

        const driverCashList = await getAllDriverCashService(parsedSkip, parsedLimit, filter);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Driver cash list fetched successfully",
            driverCashList,
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// GET Driver Cash by ID
export const getDriverCashById = async (req: Request, res: Response) => {
    try {
        const driverCash = await getDriverCashByIdService(req.params.id);

        if (!driverCash) {
            return res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Driver cash not found",
            });
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Driver cash fetched successfully",
            driverCash,
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

export const getDriverCashByDriverId = async (req: Request, res: Response) => {
    try {
        const driverId = (req as any).user.id;

        const driverCash: IDriverCash | null = await getDriverCashByDriverIdService(driverId);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Driver cash updated successfully",
            driverCash,
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// UPDATE Driver Cash
export const updateDriverCash = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = validateDriverCashBody(req.body);

        const updatedDriverCash = await updateDriverCashServiceById(id, body);

        if (!updatedDriverCash) {
            return res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Driver cash not found",
            });
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Driver cash updated successfully",
            updatedDriverCash,
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// DELETE Driver Cash
export const deleteDriverCash = async (req: Request, res: Response) => {
    try {
        const deletedDriverCash = await deleteDriverCashService(req.params.id);

        if (!deletedDriverCash) {
            return res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Driver cash not found",
            });
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Driver cash deleted successfully",
            deletedDriverCash,
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// Adjust Driver Cash
// This endpoint adjusts the driver's cash balance based on the provided body
// If the driver cash does not exist, it creates a new entry
export const adjustDriverCash = async (req: Request, res: Response) => {
    try {
        const driverId = (req as any).user.id;
        const body = validateDriverCashBody(req.body);

        const driverCashExists: IDriverCash | null = await getDriverCashByDriverIdService(driverId);

        let driverCash: IDriverCash | null;

        if (driverCashExists) {
            body.amount = (driverCashExists.amount || 0) + (body.amount || 0);
            driverCash = await updateDriverCashServiceByDriverId(driverId, body);
        } else {
            driverCash = await createDriverCashService(driverId, body);
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Driver cash updated successfully",
            driverCash,
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};