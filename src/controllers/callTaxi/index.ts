import type { Request, Response } from "express";
import { messages } from "../../config";
import {
    calculateDriverDistanceAndDurationService,
    createCallTaxiService,
    driverConfirmedService,
    getDriverCallTaxisService,
    getUserCallTaxisService,
    updateCallTaxiService
} from "../../services/callTaxi";
import { CallTaxi, STATUS } from "../../models/callTaxi";

export const createCallTaxi = async (req: Request, res: Response) => {
    try {
        // Create ride request
        const callTaxi = await createCallTaxiService(req)

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: messages.CREATE_SUCCESSFUL.message,
            callTaxi
        });
    } catch (error) {
        console.log("error: ", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

export const getUserCallTaxis = async (req: Request, res: Response) => {
    try {
        const callTaxis = await getUserCallTaxisService(req)

        // must check passenger first

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            callTaxis
        });
    } catch (error) {
        console.error("Error fetching tax info:", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

export const getDriverCallTaxis = async (req: Request, res: Response) => {
    try {
        const callTaxis = await getDriverCallTaxisService(req)

        // must check rider first

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            callTaxis
        });
    } catch (error) {
        console.error("Error fetching tax info:", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

export const updateCallTaxis = async (req: Request, res: Response) => {
    try {
        const updated = await updateCallTaxiService(req)

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            data: updated
        });
    } catch (error) {
        console.error("Error fetching tax info:", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

export const driverConfirmed = async (req: Request, res: Response) => {
    try {
        // Create ride request
        const { id } = req.params

        const callTaxi = await CallTaxi.findById(id)

        if (!callTaxi) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "This ride request was taken",
            });

            return;
        }

        const confirmed = await driverConfirmedService(req)

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            confirmed
        });
    } catch (error) {
        console.error("Error fetching tax info:", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
}
