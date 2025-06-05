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
exports.getTotalFlatFareTime = exports.getTotalMeterTime = exports.gettotalTravelTime = exports.cancelTravelHistoryHistory = exports.travelHistoryHistory = exports.getComentAndRating = exports.chatCallTaxi = exports.updateStartAndComment = exports.callTaxiTotalPrice = exports.getRideHistory = exports.getThelastRide = exports.getTotalDistance = exports.gettotalRide = exports.driverUpdateStatus = exports.updateCallTaxis = exports.getDriverCallTaxis = exports.getPassengerComplainById = exports.createPassengerComplain = exports.createDriverComplain = exports.getUserCallTaxis = exports.checkCallTaxiStatus = exports.getCallTaxis = exports.getCallTaxiById = exports.createCallTaxi = void 0;
const config_1 = require("../../config");
const callTaxi_1 = require("../../services/callTaxi");
const callTaxi_2 = require("../../models/callTaxi");
const axios_1 = __importDefault(require("axios"));
const helper_1 = require("./helper");
const taxi_1 = __importDefault(require("../../models/taxi"));
const rating_1 = require("../../models/rating");
const vehicleDriver_1 = __importDefault(require("../../models/vehicleDriver"));
const createCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const passengerId = req.user.id;
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
        const passenger = yield (0, helper_1.getPassenger)(req, res);
        if (!passenger) {
            res.status(404).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: `Driver id: ${passengerId} not found` }));
            return;
        }
        const callTaxi = yield (0, callTaxi_1.createCallTaxiService)(req);
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
    try {
        const { id } = req.params;
        const callTaxi = yield callTaxi_2.CallTaxi.findById(id).lean();
        if (callTaxi === null || callTaxi === void 0 ? void 0 : callTaxi.driverId) {
            const vehicleDriver = yield vehicleDriver_1.default.aggregate([
                {
                    $match: {
                        driver: callTaxi === null || callTaxi === void 0 ? void 0 : callTaxi.driverId
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
            res.status(200).json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { callTaxi: Object.assign(Object.assign({}, callTaxi), { licensePlate: vehicleDriver[0].licensePlate, vehicleModelName: vehicleDriver[0].vehicleModelName, vehicleBrandName: vehicleDriver[0].vehicleBrandName }) }));
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
    var _a;
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
                    callTaxi_2.STATUS.NO_RECEIVED,
                    callTaxi_2.STATUS.DRIVER_RECEIVED,
                    callTaxi_2.STATUS.DRIVER_ARRIVED,
                    callTaxi_2.STATUS.DEPARTURE
                ]
            }
        };
        if (userData.role === "CUSTOMER")
            filter.passengerId = userData._id;
        if (userData.role === "DRIVER")
            filter.driverId = userData._id;
        const callTaxi = yield callTaxi_2.CallTaxi.findOne(filter).lean();
        res.status(200).json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), callTaxi));
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
                yield rating_1.ratingModel.findByIdAndUpdate(id, { rating: averageRating });
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
                yield rating_1.ratingModel.findByIdAndUpdate(id, { rating: averageRating });
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
    try {
        const { id } = req.params;
        const { status } = req.body;
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
            if (callTaxi.status !== callTaxi_2.STATUS.REQUESTING &&
                callTaxi.status !== callTaxi_2.STATUS.DRIVER_RECEIVED) {
                res.status(400).json({
                    code: config_1.messages.BAD_REQUEST.code,
                    messages: config_1.messages.BAD_REQUEST.message,
                    detail: "Cannot cancel this order",
                });
                return;
            }
            else {
                // if status is match update order status to canceled
                const updated = yield (0, callTaxi_1.updateCallTaxiService)(req);
                if (updated) {
                    // if there is driver id send notification to driver using socket
                    if (updated === null || updated === void 0 ? void 0 : updated.driverId) {
                        yield axios_1.default.post(
                        // `${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/cancel`,
                        `http://localhost:3000/v1/api/ride-request-socket/cancel`, {
                            driverId: updated.driverId,
                        }, {
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
                    return;
                }
            }
        }
        const updated = yield (0, callTaxi_1.updateCallTaxiService)(req);
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
        const driver = {
            image: (_f = (_e = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.profileImage,
            fullName: (_h = (_g = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.fullName,
            licensePlate: (_k = (_j = driverData === null || driverData === void 0 ? void 0 : driverData.data) === null || _j === void 0 ? void 0 : _j.user) === null || _k === void 0 ? void 0 : _k.licensePlate,
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
            // Delete ride matching from other when once accepted
            yield axios_1.default.delete(`${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/remove/${confirmed === null || confirmed === void 0 ? void 0 : confirmed._id}`, {
                headers: {
                    Authorization: req.headers.authorization,
                },
            });
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
// report total totalDistance
const getTotalDistance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalDistance = yield (0, callTaxi_1.getTotalDistanceService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalDistance));
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
exports.getTotalDistance = getTotalDistance;
// report total the last ride
const getThelastRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastRide = yield (0, callTaxi_1.getTheLastRideService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, lastRide));
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
exports.getThelastRide = getThelastRide;
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
const updateStartAndComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        if (rating > 5) {
            return res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                messages: config_1.messages.BAD_GATEWAY.message,
                detail: "The rating must not exceed 5. Please provide a value between 1 and 5.",
            });
        }
        yield (0, callTaxi_1.updateStarAndCommentService)(id, rating, comment);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateStartAndComment = updateStartAndComment;
const chatCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let { message } = req.body;
        const chatId = req.user.id;
        const chatData = [
            {
                id: chatId,
                message: message,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        const data = yield (0, callTaxi_1.updateChatCallTaxiService)(id, chatData);
        // const data=  await updateChatCallTaxiService(id, chat);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: data,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.chatCallTaxi = chatCallTaxi;
const getComentAndRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, callTaxi_1.getCommentAndRatingService)(id);
        // const data=  await updateChatCallTaxiService(id, chat);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: data,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getComentAndRating = getComentAndRating;
// report ride history
const travelHistoryHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travelHistory = yield (0, callTaxi_1.travelHistoryService)(req);
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
exports.travelHistoryHistory = travelHistoryHistory;
const cancelTravelHistoryHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travelHistory = yield (0, callTaxi_1.cancelTravelHistoryService)(req);
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
exports.cancelTravelHistoryHistory = cancelTravelHistoryHistory;
// total travel time
const gettotalTravelTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalTravelTime = yield (0, callTaxi_1.getTotaltravelTimeService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalTravelTime));
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
exports.gettotalTravelTime = gettotalTravelTime;
// get total travel request type meter
const getTotalMeterTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalMeterTime = yield (0, callTaxi_1.getTotalmeterService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalMeterTime));
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
exports.getTotalMeterTime = getTotalMeterTime;
// get total travel request type meter
const getTotalFlatFareTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalFlatFare = yield (0, callTaxi_1.getTotalFlatFareService)(req);
        console.log(totalFlatFare);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalFlatFare));
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
exports.getTotalFlatFareTime = getTotalFlatFareTime;
