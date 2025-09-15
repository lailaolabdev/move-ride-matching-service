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
exports.notifyPassengerWithNotification = exports.notifyDriverWhenCancel = exports.removeCallTaxiFromRedis = exports.getDriverLatLong = exports.getCountry = exports.roundCoord = exports.getPassenger = exports.getDriver = exports.pipeline = exports.getCallTaxiPipeline = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const getCallTaxiPipeline = (query) => {
    const { startDate, endDate, minPrice, maxPrice, minTotalDistance, maxTotalDistance, claimMoney, country, status } = query;
    const match = {};
    if (claimMoney)
        match.claimMoney = claimMoney;
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
    if (country) {
        match.country = country;
    }
    if (status) {
        match.status = status;
    }
    return match;
};
exports.getCallTaxiPipeline = getCallTaxiPipeline;
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
const getCountry = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const countryData = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/countries/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        return (_a = countryData === null || countryData === void 0 ? void 0 : countryData.data) === null || _a === void 0 ? void 0 : _a.country;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.getCountry = getCountry;
const getDriverLatLong = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const countryData = yield axios_1.default.get(`${process.env.SOCKET_SERVICE_URL}/v1/api//driver-location-socket/${id}`);
        return (_a = countryData === null || countryData === void 0 ? void 0 : countryData.data) === null || _a === void 0 ? void 0 : _a.driverLatLong;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.getDriverLatLong = getDriverLatLong;
const removeCallTaxiFromRedis = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.delete(`${process.env.SOCKET_SERVICE_URL}/v1/api/payment-socket/meter-price/${id}`);
    }
    catch (error) {
        console.log("Error from getMeterPrice: ", error);
    }
});
exports.removeCallTaxiFromRedis = removeCallTaxiFromRedis;
const notifyDriverWhenCancel = (token, callTaxi) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.post(`${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/cancel`, callTaxi, {
            headers: {
                Authorization: token
            }
        });
    }
    catch (error) {
        console.log("Error from getMeterPrice: ", error);
    }
});
exports.notifyDriverWhenCancel = notifyDriverWhenCancel;
const notifyPassengerWithNotification = (_a) => __awaiter(void 0, [_a], void 0, function* ({ recipient, token, caseType }) {
    try {
        let payload;
        const info = {
            type: "NOTICE",
            platform: "TAXI",
            recipientRole: "CUSTOMER",
        };
        switch (caseType) {
            case "Accepted":
                payload = Object.assign({ recipient, title: "Your ride request was accepted ✅", detail: "A driver has accepted your request and is on the way." }, info);
                break;
            case "Driver_Arrived":
                payload = Object.assign({ recipient, title: "Your driver has arrived 🚖", detail: "Please meet your driver at the pickup point." }, info);
                break;
            case "Success":
                payload = Object.assign({ recipient, title: "You’ve arrived at your destination 🏁", detail: "Thank you for riding with us! We hope to see you again soon." }, info);
                break;
            case "Paid":
                payload = Object.assign({ recipient, title: "Payment successful 💳", detail: "Your payment has been processed successfully." }, info);
                break;
            default:
                throw new Error(`Unknown caseType: ${caseType}`);
        }
        if (payload) {
            yield axios_1.default.post(`${process.env.NOTIFICATION_SERVICE_URL}/v1/api/notifications`, payload, {
                headers: {
                    Authorization: token
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.notifyPassengerWithNotification = notifyPassengerWithNotification;
