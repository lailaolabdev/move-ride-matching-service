import { Request } from "express";
import { ICallTaxi, CallTaxi, STATUS } from "../models/callTaxi";
import axios from 'axios'

export const createCallTaxiService = async (req: Request): Promise<ICallTaxi | null> => {
    try {
        const passengerId = (req as any).user.id;

        const {
            carTypeId,
            driverId,
            origin,
            destination,
            requestType,
            distanceInPolygon,
            durationInPolygon,
            normalDuration,
            delayDuration,
            delayDistance,
            totalDuration,
            totalDistance,
            totalPrice
        } = req.body

        const created = await CallTaxi.create({
            passengerId,
            carTypeId,
            driverId,
            origin,
            destination,
            requestType,
            distanceInPolygon,
            durationInPolygon,
            normalDuration,
            delayDuration,
            delayDistance,
            totalDuration,
            totalDistance,
            totalPrice
        })

        return created
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const getCallTaxisService = async (req: Request): Promise<ICallTaxi | null> => {
    try {
        const passengerId = (req as any).user.id;

        const callTaxi = await CallTaxi.findOne({
            passengerId,
            status: { $in: ["Requesting", "Accepted", "Driver_Arrived", "departure", "Success"] }
        })

        return callTaxi ? callTaxi : null
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const createDriverComplainPassengerService = async (req: Request) => {
    try {
        const { id } = req.params

        const { rating, customerBehavior, satisfaction, remark, image } = req.body

        const driverComplain: any = {}

        if (rating) driverComplain.rating = rating
        if (customerBehavior) driverComplain.customerBehavior = customerBehavior
        if (satisfaction) driverComplain.satisfaction = satisfaction
        if (remark) driverComplain.remark = remark
        if (image.length) driverComplain.image = image

        const updated = await CallTaxi.findOneAndUpdate(
            { id },
            { driverComplain: driverComplain },
            { new: true }
        )

        return updated
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}

export const createPassengerComplainDriverService = async (req: Request) => {
    try {
        const { id } = req.params

        const { rating, driverBehavior, satisfaction, remark, image } = req.body

        const passengerComplain: any = {}

        if (rating) passengerComplain.rating = rating
        if (driverBehavior) passengerComplain.driverBehavior = driverBehavior
        if (satisfaction) passengerComplain.satisfaction = satisfaction
        if (remark) passengerComplain.remark = remark
        if (image && image.length) passengerComplain.image = image

        const updated = await CallTaxi.findOneAndUpdate(
            { _id: id },
            { passengerComplain: passengerComplain },
            { new: true }
        )
        return updated
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}

// get passenger complain driver by passenger id
export const getPassengerComplainDriverByIdService = async (req: Request) => {
    try {
        const { id } = req.params

        const complain = await CallTaxi.aggregate([
            {
                $match: {
                    passengerId: id
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { passengerId: { $toObjectId: "$passengerId" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$passengerId"] } } }
                    ],
                    as: "passengerDetails"
                }
            },
            {
                $unwind: {
                    path: "$passengerDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            // Filter out documents without passengerComplain
            {
                $match: {
                    passengerComplain: { $exists: true, $ne: null }
                }
            },
            {
                $project: {
                    _id: 1,
                    passengerComplain: 1,
                    createdAt: 1,
                    fullName: "$passengerDetails.fullName",
                    profileImage: "$passengerDetails.profileImage"
                }
            }
        ])

        return complain
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}

export const getUserCallTaxisService = async (req: Request): Promise<ICallTaxi[] | null> => {
    try {
        const passengerId = (req as any).user.id;

        const { limit = 10 } = req.query

        const limitToNumber = parseInt(limit as string)

        const callTaxis =
            await CallTaxi
                .find({ passengerId })
                .sort({ created: -1 })
                .limit(limitToNumber);

        return callTaxis
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const getDriverCallTaxisService = async (req: Request): Promise<ICallTaxi[] | null> => {
    try {
        const driverId = (req as any).user.id;

        const callTaxis = await CallTaxi.find({ driverId })

        return callTaxis
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const updateCallTaxiService = async (req: Request): Promise<ICallTaxi | null> => {
    try {
        const { id } = req.params

        const { type, status } = req.body

        const updated = await CallTaxi.findOneAndUpdate(
            { id },
            { type, status }
        )

        return updated
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const driverUpdateStatusService = async (req: Request, status: String) => {
    try {
        const { id } = req.params
        const driverId = (req as any).user.id;

        const confirmed = await CallTaxi.findByIdAndUpdate(
            id,
            { driverId, status },
            { new: true }
        ).select("-driverId")

        return confirmed
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}

export const calculateDriverDistanceAndDurationService = async (origin: string, destination: string) => {
    try {
        const apiKey = process.env.API_KEY || 'AIzaSyDdxCKVSzSf5K_ys6fM7mB9eOwKTcYr_Sk'; // ใส่ API Key ของคุณ

        const res = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${apiKey}`)

        const leg = res.data.routes[0].legs[0]; // ข้อมูลเส้นทางหลัก (leg)

        const totalDistance: number = leg?.distance?.value / 1000; // ระยะทางทั้งหมด (กิโลเมตร)

        const duration: number = leg.duration.value | 0
        const durationInTraffic: number = leg.duration_in_traffic.value | 0 // ระยะเวลาการจราจรติดขัดทั้งหมด

        // แปลงเวลาจากวินาทีเป็นนาที
        const totalNormalDurationMin: number = duration / 60;
        const totalTrafficDurationMin: number = durationInTraffic / 60;
        const totalTrafficDelayMin: number = (durationInTraffic - duration) / 60;// ระยะเวลาการจราจรติดขัดทั้งหมด

        return {
            totalDistance: parseFloat(totalDistance.toFixed(2)),
            totalNormalDurationMin: parseFloat(totalNormalDurationMin.toFixed(2)),
            totalTrafficDelayMin: parseFloat(totalTrafficDelayMin.toFixed(2)),
            totalTrafficDurationMin: parseFloat(totalTrafficDurationMin.toFixed(2)),
        }

    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}

// get total ride serivce
export const getTotalRideService = async (req: Request): Promise<any> => {
    try {
        const passengerId = req.params.id

        const totalRide = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, status: "Paid" } },
            {
                $group: {
                    _id: "$passengerId",
                    totalRides: { $sum: 1 },
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]);
        console.log(totalRide)
        return totalRide.length ? totalRide[0] : { totalRide: 0 }

    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

// get Total Distance Service
export const getTotalDistanceService = async (req: Request): Promise<any> => {
    try {
        const passengerId = req.params.id

        const totalDistance = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, status: "Paid" } },
            {
                $group: {
                    _id: "$passengerId",

                    totalDistance: { $sum: "$totalDistance" }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]);

        return totalDistance.length ? totalDistance[0] : { totalDistance: 0 }
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

// thes last ride
export const getTheLastRideService = async (req: Request): Promise<any | null> => {
    try {
        const passengerId = req.params.id

        const latestPaidRide = await CallTaxi.findOne({
            passengerId,
            status: "Paid"  // Add condition to filter for "PAID" status
        })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
            .limit(1)
            .exec();

        return latestPaidRide ? { createdAt: latestPaidRide.createdAt.toLocaleDateString("en-GB") } : { createdAt: null };

    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const getHistoryRideService = async (req: Request): Promise<any> => {
    try {
        const passengerId = req.params.id
        console.log(passengerId)
        let rideHistory = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, status: "Paid" } },
            {
                $project: {
                    origin: 1,
                    destination: 1,
                    totalDistance: 1,
                    totalPrice: 1,
                    createdAt: 1
                }
            }
        ])
        return rideHistory.length ? rideHistory : []
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const callTaxiTotalPriceReportService = async (pipeline: any) => {
    try {
        // Execute the aggregation pipeline
        const result = await CallTaxi.aggregate(pipeline);

        // Return the total price or 0 if no results are found
        if (result.length) {
            return result[0].totalPrice;
        } else {
            return 0;
        }
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

export const updateStarAndCommentService = async (id: String, rating: Number, comment: String): Promise<any> => {
    try {
        const date = {
            rating: rating,
            comment: comment,
        }
        const starDate = await CallTaxi.findOneAndUpdate({ _id: id },
            date,
            { new: true }
        )

        return starDate
    } catch (error) {
        console.log("Error creating Record: ", error);
        return null;

    }
}

export const updateChatCallTaxiService = async (id: String, chat: Object[]): Promise<any> => {
    try {

        const starDate = await CallTaxi.findOneAndUpdate({ _id: id },
            { $addToSet: { chat: chat } },
            { new: true }
        )
        return starDate
    } catch (error) {
        console.log("Error creating Record: ", error);
        return null;
    }
}

export const getCommentAndRatingService = async (id: String): Promise<any> => {
    try {

        const starDate = await CallTaxi.aggregate([
            {
                $match: {
                    driverId: id
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { passengerId: { $toObjectId: "$passengerId" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$passengerId"] } } }
                    ],
                    as: "passengerDetails"
                }
            },
            {
                $unwind: {
                    path: "$passengerDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,

                    createdAt: 1,
                    rating: 1,
                    comment: 1,
                    fullName: "$passengerDetails.fullName",
                    profileImage: "$passengerDetails.profileImage"
                }
            }
        ])

        return starDate
    } catch (error) {
        console.log("Error creating Record: ", error);
        return null;
    }
}

// get history travel service
export const travelHistoryService = async (req: Request): Promise<any> => {
    try {
        const passengerId = req.params.id


        let rideHistory = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, status: "Paid" } },
            {
                $project: {
                    origin: 1,
                    destination: 1,
                    totalDistance: 1,
                    totalPrice: 1,
                    createdAt: 1
                }
            }
        ])
        return rideHistory.length ? rideHistory : []
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

// get history cancel service
export const cancelTravelHistoryService = async (req: Request): Promise<any> => {
    try {
        const passengerId = req.params.id


        let cancelHistory = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, status: "Canceled" } },
            {
                $project: {
                    origin: 1,
                    destination: 1,
                    totalDistance: 1,
                    totalPrice: 1,
                    createdAt: 1
                }
            }
        ])
        console.log(cancelHistory, "++++++++++++++++++++++++++++++")
        return cancelHistory.length ? cancelHistory : []
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

// get total travel time

export const getTotaltravelTimeService = async (req: Request): Promise<any> => {
    try {
        const passengerId = req.params.id

        const totalTravel = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, status: "Paid" } },
            {
                $group: {
                    _id: "$passengerId",
                    totalTravel: { $sum: 1 },

                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]);
        return totalTravel.length ? totalTravel[0] : { totalTravel: 0 }

    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

// get total meter
export const getTotalmeterService = async (req: Request): Promise<any> => {
    try {
        const passengerId = req.params.id

        const totalMeter = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, requestType: "meter", status: "Paid" } },
            {
                $group: {
                    _id: "$passengerId",
                    totalMeter: { $sum: 1 },

                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]);
        return totalMeter.length ? totalMeter[0] : { totalMeter: 0 }

    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

// get total meter
export const getTotalFlatFareService = async (req: Request): Promise<any> => {
    try {
        const passengerId = req.params.id

        const totalFlatFare = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, requestType: "flat_fare", status: "Paid" } },
            {
                $group: {
                    _id: "$passengerId",
                    totalFlatFare: { $sum: 1 },

                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]);
        return totalFlatFare.length ? totalFlatFare[0] : { totalFlatFare: 0 }

    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};