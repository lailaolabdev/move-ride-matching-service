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
exports.updateDriverLocation = void 0;
const driverLocation_1 = require("../../services/driverLocation");
const config_1 = require("../../config");
const axios_1 = __importDefault(require("axios"));
const rating_1 = require("../../models/rating");
const callTaxi_1 = require("../../models/callTaxi");
const driverCash_1 = __importDefault(require("../../models/driverCash"));
const cashLimit_1 = require("../../models/cashLimit");
const updateDriverLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const driverId = req.user.id;
        const token = req.headers.authorization;
        const { longitude, latitude, isOnline } = req.body;
        // step 1: update driver location method and check driver's data 
        const user = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${driverId}`);
        const userData = (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.user;
        if (!userData) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: `User with this id: ${driverId} not found`,
            });
            return;
        }
        if ((userData === null || userData === void 0 ? void 0 : userData.status) === "BLOCKED") {
            yield (0, driverLocation_1.updateDriverLocationService)({
                driverId,
                longitude,
                latitude,
            });
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: "Your account has been blocked. Please contact support for more information.",
            });
            return;
        }
        if ((userData === null || userData === void 0 ? void 0 : userData.role) !== "DRIVER") {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: "You are not a driver",
            });
            return;
        }
        // If driver cash is limited, we will not allow to update driver location
        const driverCash = yield driverCash_1.default.findOne({ driver: driverId });
        const cashLimit = yield cashLimit_1.cashLimitModel.findOne({ countryCode: (_b = userData === null || userData === void 0 ? void 0 : userData.country) === null || _b === void 0 ? void 0 : _b.code });
        if (driverCash && cashLimit && driverCash.amount > cashLimit.amount) {
            yield (0, driverLocation_1.updateDriverLocationService)({ driverId });
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: config_1.messages.BAD_REQUEST.message,
                detail: "Your cash limit has been reached. Please contact support for more information.",
            });
            return;
        }
        let numberOfRating = 0;
        if (isOnline === "online") {
            // step 2: check is there rating exist
            const rating = yield rating_1.ratingModel.findOne({ userId: driverId });
            // step 3: if rating does not exist create a new one
            if (!rating && driverId) {
                // Sun rating from order that matched driver
                const sumRating = yield callTaxi_1.CallTaxi.aggregate([
                    {
                        $match: {
                            driverId,
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
                numberOfRating = ((_c = sumRating[0]) === null || _c === void 0 ? void 0 : _c.averageRating) || 0;
                yield rating_1.ratingModel.create({ userId: driverId, rating: numberOfRating });
            }
            else {
                numberOfRating = (rating === null || rating === void 0 ? void 0 : rating.rating) || 0;
            }
        }
        let taxiTypeId = "";
        if (typeof (userData === null || userData === void 0 ? void 0 : userData.taxiType) === "string") {
            const match = userData.taxiType.match(/ObjectId\('(.+?)'\)/);
            if (match) {
                taxiTypeId = match[1];
            }
            else {
                try {
                    // try to parse JSON
                    const parsed = JSON.parse(userData.taxiType);
                    taxiTypeId = parsed._id || "";
                }
                catch (_e) {
                    taxiTypeId = userData.taxiType; // fallback
                }
            }
        }
        else if (typeof (userData === null || userData === void 0 ? void 0 : userData.taxiType) === "object" && ((_d = userData === null || userData === void 0 ? void 0 : userData.taxiType) === null || _d === void 0 ? void 0 : _d._id)) {
            taxiTypeId = userData.taxiType._id;
        }
        // step 5: Update driver location from socket
        yield (0, driverLocation_1.updateDriverLocationService)({
            driverId,
            longitude,
            latitude,
            isOnline,
            registrationSource: userData === null || userData === void 0 ? void 0 : userData.registrationSource,
            rating: numberOfRating || 0,
            taxiType: taxiTypeId
        });
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Driver location updated successfully",
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateDriverLocation = updateDriverLocation;
