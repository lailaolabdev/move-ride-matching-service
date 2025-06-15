"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentAndRatingService = exports.travelHistoryService = exports.getTheLastRideService = exports.getTotalDistanceService = exports.getNumberOfCallingTaxiService = exports.callTaxiTotalPriceReportService = exports.getHistoryRideService = exports.getDriverRideHistoryDetailByIdService = exports.getRideHistoryDetailByIdService = exports.getTotalRideService = exports.calculateDriverDistanceAndDurationService = exports.driverUpdateStatusService = exports.updateCallTaxiService = exports.getDriverCallTaxisService = exports.getUserCallTaxisService = exports.getPassengerComplainDriverByIdService = exports.createPassengerComplainDriverService = exports.createDriverComplainPassengerService = exports.getCallTaxisService = exports.sentDataToDriverSocket = exports.createCallTaxiService = void 0;
const callTaxi_1 = require("../models/callTaxi");
const axios_1 = __importDefault(require("axios"));
const helper_1 = require("../controllers/callTaxi/helper");
const mongoose_1 = require("mongoose");
const vehicleDriver_1 = __importDefault(require("../models/vehicleDriver"));
const createCallTaxiService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.user.id;
        const { carTypeId, origin, destination, originName, destinationName, requestType, distanceInPolygon, durationInPolygon, normalDuration, delayDuration, delayDistance, totalDuration, totalDistance, totalPrice, actualPrice, estimatedPrice, price, polygonPrice, onPeakTimePrice, delayPrice } = req.body;
        const splitOrigin = (0, helper_1.roundCoord)(origin);
        const splitDestination = (0, helper_1.roundCoord)(destination);
        const created = yield callTaxi_1.CallTaxi.create({
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
            delayPrice
        });
        const createdObj = created.toObject();
        return createdObj;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.createCallTaxiService = createCallTaxiService;
const sentDataToDriverSocket = (userToken, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = userToken.replace("Bearer ", "");
        yield axios_1.default.post(`${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/create`, Object.assign({}, data), {
            headers: {
                Authorization: accessToken
            }
        });
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.sentDataToDriverSocket = sentDataToDriverSocket;
const getCallTaxisService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.user.id;
        const callTaxi = yield callTaxi_1.CallTaxi.findOne({
            passengerId,
            status: {
                $in: [
                    callTaxi_1.STATUS.REQUESTING,
                    callTaxi_1.STATUS.DRIVER_RECEIVED,
                    callTaxi_1.STATUS.DRIVER_ARRIVED,
                    callTaxi_1.STATUS.PICKED_UP,
                    callTaxi_1.STATUS.DEPARTURE,
                    callTaxi_1.STATUS.SEND_SUCCESS
                ]
            }
        });
        return callTaxi ? callTaxi : null;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getCallTaxisService = getCallTaxisService;
const createDriverComplainPassengerService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rating, driverBehavior, satisfaction, remark, image } = req.body;
        const driverComplain = {};
        if (rating)
            driverComplain.rating = rating;
        if (driverBehavior)
            driverComplain.driverBehavior = driverBehavior;
        if (satisfaction)
            driverComplain.satisfaction = satisfaction;
        if (remark)
            driverComplain.remark = remark;
        if (image && image.length)
            driverComplain.image = image;
        const updated = yield callTaxi_1.CallTaxi.findOneAndUpdate({ _id: id }, { driverComplain }, { new: true });
        return updated;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.createDriverComplainPassengerService = createDriverComplainPassengerService;
const createPassengerComplainDriverService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rating, driverBehavior, satisfaction, remark, image } = req.body;
        const passengerComplain = {};
        if (rating)
            passengerComplain.rating = rating;
        if (driverBehavior)
            passengerComplain.driverBehavior = driverBehavior;
        if (satisfaction)
            passengerComplain.satisfaction = satisfaction;
        if (remark)
            passengerComplain.remark = remark;
        if (image && image.length)
            passengerComplain.image = image;
        const updated = yield callTaxi_1.CallTaxi.findOneAndUpdate({ _id: id }, { passengerComplain: passengerComplain }, { new: true });
        return updated;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.createPassengerComplainDriverService = createPassengerComplainDriverService;
