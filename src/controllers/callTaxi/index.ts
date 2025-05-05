import type { Request, Response } from "express";
import { messages } from "../../config";
import {
    calculateDriverDistanceAndDurationService,
    createCallTaxiService,
    getDriverCallTaxisService,
    getUserCallTaxisService,
    updateCallTaxiService,
    driverUpdateStatusService,
    getTotalRideService,
    getTotalDistanceService,
    getTheLastRideService,
    getHistoryRideService,
    getCommentAndRatingService,
    updateChatCallTaxiService,
    updateStarAndCommentService,
    callTaxiTotalPriceReportService,
    travelHistoryService,
    cancelTravelHistoryService,
    getTotaltravelTimeService,
    getTotalmeterService,
    getTotalFlatFareService,
    createDriverComplainPassengerService,
    createPassengerComplainDriverService,
    getPassengerComplainDriverByIdService,
} from "../../services/callTaxi";
import { CallTaxi, ICallTaxi, STATUS } from "../../models/callTaxi";
import axios from "axios";
import { getDriver, getPassenger, pipeline } from "./helper";

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
        const passenger = await getPassenger(req, res)

        const callTaxi: any = await createCallTaxiService(req);

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: messages.CREATE_SUCCESSFUL.message,
            callTaxi: {
                fullName: passenger.fullName ?? "",
                profileImage: passenger.profileImage ?? "",
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

export const createDriverComplain = async (req: Request, res: Response) => {
    try {
        const created = await createDriverComplainPassengerService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            data: created,
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

export const createPassengerComplain = async (req: Request, res: Response) => {
    try {
        const created = await createPassengerComplainDriverService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            data: created,
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

export const getPassengerComplainById = async (req: Request, res: Response) => {
    try {
        const complain = await getPassengerComplainDriverByIdService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            data: complain,
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

        // Check is driver exist or not
        const driver = await getDriver(req, res)

        // Checking calling taxi
        const callTaxi = await CallTaxi.findById(id);

        if (!callTaxi) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "This ride request was taken",
            });

            return;
        }

        // Update status
        let status: String = "";

        if (!callTaxi.driverId) {
            // driver confirm ride request
            if (callTaxi.status === STATUS.REQUESTING) status = STATUS.DRIVER_RECEIVED;
        }

        if (callTaxi && callTaxi.driverId === user.id) {
            // driver arrived to passenger
            if (callTaxi.status === STATUS.DRIVER_RECEIVED) status = STATUS.DRIVER_ARRIVED;

            else if (callTaxi.status === STATUS.DRIVER_ARRIVED) status = STATUS.DEPARTURE;

            else if (callTaxi.status === STATUS.DEPARTURE) status = STATUS.SEND_SUCCESS;

            else if (callTaxi.status === STATUS.SEND_SUCCESS) {
                res.status(200).json({
                    code: messages.SUCCESSFULLY.code,
                    messages: messages.SUCCESSFULLY.message,
                });

                return
            } else {
                res.status(400).json({
                    code: messages.BAD_REQUEST.code,
                    messages: "Status not found",
                });

                return
            }
        }

        const confirmed = await driverUpdateStatusService(req, status);

        if (!confirmed) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: messages.NOT_FOUND.message,
            });

            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            confirmed: {
                _id: confirmed?._id,
                passengerId: confirmed?.passengerId,
                requestType: confirmed?.requestType,
                status: confirmed?.status,
                driver
            },
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
            ...totalDistance,
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
        const travelHistory = await getHistoryRideService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            travelHistory
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

export const updateStartAndComment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        if (rating > 5) {
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

        const chatData = [{
            id: chatId,
            message: message,
            createdAt: new Date(),
            updatedAt: new Date()
        }];

        const data = await updateChatCallTaxiService(id, chatData);
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

export const getComentAndRating = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const data = await getCommentAndRatingService(id);
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

// report ride history
export const travelHistoryHistory = async (req: Request, res: Response) => {
    try {
        const travelHistory = await travelHistoryService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            travelHistory
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

export const cancelTravelHistoryHistory = async (req: Request, res: Response) => {
    try {
        const travelHistory = await cancelTravelHistoryService(req)

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            travelHistory
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

// total travel time 
export const gettotalTravelTime = async (req: Request, res: Response) => {
    try {
        const totalTravelTime = await getTotaltravelTimeService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            ...totalTravelTime,
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

// get total travel request type meter
export const getTotalMeterTime = async (req: Request, res: Response) => {
    try {
        const totalMeterTime = await getTotalmeterService(req);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            ...totalMeterTime,
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

// get total travel request type meter
export const getTotalFlatFareTime = async (req: Request, res: Response) => {
    try {
        const totalFlatFare = await getTotalFlatFareService(req);
        console.log(totalFlatFare)
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            ...totalFlatFare,
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