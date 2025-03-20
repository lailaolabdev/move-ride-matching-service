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
    getTotalRideService,
    getTotalDistanceService,
    getTheLastRideService,
    getHistoryRideService,
} from "../../services/callTaxi";
import { CallTaxi, ICallTaxi, STATUS } from "../../models/callTaxi";
import axios from "axios";

export const createCallTaxi = async (req: Request, res: Response) => {
    try {
        const passengerId = (req as any).user.id;
        // // If production deployed uncomment this 
        // const isCallTaxiExist = await getCallTaxisService(req)

        // if (isCallTaxiExist) {
        //     res.status(400).json({
        //         code: messages.BAD_REQUEST.code,
        //         message: messages.BAD_REQUEST.message,
        //         detail: "A taxi request is already in progress"
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

        if (!passenger) {
            res.status(404).json({
                ...messages.NOT_FOUND,
                detail: `Id: ${passengerId} not found`
            });

            return
        }

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

        const driver = await axios.get(`
            ${process.env.USER_SERVICE_URL}/v1/api/users/${user.id}`,
            {
                headers: {
                    Authorization: `${req.headers["authorization"]}`
                }
            }
        );

        if (!driver?.data) {
            res.status(404).json({
                ...messages.NOT_FOUND,
                detail: `Driver id: ${user.id} not found`
            });

            return
        }

        if (driver.data.user.role !== "DRIVER") {
            res.status(400).json({
                ...messages.BAD_REQUEST,
                detail: "You are not a driver"
            });

            return
        }

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


// report total ride 

export const gettotalRide = async (req: Request, res: Response) => {
    try {
        const totalRide = await getTotalRideService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            ...totalRide,
        });
    } catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};


// report total totalDistance 

export const getTotalDistance = async (req: Request, res: Response) => {
    try {
        const totalDistance = await getTotalDistanceService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            totalDistance,
        });

    } catch (error) {
        console.error("Error fetching total ride:", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};


// report total the last ride
export const getThelastRide = async (req: Request, res: Response) => {
    try {
        const lastRide = await getTheLastRideService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            ...lastRide,
        });
    } catch (error) {
        console.error("Error fetching total ride:", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};


// report  ride history
export const getRideHistory = async (req: Request, res: Response) => {
    try {
        const rideHistory = await getHistoryRideService(req);
        // if(!rideHistory.length) {
        //     res.status(200).json({
        //         code: messages.SUCCESSFULLY.code,
        //         messages: messages.SUCCESSFULLY.message,
        //         rideHistory: rideHistory
        //     });
        // }
        // console.log(rideHistory)
         
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            ...rideHistory
        });
    } catch (error) {
        console.error("Error fetching total ride:", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};