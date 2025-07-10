import { Request } from "express";
import { ICallTaxi, CallTaxi, STATUS } from "../models/callTaxi";
import axios from 'axios'
import { roundCoord } from "../controllers/callTaxi/helper";
import mongoose, { Types } from "mongoose"
import vehicleDriverModel from "../models/vehicleDriver";
import { generateBillNumber } from "../utils/generateBillNumber";

export const createCallTaxiService = async ({
    req,
    passengerFullName,
    passengerPhoneNumber
}: {
    req: Request,
    passengerFullName?: String,
    passengerPhoneNumber?: String
}): Promise<ICallTaxi | null> => {
    try {
        const passengerId = (req as any).user.id;

        const {
            carTypeId,
            origin,
            destination,
            originName,
            destinationName,
            requestType,
            distanceInPolygon,
            durationInPolygon,
            normalDuration,
            delayDuration,
            delayDistance,
            totalDuration,
            totalDistance,
            totalPrice,
            actualPrice,
            estimatedPrice,
            price,
            polygonPrice,
            onPeakTimePrice,
            delayPrice,
            country,
            countryCode,
            currency
        } = req.body

        const splitOrigin = roundCoord(origin);
        const splitDestination = roundCoord(destination);

        const created = await CallTaxi.create({
            passengerId,
            carTypeId,
            origin: splitOrigin,
            destination: splitDestination,
            originName,
            destinationName,
            requestType,
            distanceInPolygon,
            durationInPolygon,
            normalDuration,
            delayDuration,
            delayDistance,
            totalDuration,
            totalDistance,
            totalPrice,
            actualPrice,
            estimatedPrice,
            price,
            polygonPrice,
            onPeakTimePrice,
            delayPrice,
            country,
            countryCode,
            currency: currency,
            billNumber: generateBillNumber(),
            passengerFullName,
            passengerPhoneNumber
        })

        const createdObj: any = created.toObject();

        return createdObj
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const sentDataToDriverSocket = async (userToken: string, data: any) => {
    try {
        const accessToken: string = userToken.replace("Bearer ", "");

        await axios.post(`${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/create`,
            { ...data },
            {
                headers: {
                    Authorization: accessToken
                }
            }
        )
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}

export const getCallTaxisService = async (req: Request): Promise<ICallTaxi | null> => {
    try {
        const passengerId = (req as any).user.id;

        const callTaxi = await CallTaxi.findOne({
            passengerId,
            status: {
                $in: [
                    STATUS.REQUESTING,
                    STATUS.DRIVER_RECEIVED,
                    STATUS.DRIVER_ARRIVED,
                    STATUS.PICKED_UP,
                    STATUS.DEPARTURE,
                    STATUS.SEND_SUCCESS
                ]
            }
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
        if (image && image.length) driverComplain.image = image

        const updated = await CallTaxi.findOneAndUpdate(
            { _id: id },
            { driverComplain },
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

export const updateCallTaxiService = async ({ id, updateData }: {
    id: string,
    updateData: any,
}): Promise<ICallTaxi | null> => {
    try {
        const updated = await CallTaxi.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        )

        return updated
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const driverUpdateStatusService = async (data:
    {
        req: Request,
        status: String,
        driverRegistrationSource: string
        driverFullName: string,
        driverPhoneNumber: string,
    }
) => {
    try {
        const { id } = data.req.params
        const driverId = (data.req as any).user.id;

        const confirmed = await CallTaxi.findByIdAndUpdate(
            id,
            {
                driverId,
                status: data.status,
                driverRegistrationSource: data.driverRegistrationSource,
                driverFullName: data.driverFullName,
                driverPhoneNumber: data.driverFullName
            },
            { new: true }
        )

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

        return totalRide.length ? totalRide[0] : { totalRide: 0 }
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

export const getRideHistoryDetailByIdService = async (req: Request): Promise<any> => {
    try {
        const id = req.params.id

        const rideHistoryDetail = await CallTaxi.aggregate([
            {
                $match: { _id: new Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "users",
                    let: { driverId: { $toObjectId: "$driverId" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$driverId"] }
                            }
                        }
                    ],
                    as: "driver",
                },
            },
            {
                $unwind: {
                    path: "$driver",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    originName: 1,
                    destinationName: 1,
                    totalDistance: 1,
                    totalDuration: 1,
                    requestType: 1,
                    point: 1,
                    totalPrice: 1,
                    "driver._id": 1,
                    "driver.profileImage": 1,
                    "driver.fullName": 1,
                    "driver.licensePlate": 1,
                    passengerComplain: 1
                }
            }
        ]);

        if (rideHistoryDetail.length && !rideHistoryDetail[0]?.point) {
            rideHistoryDetail[0].point = 0
        }

        if (rideHistoryDetail.length) {
            const aggregateVehicleDriver = await vehicleDriverModel.aggregate([
                {
                    $match: {
                        driver: rideHistoryDetail[0]?.driver?._id.toString()
                    },
                },
                {
                    $addFields: {
                        vehicleModelObjectId: {
                            $cond: {
                                if: { $eq: [{ $type: "$vehicleModel" }, "string"] },
                                then: { $toObjectId: "$vehicleModel" },
                                else: "$vehicleModel"
                            }
                        },
                        vehicleBrandObjectId: {
                            $cond: {
                                if: { $eq: [{ $type: "$vehicleBrand" }, "string"] },
                                then: { $toObjectId: "$vehicleBrand" },
                                else: "$vehicleBrand"
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'vehiclemodels',
                        localField: 'vehicleModelObjectId',
                        foreignField: '_id',
                        as: 'vehicleModel'
                    }
                },
                {
                    $unwind: {
                        path: '$vehicleModel',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'vehiclebrands',
                        localField: 'vehicleBrandObjectId',
                        foreignField: '_id',
                        as: 'vehicleBrand'
                    }
                },
                {
                    $unwind: {
                        path: '$vehicleBrand',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        licensePlate: 1,
                        vehicleModelName: '$vehicleModel.name',
                        vehicleBrandName: '$vehicleBrand.name'
                    }
                }
            ]);

            if (aggregateVehicleDriver.length) {
                rideHistoryDetail[0].driver.licensePlate = aggregateVehicleDriver[0]?.licensePlate
                rideHistoryDetail[0].driver.vehicleModelName = aggregateVehicleDriver[0]?.vehicleModelName
                rideHistoryDetail[0].driver.vehicleBrandName = aggregateVehicleDriver[0]?.vehicleBrandName
            }
        }

        return rideHistoryDetail.length ? rideHistoryDetail[0] : {}
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
}

export const getDriverRideHistoryDetailByIdService = async (req: Request): Promise<any> => {
    try {
        const driverId = (req as any).user.id;

        const driverRideHistoryDetail = await CallTaxi.aggregate([
            {
                $match: {
                    driverId,
                    $or: [
                        { status: "Paid" },
                        { status: "Canceled" }
                    ]
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { passengerId: { $toObjectId: "$passengerId" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$passengerId"] }
                            }
                        }
                    ],
                    as: "passenger",
                },
            },
            {
                $unwind: {
                    path: "$passenger",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    requestType: 1,
                    totalDistance: 1,
                    totalDuration: 1,
                    totalPrice: 1,
                    driverComplain: 1,
                    status: 1,
                    createdAt: 1,
                    billNumber: 1,
                    currency: 1,
                    "passenger._id": 1,
                    "passenger.fullName": 1,
                    "passenger.profileImage": 1,
                }
            }
        ]);

        return driverRideHistoryDetail
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
}

export const getHistoryRideService = async (skip: string, limit: string, filter: any): Promise<any> => {
    try {
        let rideHistory = await CallTaxi.aggregate([
            { $match: filter },
            {
                $addFields: {
                    promotionPercentage: {
                        $sum: {
                            $map: {
                                input: "$festivalPromotion",
                                as: "promo",
                                in: "$$promo.promotionPercentage"
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    originName: 1,
                    origin: 1,
                    destinationName: 1,
                    destination: 1,
                    totalDuration: 1,
                    totalDistance: 1,
                    totalPrice: 1,
                    promotionPrice: 1,
                    promotionPercentage: 1,
                    status: 1,
                    invoiceRequestStatus: 1,
                    createdAt: 1
                }
            },
            { $sort: { createdAt: -1 } },
            { $skip: parseInt(skip) },
            { $limit: parseInt(limit) }
        ]);

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

// Report passenger service
export const getNumberOfCallingTaxiService = async (filter: any): Promise<any> => {
    try {
        const totalTravel = await CallTaxi.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: "$passengerId",
                    totalTravel: { $sum: 1 },
                }
            },
            {
                $project: {
                    totalTravel: 1
                }
            }
        ]);

        return totalTravel.length ? totalTravel[0]?.totalTravel : 0
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

export const getTotalDistanceService = async (filter: any): Promise<any> => {
    try {
        const totalDistance = await CallTaxi.aggregate([
            {
                $match: filter
            },
            {
                $group: {
                    _id: "$passengerId",
                    totalDistance: { $sum: "$totalDistance" }
                }
            },
            {
                $project: {
                    totalDistance: 1
                }
            }
        ]);

        return totalDistance.length ? totalDistance[0]?.totalDistance : 0
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

export const getTheLastRideService = async (filter: any): Promise<any | null> => {
    try {
        const latestPaidRide = await CallTaxi.findOne(filter)
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
            .limit(1)
            .exec();

        return latestPaidRide ? latestPaidRide.createdAt : null
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

// get calling taxi in passenger detail in admin dashboard
export const travelHistoryService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const total = await CallTaxi.countDocuments(filter)
        const rideHistory = await CallTaxi.aggregate([
            {
                $match: filter
            },
            {
                $project: {
                    origin: 1,
                    destination: 1,
                    originName: 1,
                    destinationName: 1,
                    totalDuration: 1,
                    totalDistance: 1,
                    totalPrice: 1,
                    createdAt: 1,
                    driverComplain: 1,
                    passengerComplain: 1
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
        ])

        return {
            total,
            rideHistory: rideHistory.length ? rideHistory : []
        }
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

export const getPassengerCommentAndRatingService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const commentAndRating = await CallTaxi.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "users",
                    let: { driverId: { $toObjectId: "$driverId" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$driverId"] } } }
                    ],
                    as: "driver"
                }
            },
            {
                $unwind: {
                    path: "$driver",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    passengerComplain: 1,
                    fullName: "$driver.fullName",
                    profileImage: "$driver.profileImage",
                    createdAt: 1,
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ])

        return commentAndRating
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
}

export const getDriverCommentAndRatingService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const commentAndRating = await CallTaxi.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "users",
                    let: { passengerId: { $toObjectId: "$passengerId" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$passengerId"] } } }
                    ],
                    as: "passenger"
                }
            },
            {
                $unwind: {
                    path: "$passenger",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    driverComplain: 1,
                    fullName: "$passenger.fullName",
                    profileImage: "$passenger.profileImage",
                    createdAt: 1,
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ])

        return commentAndRating
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
}

// Report driver part
export const getTotalDriverIncomeService = async (driverId: any): Promise<any> => {
    try {
        const totalIncome = await CallTaxi.aggregate([
            {
                $match: { driverId, status: "Paid" }
            },
            {
                $group: {
                    _id: null, // or "$driverId" if you want to group by driver
                    totalIncome: { $sum: "$driverIncome" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalIncome: 1
                }
            }
        ])

        return totalIncome.length ? totalIncome[0].totalIncome : 0
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
}

export const getTotalDriverIncomeServiceThatWasNotClaim = async (driverId: any): Promise<any> => {
    try {
        const totalIncome = await CallTaxi.aggregate([
            {
                $match: {
                    driverId,
                    status: "Paid",
                    isClaim: false,
                }
            },
            {
                $group: {
                    _id: null, // or "$driverId" if you want to group by driver
                    totalIncome: { $sum: "$driverIncome" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalIncome: 1
                }
            }
        ])

        return totalIncome.length ? totalIncome[0].totalIncome : 0
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
}

export const getDriverPaymentDetailService = async (callTaxiId: any): Promise<any> => {
    try {
        const driverPayment = await CallTaxi.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(callTaxiId)
                }
            },
            {
                $project: {
                    billNumber: 1,
                    requestType: 1,
                    paymentMethod: 1,
                    point: 1,
                    totalPrice: 1
                }
            }
        ])

        return driverPayment.length ? driverPayment[0] : null
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
}