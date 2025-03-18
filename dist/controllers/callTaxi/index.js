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
exports.driverUpdateStatus = exports.updateCallTaxis = exports.getDriverCallTaxis = exports.getUserCallTaxis = exports.createCallTaxi = void 0;
const config_1 = require("../../config");
const callTaxi_1 = require("../../services/callTaxi");
const callTaxi_2 = require("../../models/callTaxi");
const axios_1 = __importDefault(require("axios"));
const createCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const passengerId = req.user.id;
        // const isCallTaxiExist = await getCallTaxisService(req)
        // if (isCallTaxiExist) {
        //     res.status(201).json({
        //         code: messages.BAD_REQUEST.code,
        //         message: messages.BAD_REQUEST.message,
        //         detail: "This user is in processing calling taxi"
        //     });
        //     return
        // }
        // Fetch user data
        const passengerData = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${passengerId}`, {
            headers: {
                Authorization: `${req.headers["authorization"]}`,
            },
        });
        const passenger = (_a = passengerData === null || passengerData === void 0 ? void 0 : passengerData.data) === null || _a === void 0 ? void 0 : _a.user;
        const callTaxi = yield (0, callTaxi_1.createCallTaxiService)(req);
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: config_1.messages.CREATE_SUCCESSFUL.message,
            callTaxi: Object.assign({ fullName: passenger.fullName, profileImage: passenger.profileImage }, callTaxi.toObject())
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
    try {
        const user = req.user;
        const { id } = req.params;
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
        if (driver.data.user.role !== "DRIVER") {
            res.status(400).json(Object.assign(Object.assign({}, config_1.messages.BAD_REQUEST), { detail: "You are not a driver" }));
            return;
        }
        const callTaxi = yield callTaxi_2.CallTaxi.findById(id);
        if (!callTaxi) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "This ride request was taken",
            });
            return;
        }
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
            // departure
            if (callTaxi.status === callTaxi_2.STATUS.DRIVER_ARRIVED)
                status = callTaxi_2.STATUS.DEPARTURE;
            // Success
            if (callTaxi.status === callTaxi_2.STATUS.DEPARTURE)
                status = callTaxi_2.STATUS.SEND_SUCCESS;
            if (callTaxi.status === callTaxi_2.STATUS.SEND_SUCCESS) {
                res.status(200).json({
                    code: config_1.messages.SUCCESSFULLY.code,
                    messages: config_1.messages.SUCCESSFULLY.message,
                });
                return;
            }
        }
        const confirmed = yield (0, callTaxi_1.driverUpdateStatusService)(req, status);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            confirmed,
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
