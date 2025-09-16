import { Request, Response } from "express";
import axios from "axios";
import { messages } from "../../config";
import taxiModel from "../../models/taxi";

type FilterInput = {
    startDate: Date | undefined,
    endDate: Date | undefined,
}

export const getCallTaxiPipeline = (query: any) => {
    const {
        startDate,
        endDate,
        minPrice,
        maxPrice,
        minTotalDistance,
        maxTotalDistance,
        claimMoney,
        country,
        status
    }: any = query;

    const match: any = {};

    if (claimMoney) match.claimMoney = claimMoney;

    // find start and date
    if (startDate && endDate) {
        match.createdAt = {
            $gte: new Date(startDate.toString()),
            $lte: new Date(endDate.toString()),
        };
    }

    // find min and max Price
    if (minPrice && maxPrice) {
        match.totalPrice = {
            $gte: Number(minPrice),
            $lte: Number(maxPrice),
        };
    }

    // find min and max distance
    if (minTotalDistance && maxTotalDistance) {
        match.totalDuration = {
            $gte: Number(minTotalDistance),
            $lte: Number(maxTotalDistance),
        };
    }

    if (country) {
        match.country = country;
    }

    if (status) {
        match.status = status;
    }

    return match
}

export const pipeline = ({ startDate, endDate }: FilterInput) => {
    const matchStage: any = {};
    const pipeline: any[] = [];

    // If startDate and endDate are provided, add a $match stage to filter by date range
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        matchStage.createdAt = {
            $gte: start,
            $lte: end,
        };
    }

    // Add $match stage if date range is provided
    if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
    }

    // Add $group stage to calculate the total price
    pipeline.push({
        $group: {
            _id: null,
            totalPrice: { $sum: "$totalPrice" },
        },
    });
    return pipeline
}

export const getDriver = async (req: Request, res: Response) => {
    const user = (req as any).user;

    try {
        const driver = await axios.get(`
                   ${process.env.USER_SERVICE_URL}/v1/api/users/${user.id}`,
            {
                headers: {
                    Authorization: `${req.headers["authorization"]}`
                }
            }
        );

        return driver
    } catch (error) {
        console.log(error);

        return false
    }
}

export const getPassenger = async (req: Request, res: Response) => {
    const passengerId = (req as any).user.id;

    try {
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

        return passenger
    } catch (error) {
        console.log(error);

        return false
    }
}

export const roundCoord = (coordStr: any) => {
    const [lat, lng] = coordStr.split(",").map(Number);
    return `${lat.toFixed(6)},${lng.toFixed(6)}`;
};

export const getCountry = async (id: string, token: string) => {
    try {
        const countryData = await axios.get(
            `${process.env.USER_SERVICE_URL}/v1/api/countries/${id}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        return countryData?.data?.country
    } catch (error) {
        console.log(error);

        return false
    }
}

export const getDriverLatLong = async (id: string) => {
    try {
        const countryData = await axios.get(
            `${process.env.SOCKET_SERVICE_URL}/v1/api//driver-location-socket/${id}`
        );

        return countryData?.data?.driverLatLong
    } catch (error) {
        console.log(error);

        return false
    }
}

export const removeCallTaxiFromRedis = async (id: string) => {
    try {
        await axios.delete(`${process.env.SOCKET_SERVICE_URL}/v1/api/payment-socket/meter-price/${id}`);
    } catch (error) {
        console.log("Error from removeCallTaxiFromRedis: ", error);
    }
}

export const notifyDriverWhenCancel = async (token: string, callTaxi: any) => {
    try {
        await axios.post(
            `${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/cancel`,
            callTaxi,
            {
                headers: {
                    Authorization: token
                }
            }
        );
    } catch (error) {
        console.log("Error from getMeterPrice: ", error);
    }
}

export const notifyPassengerWithNotification = async ({ recipient, token, caseType }: {
    recipient: string,
    token: string,
    caseType: string
}) => {
    try {
        let payload;

        const info = {
            type: "NOTICE",
            platform: "TAXI",
            recipientRole: "CUSTOMER",
        }

        switch (caseType) {
            case "Accepted":
                payload = {
                    recipient,
                    title: "Your ride request was accepted ✅",
                    detail: "A driver has accepted your request and is on the way.",
                    ...info,
                };
                break;

            case "Driver_Arrived":
                payload = {
                    recipient,
                    title: "Your driver has arrived 🚖",
                    detail: "Please meet your driver at the pickup point.",
                    ...info,
                };
                break;

            case "Success":
                payload = {
                    recipient,
                    title: "You’ve arrived at your destination 🏁",
                    detail: "Thank you for riding with us! We hope to see you again soon.",
                    ...info,
                };
                break;

            case "Paid":
                payload = {
                    recipient,
                    title: "Payment successful 💳",
                    detail: "Your payment has been processed successfully.",
                    ...info,
                };
                break;

            default:
                throw new Error(`Unknown caseType: ${caseType}`);
        }

        if (payload) {
            await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/v1/api/notifications`,
                payload,
                {
                    headers: {
                        Authorization: token
                    }
                })
        }
    } catch (error) {
        console.log(error);
    }
}