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
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRateCal = exports.calculateDriverDistanceAndDuration = exports.calculateUserDistanceAndDuration = void 0;
const config_1 = require("../../config");
const calculation_1 = require("../../services/calculation");
const onPeakTime_1 = require("../../services/onPeakTime");
const taxiTypePricing_1 = require("../../services/taxiTypePricing");
const driverRate_1 = require("../../models/driverRate");
const callTaxi_1 = require("../../models/callTaxi");
const roundLimit_1 = require("../../models/roundLimit");
const calculateUserDistanceAndDuration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { origin, destination, country } = req.body;
        // Calculation method:
        // step 1 : Calculate distance and duration from google map
        const calculate = yield (0, calculation_1.calculateUserDistanceAndDurationService)(origin, destination);
        if (!calculate) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: `Taxi not available`,
            });
            return;
        }
        // step 2 : find taxi type pricing base on distance, 
        // example: distance 5km find distance between 1 - 5
        const distance = calculate.totalDistance;
        const taxiTypePricing = (_a = yield (0, taxiTypePricing_1.getTaxiPricingDistance)({ country, distance })) !== null && _a !== void 0 ? _a : [];
        const meter = [];
        const flatFare = [];
        let delayPrice = 10;
        // step 3 : find peak time base on distance
        const onPeakTime = yield (0, onPeakTime_1.getOnPeakTimeService)(req.headers.authorization, country);
        const onPeakTimePrice = (_b = onPeakTime.credit) !== null && _b !== void 0 ? _b : 0;
        // step 4 : loop through taxiTypePricing and 
        // calculate price both meter and flat fare
        // calculation method: 
        //
        // (meter price or flat fare price + peak time price) * total distance +
        // calculate.priceInPolygon +
        // delay price * delay duration
        for (let i = 0; i < taxiTypePricing.length; i++) {
            const taxiPricing = {
                id: taxiTypePricing[i].taxiType._id,
                image: taxiTypePricing[i].taxiType.icon,
                cartType: taxiTypePricing[i].taxiType.name,
                seats: taxiTypePricing[i].taxiType.seats,
            };
            flatFare.push(Object.assign(Object.assign(Object.assign(Object.assign({}, taxiPricing), { price: taxiTypePricing[i].flatFarePrice, polygonPrice: (_c = calculate.priceInPolygon) !== null && _c !== void 0 ? _c : 0, onPeakTimePrice,
                delayPrice }), calculate), { totalPrice: distance > 1
                    ? ((taxiTypePricing[i].flatFarePrice + onPeakTimePrice) * distance) + calculate.priceInPolygon + (delayPrice * calculate.delayDuration)
                    : taxiTypePricing[i].flatFarePrice + onPeakTimePrice + calculate.priceInPolygon + (delayPrice * calculate.delayDuration) }));
            meter.push(Object.assign(Object.assign(Object.assign(Object.assign({}, taxiPricing), { price: taxiTypePricing[i].meterPrice, polygonPrice: (_d = calculate.priceInPolygon) !== null && _d !== void 0 ? _d : 0, onPeakTimePrice,
                delayPrice }), calculate), { actualCalculate: distance > 1
                    ? (taxiTypePricing[i].meterPrice * distance) + (0.05 * taxiTypePricing[i].meterPrice * distance)
                    : (taxiTypePricing[i].meterPrice), estimatedCalculate: distance > 1
                    ? (taxiTypePricing[i].meterPrice * distance) + (0.10 * taxiTypePricing[i].meterPrice * distance)
                    : (taxiTypePricing[i].meterPrice) }));
        }
        res.status(200).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: config_1.messages.CREATE_SUCCESSFUL.message,
            meter,
            flatFare
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
exports.calculateUserDistanceAndDuration = calculateUserDistanceAndDuration;
const calculateDriverDistanceAndDuration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { origin, destination } = req.body;
        const calculation = yield (0, calculation_1.calculateDriverDistanceAndDurationService)(origin, destination);
        if (!calculation) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: `Calculate not found ${config_1.messages.NOT_FOUND.message}`,
            });
        }
        res.status(200).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: config_1.messages.CREATE_SUCCESSFUL.message,
            calculation,
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
exports.calculateDriverDistanceAndDuration = calculateDriverDistanceAndDuration;
const driverRateCal = (callTaxi) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isInsideBonus = false;
        // Check if registrationSource is "inside"
        if (callTaxi.registrationSource === "inside") {
            // Get round limit from roundLimit model based on country
            const roundLimitData = yield roundLimit_1.roundLimitModel.findOne({ country: callTaxi.country }).sort({ createdAt: -1 });
            if (!roundLimitData) {
                return {
                    calculatedPrice: 0,
                    driverRate: 0,
                    code: config_1.messages.ROUND_LIMIT_NOT_FOUND.code,
                    message: config_1.messages.ROUND_LIMIT_NOT_FOUND.message
                };
            }
            const requiredTransactions = roundLimitData.round;
            // Get current date for monthly transaction check
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            // Count driver's transactions in current month (only Success and Paid status)
            const driverTransactionCount = yield callTaxi_1.CallTaxi.countDocuments({
                driverId: callTaxi.driverId,
                createdAt: {
                    $gte: startOfMonth,
                    $lte: endOfMonth
                },
                status: { $in: ["Paid"] } // Only count Paid transactions
            });
            // If driver has less than required transactions, return zero values
            if (driverTransactionCount > requiredTransactions) {
                isInsideBonus = true;
            }
        }
        // Fetch the driverRate based on the taxiType
        // if country code find by country code also
        const driverRates = yield driverRate_1.driverRateModel.findOne({
            minDistance: { $lte: callTaxi.totalDistance },
            maxDistance: { $gte: callTaxi.totalDistance },
            countryCode: callTaxi === null || callTaxi === void 0 ? void 0 : callTaxi.countryCode,
            registrationSource: callTaxi === null || callTaxi === void 0 ? void 0 : callTaxi.registrationSource
        });
        if (driverRates) {
            const calculatedPrice = ((driverRates === null || driverRates === void 0 ? void 0 : driverRates.percentage) / 100) * callTaxi.totalPrice;
            const calculatedPlatformPrice = callTaxi.totalPrice - calculatedPrice;
            console.log("totalPrice: ", callTaxi.totalPrice);
            console.log("percentage: ", driverRates === null || driverRates === void 0 ? void 0 : driverRates.percentage);
            console.log("calculatedPrice: ", callTaxi.totalPrice);
            // Return the calculated price and the corresponding driver rate
            return {
                calculatedPrice,
                driverRate: driverRates === null || driverRates === void 0 ? void 0 : driverRates.percentage,
                isInsideBonus,
                calculatedPlatformPrice
            };
        }
        return { message: "No driver rates found for this taxi type." };
    }
    catch (error) {
        console.log("error: ", error);
    }
});
exports.driverRateCal = driverRateCal;
