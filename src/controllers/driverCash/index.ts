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
import axios from "axios";

// Create DriverCash
export const createDriverCash = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            driver,
            firstName,
            lastName,
            fullName,
            phone,
            email,
            country,
            countryCode,
            amount,
            limit
        } = req.body;

        const existingDriverCash = await getDriverCashByDriverIdService(driver);

        if (existingDriverCash) {
            res.status(400).json({
                code: messages.ALREADY_EXIST.code,
                message: "Driver cash already exists for this driver",
            });

            return
        }

        const driverId = (req as any).user.id;

        const driverCash = await createDriverCashService(driverId, {
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
            code: messages.CREATE_SUCCESSFUL.code,
            message: messages.CREATE_SUCCESSFUL.message,
            data: driverCash
        });

    } catch (error) {
        console.error("Error in createDriverCash: ", error);
        return res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
    }
};

// Get All DriverCash
export const getAllDriverCash = async (req: Request, res: Response): Promise<any> => {
    try {
        const skip = parseInt(req.query.skip as string) || 0;
        const limit = parseInt(req.query.limit as string) || 10;
        const filter = {};

        const result = await getAllDriverCashService(skip, limit, filter);

        return res.status(200).json({
            success: true,
            total: result.total,
            data: result.driverCashList
        });
    } catch (error) {
        console.error("Error in getAllDriverCash: ", error);
        return res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
    }
};

// GET Driver Cash by ID
export const getDriverCashById = async (req: Request, res: Response): Promise<any> => {
    try {
        const driverCash = await getDriverCashByIdService(req.params.id);

        if (!driverCash) {
            return res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: messages.NOT_FOUND.message,
                detail: "Driver cash not found",
            });
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: messages.SUCCESSFULLY.message,
            detail: "Driver cash fetched successfully",
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


export const getDriverCashByDriverId = async (req: Request, res: Response): Promise<any> => {
    try {
        const driverId = (req as any).user.id;
        const driverCash = await getDriverCashByDriverIdService(driverId);

        if (!driverCash) {
            return res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: messages.NOT_FOUND.message,
                detail: "Driver cash not found",
            });
        }

        return res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: messages.SUCCESSFULLY.message,
            detail: "Driver cash fetched successfully",
            dr: driverCash,
        });
    } catch (error) {
        console.error("Error in getDriverCashByDriverIdController: ", error);
        return res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};


// UPDATE Driver Cash
export const updateDriverCash = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const body = validateDriverCashBody(req.body);

        const updatedDriverCash = await updateDriverCashServiceById(id, body);

        if (!updatedDriverCash) {
            return res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: messages.NOT_FOUND.message,
                detail: "Driver cash not found",
            });
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: messages.SUCCESSFULLY.message,
            detail: "Driver cash updated successfully",
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
export const deleteDriverCash = async (req: Request, res: Response): Promise<any> => {
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
            message: messages.SUCCESSFULLY.message,
            detail: "Driver cash deleted successfully",
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
            const driver = await axios.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${driverId}`);
            const driverData = driver?.data?.user

            if (!driverData) {
                res.status(400).json({
                    code: messages.BAD_REQUEST.code,
                    message: `User with this id: ${driverId} not found`,
                });

                return;
            }

            const createData = {
                firstName: driverData?.firstName || "",
                lastName: driverData?.lastName || "",
                fullName: driverData?.fullName || "",
                phone: driverData?.phone || "",
                email: driverData?.email || "",
                country: driverData?.country?._id || "",
                countryCode: driverData?.country?.code || "",
                amount: body.amount || 0
            }

            driverCash = await createDriverCashService(driverId, createData);
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: messages.SUCCESSFULLY.message,
            detail: "Driver cash updated successfully",
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