// get passenger complain driver by passenger id
const getPassengerComplainDriverByIdService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const complain = yield callTaxi_1.CallTaxi.aggregate([
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
        ]);
        return complain;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getPassengerComplainDriverByIdService = getPassengerComplainDriverByIdService;
const getUserCallTaxisService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.user.id;
        const { limit = 10 } = req.query;
        const limitToNumber = parseInt(limit);
        const callTaxis = yield callTaxi_1.CallTaxi
            .find({ passengerId })
            .sort({ created: -1 })
            .limit(limitToNumber);
        return callTaxis;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getUserCallTaxisService = getUserCallTaxisService;
const getDriverCallTaxisService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.user.id;
        const callTaxis = yield callTaxi_1.CallTaxi.find({ driverId });
        return callTaxis;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getDriverCallTaxisService = getDriverCallTaxisService;
const updateCallTaxiService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { type, status, actualUsedTime } = req.body;
        const updateData = {};
        if (type)
            updateData.type = type;
        if (status)
            updateData.status = status;
        if (actualUsedTime)
            updateData.actualUsedTime = actualUsedTime;
        const updated = yield callTaxi_1.CallTaxi.findOneAndUpdate({ _id: id }, updateData, { new: true });
        return updated;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.updateCallTaxiService = updateCallTaxiService;
