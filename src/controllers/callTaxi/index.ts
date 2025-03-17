import type { Request, Response } from "express";
import { messages } from "../../config";
import {
    calculateDriverDistanceAndDurationService,
    createCallTaxiService,
    getDriverCallTaxisService,
    getUserCallTaxisService,
    updateCallTaxiService,
    driverUpdateStatusService,
    getCallTaxisService,
} from "../../services/callTaxi";
import { CallTaxi, ICallTaxi, STATUS } from "../../models/callTaxi";
import axios from "axios";

export const createCallTaxi = async (req: Request, res: Response) => {
    try {
        const passengerId = (req as any).user.id;

        // const isCallTaxiExist = await getCallTaxisService(req)

        // if (isCallTaxiExist) {
        //     res.status(201).json({
        //         code: messages.BAD_REQUEST.code,
        //         message: messages.BAD_REQUEST.message,
        //         detail: "This user is in processing calling taxi"
        //     });

        //     return
        // }

        // Fetch user data
        const passengerData = await axios.get(
            `${process.env.USER_SERVICE_URL}/v1/api/users/${passengerId}`,
            {
                headers: {
                    Authorization: `${req.headers["authorization"]}`,
                },
            }
        );

        const passenger = passengerData?.data?.user

        const callTaxi: any = await createCallTaxiService(req);

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: messages.CREATE_SUCCESSFUL.message,
            callTaxi: {
                fullName: passenger.fullName,
                profileImage: passenger.profileImage,
                ...callTaxi.toObject()
            }
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
