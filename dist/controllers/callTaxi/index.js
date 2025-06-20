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
exports.getDriverPaymentDetail = exports.getTotalDriverIncome = exports.getCommentAndRating = exports.travelHistory = exports.reportPassenger = exports.callTaxiTotalPrice = exports.getRideHistory = exports.getDriverRideHistoryDetailById = exports.getRideHistoryDetailById = exports.gettotalRide = exports.driverUpdateStatus = exports.updateCallTaxis = exports.getDriverCallTaxis = exports.getPassengerComplainById = exports.createPassengerComplain = exports.createDriverComplain = exports.getUserCallTaxis = exports.checkCallTaxiStatus = exports.getCallTaxis = exports.getCallTaxiById = exports.createCallTaxi = void 0;
const config_1 = require("../../config");
const callTaxi_1 = require("../../services/callTaxi");
const callTaxi_2 = require("../../models/callTaxi");
const axios_1 = __importDefault(require("axios"));
const helper_1 = require("./helper");
const taxi_1 = __importDefault(require("../../models/taxi"));
const rating_1 = require("../../models/rating");
const vehicleDriver_1 = __importDefault(require("../../models/vehicleDriver"));
const mongoose_1 = require("mongoose");
const calculation_1 = require("../calculation");
const claimMoney_1 = require("../../services/claimMoney");
const timezone_1 = require("../../utils/timezone");
const createCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const passengerId = req.user.id;
        // If production deployed uncomment this
        const isCallTaxiExist = yield (0, callTaxi_1.getCallTaxisService)(req);
        if (isCallTaxiExist) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: config_1.messages.BAD_REQUEST.message,
                detail: "Yor are in a processing"
            });
            return;
        }
        // Fetch user data
        const passenger = yield (0, helper_1.getPassenger)(req, res);
        if (!passenger) {
            res.status(404).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: `Driver id: ${passengerId} not found` }));
            return;
        }
        const callTaxi = yield (0, callTaxi_1.createCallTaxiService)({
            req,
            passengerFullName: passenger === null || passenger === void 0 ? void 0 : passenger.fullName,
            passengerPhoneNumber: passenger === null || passenger === void 0 ? void 0 : passenger.phone
        });
        if (!callTaxi) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: config_1.messages.BAD_REQUEST.message,
            });
            return;
        }
        // Emit socket
        const token = req.headers["authorization"];
        const data = Object.assign({ fullName: (_a = passenger === null || passenger === void 0 ? void 0 : passenger.fullName) !== null && _a !== void 0 ? _a : "", profileImage: (_b = passenger === null || passenger === void 0 ? void 0 : passenger.profileImage) !== null && _b !== void 0 ? _b : "" }, callTaxi);
        yield (0, callTaxi_1.sentDataToDriverSocket)(token, data);
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: config_1.messages.CREATE_SUCCESSFUL.message,
            callTaxi: Object.assign({}, data),
        });
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createCallTaxi = createCallTaxi;
const getCallTaxiById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const callTaxi = yield callTaxi_2.CallTaxi.aggregate([
            {
                $match: { _id: new mongoose_1.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "users",
                    let: { passengerId: { $toObjectId: "$passengerId" } },
                    pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$passengerId"] } } }],
                    as: "passengerDetails",
                },
            },
            {
                $unwind: {
                    path: "$passengerDetails",
                    preserveNullAndEmptyArrays: true,
                },
            },
            // Lookup driver
            {
                $lookup: {
                    from: "users",
                    let: { driverId: { $toObjectId: "$driverId" } },
                    pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$driverId"] } } }],
                    as: "driverDetails",
                },
            },
            { $unwind: { path: "$driverDetails", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    "_id": 1,
                    "passengerId": 1,
                    "carTypeId": 1,
                    "origin": 1,
                    "destination": 1,
                    "originName": 1,
                    "destinationName": 1,
                    "requestType": 1,
                    "distanceInPolygon": 1,
                    "durationInPolygon": 1,
                    "normalDuration": 1,
                    "delayDuration": 1,
                    "delayDistance": 1,
                    "totalDuration": 1,
                    "totalDistance": 1,
                    "totalPrice": 1,
                    "status": 1,
                    "price": 1,
                    "polygonPrice": 1,
                    "onPeakTimePrice": 1,
                    "delayPrice": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "driverId": 1,
                    "country": 1,
                    "countryCode": 1,
                    "driverComplain": 1,
                    "passengerComplain": 1,
                    "driverDetails._id": 1,
                    "driverDetails.profileImage": 1,
                    "driverDetails.fullName": 1,
                    "driverDetails.phone": 1,
                    "driverDetails.email": 1,
                    "passengerDetails._id": 1,
                    "passengerDetails.profileImage": 1,
                    "passengerDetails.fullName": 1,
                    "passengerDetails.phone": 1,
                    "passengerDetails.email": 1,
                }
            }
        ]);
        if ((_a = callTaxi[0]) === null || _a === void 0 ? void 0 : _a.driverDetails) {
            const vehicleDriver = yield vehicleDriver_1.default.aggregate([
                {
                    $match: {
                        driver: (_b = callTaxi[0]) === null || _b === void 0 ? void 0 : _b.driverId
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
            callTaxi[0].driverDetails.licensePlate = vehicleDriver[0].licensePlate;
            callTaxi[0].driverDetails.vehicleModelName = vehicleDriver[0].vehicleModelName;
            callTaxi[0].driverDetails.vehicleBrandName = vehicleDriver[0].vehicleBrandName;
            res.status(200).json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), callTaxi[0]));
            return;
        }
        res.status(200).json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { callTaxi }));
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getCallTaxiById = getCallTaxiById;
// Get all calling taxi
const getCallTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, startDate, endDate, minPrice, maxPrice, minTotalDistance, maxTotalDistance, search, } = req.query;
        const match = {};
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
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const callTaxi = yield callTaxi_2.CallTaxi.aggregate([
            { $match: match },
            // Lookup passenger
            {
                $lookup: {
                    from: "users",
                    let: { passengerId: { $toObjectId: "$passengerId" } },
                    pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$passengerId"] } } }],
                    as: "passengerDetails",
                },
            },
            {
                $unwind: {
                    path: "$passengerDetails",
                    preserveNullAndEmptyArrays: true,
                },
            },
            // Lookup driver
            {
                $lookup: {
                    from: "users",
                    let: { driverId: { $toObjectId: "$driverId" } },
                    pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$driverId"] } } }],
                    as: "driverDetails",
                },
            },
            { $unwind: { path: "$driverDetails", preserveNullAndEmptyArrays: true } },
            // Search filter
            ...(search
                ? [
                    {
                        $match: {
                            $or: [
                                {
                                    "passengerDetails.fullName": {
                                        $regex: search.toString(),
                                        $options: "i",
                                    },
                                },
                                {
                                    "driverDetails.fullName": {
                                        $regex: search.toString(),
                                        $options: "i",
                                    },
                                },
                            ],
                        },
                    },
                ]
                : []),
            { $skip: skip },
            { $limit: parseInt(limit) },
            // Final projection
            {
                $project: {
                    _id: 1,
                    billNumber: 1,
                    passengerId: "$passengerDetails._id",
                    passengerFullname: "$passengerDetails.fullName",
                    driverId: "$driverDetails._id",
                    driverFullname: "$driverDetails.fullName",
                    originName: 1,
                    destinationName: 1,
                    totalDistance: 1,
                    totalDuration: 1,
                    totalPrice: 1,
                    status: 1,
                    createdAt: 1,
                },
            },
        ]);
        res.status(200).json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { callTaxi }));
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getCallTaxis = getCallTaxis;
const checkCallTaxiStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const id = req.user.id;
        const user = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${id}`);
        const userData = (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.user;
        if (!userData) {
            res.status(404).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: "User not found" }));
            return;
        }
        let filter = {
            status: {
                $in: [
                    callTaxi_2.STATUS.REQUESTING,
                    callTaxi_2.STATUS.DRIVER_RECEIVED,
                    callTaxi_2.STATUS.DRIVER_ARRIVED,
                    callTaxi_2.STATUS.PICKED_UP,
                    callTaxi_2.STATUS.DEPARTURE,
                    callTaxi_2.STATUS.SEND_SUCCESS
                ]
            }
        };
        if (userData.role === "CUSTOMER")
            filter.passengerId = userData._id;
        if (userData.role === "DRIVER")
            filter.driverId = userData._id;
        // if access by customer role we will query driver's vehicle data
        const callTaxi = yield callTaxi_2.CallTaxi.aggregate([
            {
                $match: filter
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
                    origin: 1,
                    destination: 1,
                    originName: 1,
                    destinationName: 1,
                    totalPrice: 1,
                    status: 1,
                    "passenger._id": 1,
                    "passenger.fullName": 1,
                    "passenger.profileImage": 1,
                    "driver._id": 1,
                    "driver.fullName": 1,
                    "driver.profileImage": 1,
                    "driver.licensePlate": 1
                }
            }
        ]);
        if (callTaxi.length && filter.passengerId) {
            const aggregateVehicleDriver = yield vehicleDriver_1.default.aggregate([
                {
                    $match: {
                        driver: (_c = (_b = callTaxi[0]) === null || _b === void 0 ? void 0 : _b.driver) === null || _c === void 0 ? void 0 : _c._id.toString()
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
            callTaxi[0].driver.vehicleModelName = aggregateVehicleDriver[0].vehicleModelName;
            callTaxi[0].driver.vehicleBrandName = aggregateVehicleDriver[0].vehicleBrandName;
        }
        res.status(200).json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { callTaxi: callTaxi.length ? callTaxi[0] : {} }));
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.checkCallTaxiStatus = checkCallTaxiStatus;
const getUserCallTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const callTaxis = yield (0, callTaxi_1.getUserCallTaxisService)(req);
        // must check passenger first
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            callTaxis,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getUserCallTaxis = getUserCallTaxis;
const createDriverComplain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const created = yield (0, callTaxi_1.createDriverComplainPassengerService)(req);
        if (created) {
            const sumRating = yield callTaxi_2.CallTaxi.aggregate([
                {
                    $match: {
                        passengerId: created === null || created === void 0 ? void 0 : created.passengerId,
                        "driverComplain.rating": { $exists: true, $ne: null }
                    }
                },
                {
                    $group: {
                        _id: "$passengerId",
                        averageRating: { $avg: "$driverComplain.rating" },
                        totalRatings: { $sum: 1 }
                    }
                }
            ]);
            if (sumRating.length) {
                const id = (_a = sumRating[0]) === null || _a === void 0 ? void 0 : _a._id;
                const averageRating = (_b = sumRating[0]) === null || _b === void 0 ? void 0 : _b.averageRating;
                const updatedPassengerRating = yield rating_1.ratingModel.findByIdAndUpdate(id, { rating: averageRating });
                if (!updatedPassengerRating) {
                    yield rating_1.ratingModel.create({
                        userId: new mongoose_1.Types.ObjectId(id),
                        rating: averageRating !== null && averageRating !== void 0 ? averageRating : 0
                    });
                }
            }
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: created,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createDriverComplain = createDriverComplain;
const createPassengerComplain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const created = yield (0, callTaxi_1.createPassengerComplainDriverService)(req);
        if (created) {
            const sumRating = yield callTaxi_2.CallTaxi.aggregate([
                {
                    $match: {
                        driverId: created === null || created === void 0 ? void 0 : created.driverId,
                        "passengerComplain.rating": { $exists: true, $ne: null }
                    }
                },
                {
                    $group: {
                        _id: "$driverId",
                        averageRating: { $avg: "$passengerComplain.rating" },
                        totalRatings: { $sum: 1 }
                    }
                }
            ]);
            if (sumRating.length) {
                const id = (_a = sumRating[0]) === null || _a === void 0 ? void 0 : _a._id;
                const averageRating = (_b = sumRating[0]) === null || _b === void 0 ? void 0 : _b.averageRating;
                const updatedDriverRating = yield rating_1.ratingModel.findByIdAndUpdate(id, { rating: averageRating });
                if (!updatedDriverRating) {
                    yield rating_1.ratingModel.create({
                        userId: new mongoose_1.Types.ObjectId(id),
                        rating: averageRating !== null && averageRating !== void 0 ? averageRating : 0
                    });
                }
            }
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: created,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createPassengerComplain = createPassengerComplain;
const getPassengerComplainById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complain = yield (0, callTaxi_1.getPassengerComplainDriverByIdService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: complain,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getPassengerComplainById = getPassengerComplainById;
const getDriverCallTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const callTaxis = yield (0, callTaxi_1.getDriverCallTaxisService)(req);
        // must check rider first
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            callTaxis,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getDriverCallTaxis = getDriverCallTaxis;
const updateCallTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { id } = req.params;
        const { type, status, actualUsedTime, claimMoney, point, paymentMethod } = req.body;
        const token = req.headers.authorization;
        const callTaxi = yield callTaxi_2.CallTaxi.findById(id);
        if (!callTaxi) {
            res.status(400).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: `Ride matching with id:${id} not found` }));
            return;
        }
        // if status from order not equal to "Requesting" and "Accepted"
        // cannot cancel the order
        // Requesting means while passenger is calling for an order 
        // Accepted means driver is going to pick passenger
        if (status && status === callTaxi_2.STATUS.CANCELED) {
            if (callTaxi.status === callTaxi_2.STATUS.DEPARTURE &&
                callTaxi.status === callTaxi_2.STATUS.SEND_SUCCESS &&
                callTaxi.status === callTaxi_2.STATUS.PAID &&
                callTaxi.status === callTaxi_2.STATUS.TIMEOUT) {
                res.status(400).json({
                    code: config_1.messages.BAD_REQUEST.code,
                    messages: config_1.messages.BAD_REQUEST.message,
                    detail: "Cannot cancel this order",
                });
                return;
            }
        }
        const isValidStatus = Object.values(callTaxi_2.STATUS).includes(status);
        if (!isValidStatus) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                messages: config_1.messages.BAD_REQUEST.message,
                detail: "Cancel status is incorrect",
            });
            return;
        }
        // Update call taxi part
        const updateData = {};
        if (type)
            updateData.type = type;
        if (actualUsedTime)
            updateData.actualUsedTime = actualUsedTime;
        if (claimMoney)
            updateData.claimMoney = claimMoney;
        if (point)
            updateData.point = point;
        if (paymentMethod)
            updateData.paymentMethod = paymentMethod;
        if (status) {
            // If status is paid add calculatedPrice and driverRate to 
            // calculate driver income
            if (status === callTaxi_2.STATUS.PAID) {
                const { calculatedPrice, driverRate } = yield (0, calculation_1.driverRateCal)(callTaxi);
                if (calculatedPrice && driverRate) {
                    const { startOfDayUTC, endOfDayUTC } = (0, timezone_1.getBangkokTodayUTC)();
                    const claimMoney = yield (0, claimMoney_1.getClaimMoney)({
                        token,
                        driverId: callTaxi.driverId,
                        startDate: startOfDayUTC,
                        endDate: endOfDayUTC
                    });
                    if (claimMoney) {
                        const income = claimMoney.income + calculatedPrice;
                        const updateClaim = yield (0, claimMoney_1.updateClaimMoney)({
                            token,
                            id: claimMoney._id,
                            income
                        });
                        if (updateClaim)
                            updateData.claimMoney = updateClaim._id;
                    }
                    else {
                        const driver = yield axios_1.default.get(`
                   ${process.env.USER_SERVICE_URL}/v1/api/users/${callTaxi === null || callTaxi === void 0 ? void 0 : callTaxi.driverId}`, {
                            headers: {
                                Authorization: `${req.headers["authorization"]}`
                            }
                        });
                        const driverId = (_b = (_a = driver === null || driver === void 0 ? void 0 : driver.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id;
                        const driverRegistrationSource = (_d = (_c = driver === null || driver === void 0 ? void 0 : driver.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.registrationSource;
                        const createClaim = yield (0, claimMoney_1.createClaimMoney)({
                            token: token,
                            driverId,
                            driverRegistrationSource,
                            taxDeducted: 10,
                            income: calculatedPrice
                        });
                        if (createClaim)
                            updateData.claimMoney = createClaim._id;
                    }
                    updateData.driverIncome = calculatedPrice;
                    updateData.driverRate = driverRate;
                }
            }
            updateData.status = status;
        }
        const updated = yield (0, callTaxi_1.updateCallTaxiService)({ id, updateData });
        // if status is canceled notify to driver
        if (updated && updated.status === callTaxi_2.STATUS.CANCELED) {
            yield axios_1.default.post(`${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/cancel`, callTaxi, {
                headers: {
                    Authorization: req.headers['authorization']
                }
            });
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: updated,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateCallTaxis = updateCallTaxis;
const driverUpdateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    try {
        const user = req.user;
        const { id } = req.params;
        // Check is driver exist or not
        const driverData = yield (0, helper_1.getDriver)(req, res);
        if (!driverData || !(driverData === null || driverData === void 0 ? void 0 : driverData.data)) {
            res.status(404).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: `Driver id: ${user.id} not found` }));
            return;
        }
        // Check is driver
        if (((_b = (_a = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.role) !== "DRIVER") {
            res.status(400).json(Object.assign(Object.assign({}, config_1.messages.BAD_REQUEST), { detail: "You are not a driver" }));
            return;
        }
        const taxi = yield taxi_1.default.findById((_d = (_c = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.taxi);
        const rating = yield rating_1.ratingModel.findOne({ userId: (_f = (_e = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f._id });
        const driver = {
            id: (_h = (_g = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h._id,
            image: (_k = (_j = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _j === void 0 ? void 0 : _j.user) === null || _k === void 0 ? void 0 : _k.profileImage,
            fullName: (_m = (_l = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _l === void 0 ? void 0 : _l.user) === null || _m === void 0 ? void 0 : _m.fullName,
            rating: rating === null || rating === void 0 ? void 0 : rating.rating,
            licensePlate: (_p = (_o = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _o === void 0 ? void 0 : _o.user) === null || _p === void 0 ? void 0 : _p.licensePlate,
            vehicleBrandName: taxi === null || taxi === void 0 ? void 0 : taxi.vehicleBrandName,
            vehicleModelName: taxi === null || taxi === void 0 ? void 0 : taxi.vehicleModelName,
        };
        // Checking calling taxi
        const callTaxi = yield callTaxi_2.CallTaxi.findById(id);
        if (!callTaxi) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "This ride request was taken",
            });
            return;
        }
        if (callTaxi.status === callTaxi_2.STATUS.CANCELED) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: "Cannot accept this order due to cancel",
            });
            return;
        }
        // Update status
        let status = "";
        if (!callTaxi.driverId) {
            // driver confirm ride request
            if (callTaxi.status === callTaxi_2.STATUS.REQUESTING)
                status = callTaxi_2.STATUS.DRIVER_RECEIVED;
        }
        if (callTaxi && callTaxi.driverId === user.id) {
            // driver arrived to passenger
            if (callTaxi.status === callTaxi_2.STATUS.DRIVER_RECEIVED)
                status = callTaxi_2.STATUS.DRIVER_ARRIVED;
            else if (callTaxi.status === callTaxi_2.STATUS.DRIVER_ARRIVED)
                status = callTaxi_2.STATUS.PICKED_UP;
            else if (callTaxi.status === callTaxi_2.STATUS.PICKED_UP)
                status = callTaxi_2.STATUS.DEPARTURE;
            else if (callTaxi.status === callTaxi_2.STATUS.DEPARTURE)
                status = callTaxi_2.STATUS.SEND_SUCCESS;
            else if (callTaxi.status === callTaxi_2.STATUS.SEND_SUCCESS) {
                res.status(200).json({
                    code: config_1.messages.SUCCESSFULLY.code,
                    messages: config_1.messages.SUCCESSFULLY.message,
                });
                return;
            }
            else {
                res.status(400).json({
                    code: config_1.messages.BAD_REQUEST.code,
                    messages: "Status not found",
                });
                return;
            }
        }
        // Confirmed order
        const confirmed = yield (0, callTaxi_1.driverUpdateStatusService)(req, status);
        if (!confirmed) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: config_1.messages.NOT_FOUND.message,
            });
            return;
        }
        if (status === callTaxi_2.STATUS.DRIVER_RECEIVED) {
            // Delete ride matching order 
            // from other when once accepted
            yield axios_1.default.delete(`${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/remove/${confirmed === null || confirmed === void 0 ? void 0 : confirmed._id}`, {
                headers: {
                    Authorization: req.headers.authorization,
                },
            });
            // And then save an order to redis 
            // for calculating meter pricing
            if (confirmed.requestType === callTaxi_2.REQUEST_TYPE.METERED_FARE) {
                yield axios_1.default.post(`${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/save-order-to-redis`, confirmed);
            }
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            confirmed: {
                _id: confirmed === null || confirmed === void 0 ? void 0 : confirmed._id,
                passengerId: confirmed === null || confirmed === void 0 ? void 0 : confirmed.passengerId,
                requestType: confirmed === null || confirmed === void 0 ? void 0 : confirmed.requestType,
                status: confirmed === null || confirmed === void 0 ? void 0 : confirmed.status,
                driver,
            },
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.driverUpdateStatus = driverUpdateStatus;
// report total ride
const gettotalRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRide = yield (0, callTaxi_1.getTotalRideService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalRide));
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.gettotalRide = gettotalRide;
const getRideHistoryDetailById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rideHistoryDetail = yield (0, callTaxi_1.getRideHistoryDetailByIdService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            rideHistoryDetail
        });
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getRideHistoryDetailById = getRideHistoryDetailById;
const getDriverRideHistoryDetailById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const riderRideHistoryDetail = yield (0, callTaxi_1.getDriverRideHistoryDetailByIdService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            riderRideHistoryDetail
        });
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getDriverRideHistoryDetailById = getDriverRideHistoryDetailById;
// report ride history
const getRideHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travelHistory = yield (0, callTaxi_1.getHistoryRideService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            travelHistory,
        });
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getRideHistory = getRideHistory;
// Call the service function to calculate the total price of the taxi
const callTaxiTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        // Create pipeline
        const pipeneMongo = (0, helper_1.pipeline)({
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
        });
        // Call the  service function
        const totalPrice = yield (0, callTaxi_1.callTaxiTotalPriceReportService)(pipeneMongo);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            totalPrice: totalPrice,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.callTaxiTotalPrice = callTaxiTotalPrice;
// Report passenger in passenger management page in admin dashboard
// All calling taxis
// Summary distance in KM
// Get the last calling
const reportPassenger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        const { status } = req.query;
        const filter = {
            passengerId,
        };
        if (status)
            filter.status = status;
        const numberOfCallingTaxi = yield (0, callTaxi_1.getNumberOfCallingTaxiService)(filter);
        const totalDistance = yield (0, callTaxi_1.getTotalDistanceService)(filter);
        const getTheLastRide = yield (0, callTaxi_1.getTheLastRideService)(filter);
        res.json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { reportPassenger: {
                numberOfCallingTaxi,
                totalDistance,
                getTheLastRide
            } }));
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.reportPassenger = reportPassenger;
const travelHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        const { page = "1", limit = "10", status } = req.query;
        const pageToNumber = parseInt(page, 10);
        const limitToNumber = parseInt(limit, 10);
        const skip = (pageToNumber - 1) * limitToNumber;
        const filter = {
            passengerId,
        };
        if (status)
            filter.status = status;
        const travelHistory = yield (0, callTaxi_1.travelHistoryService)(skip, limitToNumber, filter);
        res.json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { travelHistory }));
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.travelHistory = travelHistory;
const getCommentAndRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerId = req.params.id;
        const { page = "1", limit = "10", status } = req.query;
        const pageToNumber = parseInt(page, 10);
        const limitToNumber = parseInt(limit, 10);
        const skip = (pageToNumber - 1) * limitToNumber;
        const filter = {
            passengerId,
        };
        if (status)
            filter.status = status;
        const travelHistory = yield (0, callTaxi_1.getCommentAndRatingService)(skip, limitToNumber, filter);
        res.json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { travelHistory }));
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getCommentAndRating = getCommentAndRating;
// Report driver part
const getTotalDriverIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.user.id;
        const totalIncome = yield (0, callTaxi_1.getTotalDriverIncomeService)(driverId);
        const totalIncomeThatWasNotClaim = yield (0, callTaxi_1.getTotalDriverIncomeServiceThatWasNotClaim)(driverId);
        res.json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { totalIncome,
            totalIncomeThatWasNotClaim }));
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getTotalDriverIncome = getTotalDriverIncome;
// Report payment detail in travel history page
const getDriverPaymentDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const callTaxiId = req.params.id;
        const driverPaymentDetail = yield (0, callTaxi_1.getDriverPaymentDetailService)(callTaxiId);
        res.json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { driverPaymentDetail }));
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getDriverPaymentDetail = getDriverPaymentDetail;
