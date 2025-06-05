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
exports.roundCoord = exports.getPassenger = exports.getDriver = exports.pipeline = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const pipeline = ({ startDate, endDate }) => {
    const matchStage = {};
    const pipeline = [];
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
    return pipeline;
};
exports.pipeline = pipeline;
const getDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const driver = yield axios_1.default.get(`
                   ${process.env.USER_SERVICE_URL}/v1/api/users/${user.id}`, {
            headers: {
                Authorization: `${req.headers["authorization"]}`
            }
        });
        return driver;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.getDriver = getDriver;
const getPassenger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const passengerId = req.user.id;
    try {
        const passengerData = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${passengerId}`, {
            headers: {
                Authorization: `${req.headers["authorization"]}`,
            },
        });
        const passenger = (_a = passengerData === null || passengerData === void 0 ? void 0 : passengerData.data) === null || _a === void 0 ? void 0 : _a.user;
        if (!passenger) {
            res.status(404).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: `Id: ${passengerId} not found` }));
            return;
        }
        return passenger;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.getPassenger = getPassenger;
const roundCoord = (coordStr) => {
    const [lat, lng] = coordStr.split(",").map(Number);
    return `${lat.toFixed(6)},${lng.toFixed(6)}`;
};
exports.roundCoord = roundCoord;
