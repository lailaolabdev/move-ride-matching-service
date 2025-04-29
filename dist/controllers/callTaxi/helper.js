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
exports.getDriver = exports.pipeline = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const taxi_1 = __importDefault(require("../../models/taxi"));
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
    var _a, _b, _c, _d, _e, _f;
    const user = req.user;
    try {
        const driver = yield axios_1.default.get(`
                   ${process.env.USER_SERVICE_URL}/v1/api/users/${user.id}`, {
            headers: {
                Authorization: `${req.headers["authorization"]}`
            }
        });
        if (!(driver === null || driver === void 0 ? void 0 : driver.data)) {
            res.status(404).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: `Driver id: ${user.id} not found` }));
            return;
        }
        // Check is driver
        if (driver.data.user.role !== "DRIVER") {
            res.status(400).json(Object.assign(Object.assign({}, config_1.messages.BAD_REQUEST), { detail: "You are not a driver" }));
            return;
        }
        const taxi = yield taxi_1.default.findById((_b = (_a = driver === null || driver === void 0 ? void 0 : driver.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.taxi);
        const driverData = {
            fullName: (_d = (_c = driver === null || driver === void 0 ? void 0 : driver.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.fullName,
            licensePlate: (_f = (_e = driver === null || driver === void 0 ? void 0 : driver.data) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.licensePlate,
            vehicleBrandName: taxi === null || taxi === void 0 ? void 0 : taxi.vehicleBrandName,
            vehicleModelName: taxi === null || taxi === void 0 ? void 0 : taxi.vehicleModelName
        };
        return driverData;
    }
    catch (error) {
        console.log(error);
        res.status(404).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: `Driver id: ${user.id} not found` }));
        return;
    }
});
exports.getDriver = getDriver;