const driverUpdateStatusService = (req, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const driverId = req.user.id;
        const confirmed = yield callTaxi_1.CallTaxi.findByIdAndUpdate(id, { driverId, status }, { new: true });
        return confirmed;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.driverUpdateStatusService = driverUpdateStatusService;
const calculateDriverDistanceAndDurationService = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const apiKey = process.env.API_KEY || 'AIzaSyDdxCKVSzSf5K_ys6fM7mB9eOwKTcYr_Sk'; // ใส่ API Key ของคุณ
        const res = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${apiKey}`);
        const leg = res.data.routes[0].legs[0]; // ข้อมูลเส้นทางหลัก (leg)
        const totalDistance = ((_a = leg === null || leg === void 0 ? void 0 : leg.distance) === null || _a === void 0 ? void 0 : _a.value) / 1000; // ระยะทางทั้งหมด (กิโลเมตร)
        const duration = leg.duration.value | 0;
        const durationInTraffic = leg.duration_in_traffic.value | 0; // ระยะเวลาการจราจรติดขัดทั้งหมด
        // แปลงเวลาจากวินาทีเป็นนาที
        const totalNormalDurationMin = duration / 60;
        const totalTrafficDurationMin = durationInTraffic / 60;
        const totalTrafficDelayMin = (durationInTraffic - duration) / 60; // ระยะเวลาการจราจรติดขัดทั้งหมด
        return {
            totalDistance: parseFloat(totalDistance.toFixed(2)),
            totalNormalDurationMin: parseFloat(totalNormalDurationMin.toFixed(2)),
            totalTrafficDelayMin: parseFloat(totalTrafficDelayMin.toFixed(2)),
            totalTrafficDurationMin: parseFloat(totalTrafficDurationMin.toFixed(2)),
        };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.calculateDriverDistanceAndDurationService = calculateDriverDistanceAndDurationService;
// get total ride serivce
const getTotalRideService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        const totalRide = yield callTaxi_1.CallTaxi.aggregate([
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
        return totalRide.length ? totalRide[0] : { totalRide: 0 };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getTotalRideService = getTotalRideService;
const getRideHistoryDetailByIdService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const id = req.params.id;
        const rideHistoryDetail = yield callTaxi_1.CallTaxi.aggregate([
            {
                $match: { _id: new mongoose_1.Types.ObjectId(id) }
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
        if (rideHistoryDetail.length && !((_a = rideHistoryDetail[0]) === null || _a === void 0 ? void 0 : _a.point)) {
            rideHistoryDetail[0].point = 0;
        }
        if (rideHistoryDetail.length) {
            const aggregateVehicleDriver = yield vehicleDriver_1.default.aggregate([
                {
                    $match: {
                        driver: (_c = (_b = rideHistoryDetail[0]) === null || _b === void 0 ? void 0 : _b.driver) === null || _c === void 0 ? void 0 : _c._id.toString()
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
                rideHistoryDetail[0].driver.licensePlate = (_d = aggregateVehicleDriver[0]) === null || _d === void 0 ? void 0 : _d.licensePlate;
                rideHistoryDetail[0].driver.vehicleModelName = (_e = aggregateVehicleDriver[0]) === null || _e === void 0 ? void 0 : _e.vehicleModelName;
                rideHistoryDetail[0].driver.vehicleBrandName = (_f = aggregateVehicleDriver[0]) === null || _f === void 0 ? void 0 : _f.vehicleBrandName;
            }
        }
        return rideHistoryDetail.length ? rideHistoryDetail[0] : {};
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getRideHistoryDetailByIdService = getRideHistoryDetailByIdService;
const getDriverRideHistoryDetailByIdService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.user.id;
        const driverRideHistoryDetail = yield callTaxi_1.CallTaxi.aggregate([
            {
                $match: { driverId }
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
                    "passenger._id": 1,
                    "passenger.fullName": 1,
                    "passenger.profileImage": 1,
                }
            }
        ]);
        return driverRideHistoryDetail;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getDriverRideHistoryDetailByIdService = getDriverRideHistoryDetailByIdService;
const getHistoryRideService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        let rideHistory = yield callTaxi_1.CallTaxi.aggregate([
            { $match: { passengerId: passengerId } },
            {
                $project: {
                    originName: 1,
                    origin: 1,
                    destinationName: 1,
                    destination: 1,
                    totalPrice: 1,
                    status: 1,
                    invoiceRequestStatus: 1,
                    createdAt: 1
                }
            }
        ]);
        return rideHistory.length ? rideHistory : [];
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getHistoryRideService = getHistoryRideService;
const callTaxiTotalPriceReportService = (pipeline) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Execute the aggregation pipeline
        const result = yield callTaxi_1.CallTaxi.aggregate(pipeline);
        // Return the total price or 0 if no results are found
        if (result.length) {
            return result[0].totalPrice;
        }
        else {
            return 0;
        }
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.callTaxiTotalPriceReportService = callTaxiTotalPriceReportService;
// Report passenger service
const getNumberOfCallingTaxiService = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const totalTravel = yield callTaxi_1.CallTaxi.aggregate([
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
        return totalTravel.length ? (_a = totalTravel[0]) === null || _a === void 0 ? void 0 : _a.totalTravel : 0;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getNumberOfCallingTaxiService = getNumberOfCallingTaxiService;
const getTotalDistanceService = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const totalDistance = yield callTaxi_1.CallTaxi.aggregate([
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
        return totalDistance.length ? (_a = totalDistance[0]) === null || _a === void 0 ? void 0 : _a.totalDistance : 0;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getTotalDistanceService = getTotalDistanceService;
const getTheLastRideService = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestPaidRide = yield callTaxi_1.CallTaxi.findOne(filter)
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
            .limit(1)
            .exec();
        return latestPaidRide ? latestPaidRide.createdAt : null;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getTheLastRideService = getTheLastRideService;
// get calling taxi in passenger detail in admin dashboard
const travelHistoryService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield callTaxi_1.CallTaxi.countDocuments(filter);
        const rideHistory = yield callTaxi_1.CallTaxi.aggregate([
            {
                $match: filter
            },
            {
                $project: {
                    originName: 1,
                    destinationName: 1,
                    totalDistance: 1,
                    totalPrice: 1,
                    createdAt: 1,
                    driverComplain: 1,
                    passengerComplain: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
        ]);
        return {
            total,
            rideHistory: rideHistory.length ? rideHistory : []
        };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.travelHistoryService = travelHistoryService;
const getCommentAndRatingService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentAndRating = yield callTaxi_1.CallTaxi.aggregate([
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
        ]);
        return commentAndRating;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getCommentAndRatingService = getCommentAndRatingService;
