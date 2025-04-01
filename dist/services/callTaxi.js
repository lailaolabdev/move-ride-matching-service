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
exports.getTotalFlatFareService = exports.getTotalmeterService = exports.getTotaltravelTimeService = exports.cancelTravelHistoryService = exports.travelHistoryService = exports.getCommentAndRatingService = exports.updateChatCallTaxiService = exports.updateStarAndCommentService = exports.callTaxiTotalPriceReportService = exports.getHistoryRideService = exports.getTheLastRideService = exports.getTotalDistanceService = exports.getTotalRideService = exports.calculateDriverDistanceAndDurationService = exports.driverUpdateStatusService = exports.updateCallTaxiService = exports.getDriverCallTaxisService = exports.getUserCallTaxisService = exports.createDriverComplainPassengerService = exports.getCallTaxisService = exports.createCallTaxiService = void 0;
const callTaxi_1 = require("../models/callTaxi");
const axios_1 = __importDefault(require("axios"));
const createCallTaxiService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.user.id;
        const { carTypeId, driverId, origin, destination, requestType, distanceInPolygon, durationInPolygon, normalDuration, delayDuration, delayDistance, totalDuration, totalDistance, totalPrice } = req.body;
        const created = yield callTaxi_1.CallTaxi.create({
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
        });
        return created;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.createCallTaxiService = createCallTaxiService;
const getCallTaxisService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.user.id;
        const callTaxi = yield callTaxi_1.CallTaxi.findOne({
            passengerId,
            status: { $in: ["Requesting", "Accepted", "Driver_Arrived", "departure", "Success"] }
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
        const { rating, customerBehavior, satisfaction, remark, image } = req.body;
        const driverComplain = {};
        if (rating)
            driverComplain.rating = rating;
        if (customerBehavior)
            driverComplain.customerBehavior = customerBehavior;
        if (satisfaction)
            driverComplain.satisfaction = satisfaction;
        if (remark)
            driverComplain.remark = remark;
        if (image.length)
            driverComplain.image = image;
        const updated = yield callTaxi_1.CallTaxi.findOneAndUpdate({ id }, { driverComplain });
        return updated;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.createDriverComplainPassengerService = createDriverComplainPassengerService;
const getUserCallTaxisService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.user.id;
        const callTaxis = yield callTaxi_1.CallTaxi.find({ passengerId });
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
        const { type, status } = req.body;
        const updated = yield callTaxi_1.CallTaxi.findOneAndUpdate({ id }, { type, status });
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
        console.log(totalRide);
        return totalRide.length ? totalRide[0] : { totalRide: 0 };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getTotalRideService = getTotalRideService;
// get Total Distance Service
const getTotalDistanceService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        const totalDistance = yield callTaxi_1.CallTaxi.aggregate([
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
        return totalDistance.length ? totalDistance[0] : { totalDistance: 0 };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getTotalDistanceService = getTotalDistanceService;
// thes last ride
const getTheLastRideService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        const latestPaidRide = yield callTaxi_1.CallTaxi.findOne({
            passengerId,
            status: "Paid" // Add condition to filter for "PAID" status
        })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
            .limit(1)
            .exec();
        return latestPaidRide ? { createdAt: latestPaidRide.createdAt.toLocaleDateString("en-GB") } : { createdAt: null };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getTheLastRideService = getTheLastRideService;
const getHistoryRideService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        console.log(passengerId);
        let rideHistory = yield callTaxi_1.CallTaxi.aggregate([
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
const updateStarAndCommentService = (id, rating, comment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = {
            rating: rating,
            comment: comment,
        };
        const starDate = yield callTaxi_1.CallTaxi.findOneAndUpdate({ _id: id }, date, { new: true });
        return starDate;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        return null;
    }
});
exports.updateStarAndCommentService = updateStarAndCommentService;
const updateChatCallTaxiService = (id, chat) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const starDate = yield callTaxi_1.CallTaxi.findOneAndUpdate({ _id: id }, { $addToSet: { chat: chat } }, { new: true });
        return starDate;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        return null;
    }
});
exports.updateChatCallTaxiService = updateChatCallTaxiService;
const getCommentAndRatingService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const starDate = yield callTaxi_1.CallTaxi.aggregate([
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
        ]);
        return starDate;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        return null;
    }
});
exports.getCommentAndRatingService = getCommentAndRatingService;
// get history travel service
const travelHistoryService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        let rideHistory = yield callTaxi_1.CallTaxi.aggregate([
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
        ]);
        return rideHistory.length ? rideHistory : [];
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.travelHistoryService = travelHistoryService;
// get history cancel service
const cancelTravelHistoryService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        let cancelHistory = yield callTaxi_1.CallTaxi.aggregate([
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
        ]);
        console.log(cancelHistory, "++++++++++++++++++++++++++++++");
        return cancelHistory.length ? cancelHistory : [];
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.cancelTravelHistoryService = cancelTravelHistoryService;
// get total travel time
const getTotaltravelTimeService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        const totalTravel = yield callTaxi_1.CallTaxi.aggregate([
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
        return totalTravel.length ? totalTravel[0] : { totalTravel: 0 };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getTotaltravelTimeService = getTotaltravelTimeService;
// get total meter
const getTotalmeterService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        const totalMeter = yield callTaxi_1.CallTaxi.aggregate([
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
        return totalMeter.length ? totalMeter[0] : { totalMeter: 0 };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getTotalmeterService = getTotalmeterService;
// get total meter
const getTotalFlatFareService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        const totalFlatFare = yield callTaxi_1.CallTaxi.aggregate([
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
        return totalFlatFare.length ? totalFlatFare[0] : { totalFlatFare: 0 };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.getTotalFlatFareService = getTotalFlatFareService;
