import type { Request, Response } from "express";
import { messages } from "../../config";
import {
    calculateDriverDistanceAndDurationService,
    createCallTaxiService,
    getDriverCallTaxisService,
    getUserCallTaxisService,
    updateCallTaxiService,
    driverUpdateStatusService,
    callTaxiTotalPriceReportService,

    updateChatCallTaxiService,
    updateStarAndCommentService,
} from "../../services/callTaxi";
import { CallTaxi, STATUS } from "../../models/callTaxi";
import { Pipeline } from "ioredis";
import { pipeline } from "./helper";

export const createCallTaxi = async (req: Request, res: Response) => {
    try {
        // Create ride request
        const callTaxi = await createCallTaxiService(req);

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: messages.CREATE_SUCCESSFUL.message,
            callTaxi,
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
        const callTaxis = await getUserCallTaxisService(req);

        // must check passenger first

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            callTaxis,
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
        const callTaxis = await getDriverCallTaxisService(req);

        // must check rider first

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            callTaxis,
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
        const updated = await updateCallTaxiService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            data: updated,
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

export const driverUpdateStatus = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        const { id } = req.params;

        const callTaxi = await CallTaxi.findById(id);

        if (!callTaxi) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "This ride request was taken",
            });

            return;
        }

        let status: String = "";

        if (!callTaxi.driverId) {
            // driver confirm ride request
            if (callTaxi.status === STATUS.REQUESTING) status = STATUS.DRIVER_RECEIVED;
        }

        if (callTaxi && callTaxi.driverId === user.id) {
            // driver arrived to passenger
            if (callTaxi.status === STATUS.DRIVER_RECEIVED) status = STATUS.DRIVER_ARRIVED;
            // departure
            if (callTaxi.status === STATUS.DRIVER_ARRIVED) status = STATUS.DEPARTURE;
            // Success
            if (callTaxi.status === STATUS.DEPARTURE) status = STATUS.SEND_SUCCESS;

            if (callTaxi.status === STATUS.SEND_SUCCESS) {
                res.status(200).json({
                    code: messages.SUCCESSFULLY.code,
                    messages: messages.SUCCESSFULLY.message,
                });

                return
            }
        }

        const confirmed = await driverUpdateStatusService(req, status);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            confirmed,
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


// Call the service function to calculate the total price of the taxi
export const callTaxiTotalPrice = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;
        // Create pipeline
        const pipeneMongo = pipeline({
            startDate: startDate ? new Date(startDate as string) : undefined,
            endDate: endDate ? new Date(endDate as string) : undefined,
        });
        // Call the  service function
        const totalPrice = await callTaxiTotalPriceReportService(pipeneMongo);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: messages.SUCCESSFULLY.message,
            totalPrice: totalPrice,
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

// 

export const updateStartAndComment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        if(rating > 5){
            return res.status(400).json({
                code: messages.BAD_REQUEST.code,
                messages: messages.BAD_GATEWAY.message,
                detail: "The rating must not exceed 5. Please provide a value between 1 and 5."
            })
        }
          await updateStarAndCommentService(id, rating, comment);
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,

        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
}

export const chatCallTaxi = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        let { message } = req.body;
        
        const chatId = (req as any).user.id
        
        const chatData =[ {
            id: chatId, 
            message: message,
            createdAt:   new Date(), 
            updatedAt: new Date() 
        }];

      const data=  await updateChatCallTaxiService(id, chatData);
    // const data=  await updateChatCallTaxiService(id, chat);
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            data: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
}