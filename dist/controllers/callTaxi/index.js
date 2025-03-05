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
exports.driverUpdateStatus = exports.updateCallTaxis = exports.getDriverCallTaxis = exports.getUserCallTaxis = exports.createCallTaxi = void 0;
const config_1 = require("../../config");
const callTaxi_1 = require("../../services/callTaxi");
const callTaxi_2 = require("../../models/callTaxi");
const createCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create ride request
        const callTaxi = yield (0, callTaxi_1.createCallTaxiService)(req);
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: config_1.messages.CREATE_SUCCESSFUL.message,
            callTaxi
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
            callTaxis
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
            callTaxis
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
            data: updated
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
        const { id } = req.params;
        const callTaxi = yield callTaxi_2.CallTaxi.findOne({ _id: id, status: callTaxi_2.STATUS.REQUESTING });
        if (!callTaxi) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "This ride request was taken",
            });
            return;
        }
        let status = "";
        // driver confirm ride request  
        if (callTaxi.status === callTaxi_2.STATUS.REQUESTING)
            status = callTaxi_2.STATUS.DRIVER_RECEIVED;
        // driver arrived to passenger 
        else if (callTaxi.status === callTaxi_2.STATUS.DRIVER_RECEIVED)
            status = callTaxi_2.STATUS.DRIVER_ARRIVED;
        // departure 
        else if (callTaxi.status === callTaxi_2.STATUS.DRIVER_ARRIVED)
            status = callTaxi_2.STATUS.DEPARTURE;
        // Success
        else if (callTaxi.status === callTaxi_2.STATUS.DEPARTURE)
            status = callTaxi_2.STATUS.SEND_SUCCESS;
        const confirmed = yield (0, callTaxi_1.driverUpdateStatusService)(req, status);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            confirmed
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
