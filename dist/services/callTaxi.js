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
exports.calculateDriverDistanceAndDurationService = exports.updateStatusService = exports.driverConfirmedService = exports.updateCallTaxiService = exports.getDriverCallTaxisService = exports.getUserCallTaxisService = exports.createCallTaxiService = void 0;
const callTaxi_1 = require("../models/callTaxi");
const axios_1 = __importDefault(require("axios"));
const createCallTaxiService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const passengerId = (req as any).user.id;
        const passengerId = "testId";
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
const driverConfirmedService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const passengerId = (req as any).user.id;
        const { id } = req.params;
        const driverId = "testDriverId";
        const status = callTaxi_1.STATUS.DRIVER_RECEIVED;
        const confirmed = yield callTaxi_1.CallTaxi.findByIdAndUpdate(id, { driverId, status }, { new: true });
        return confirmed;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.driverConfirmedService = driverConfirmedService;
const updateStatusService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const passengerId = (req as any).user.id;
        const { id } = req.params;
        const driverId = "testDriverId";
        const status = callTaxi_1.STATUS.DRIVER_RECEIVED;
        const confirmed = yield callTaxi_1.CallTaxi.findOneAndUpdate({ _id: id }, { status }, { new: true });
        return confirmed;
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.updateStatusService = updateStatusService;
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
