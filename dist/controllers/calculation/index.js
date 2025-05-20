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
exports.calculateDriverDistanceAndDuration = exports.calculateUserDistanceAndDuration = void 0;
const config_1 = require("../../config");
const calculation_1 = require("../../services/calculation");
const taxiTypePricing_1 = __importDefault(require("../../models/taxiTypePricing"));
const onPeakTime_1 = require("../../services/onPeakTime");
const calculateUserDistanceAndDuration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { origin, destination } = req.body;
        // Calculate distance and duration
        const calculate = yield (0, calculation_1.calculateUserDistanceAndDurationService)(origin, destination);
        if (!calculate) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: `Taxi not available`,
            });
            return;
        }
        // find taxi type pricing base on distance
        const distance = calculate.totalDistance;
        const taxiTypePricing = yield taxiTypePricing_1.default.aggregate([
            {
                $match: {
                    minDistance: { $lte: distance },
                    maxDistance: { $gt: distance },
                },
            },
            {
                $lookup: {
                    from: 'taxitypes', // name of the referenced collection
                    localField: 'taxiTypeId',
                    foreignField: '_id',
                    as: 'taxiType',
                },
            },
            {
                $unwind: '$taxiType', // optional: flatten the array
            },
        ]);
        const calculation = [];
        let delayPrice = 0;
        // Calculate peak time
        const onPeakTime = yield (0, onPeakTime_1.getOnPeakTimeService)(req.headers.authorization);
        const onPeakTimePrice = (_a = onPeakTime.credit) !== null && _a !== void 0 ? _a : 0;
        const calculatePeakTimePrice = onPeakTimePrice + distance;
        for (let i = 0; i < taxiTypePricing.length; i++) {
            calculation.push(Object.assign(Object.assign({ id: taxiTypePricing[i].taxiType._id, image: taxiTypePricing[i].taxiType.icon, cartType: taxiTypePricing[i].taxiType.name, seats: taxiTypePricing[i].taxiType.seats }, calculate), { totalPrice: Math.ceil(taxiTypePricing[i].price * distance +
                    calculatePeakTimePrice +
                    calculate.priceInPolygon +
                    delayPrice * calculate.delayDuration) }));
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
