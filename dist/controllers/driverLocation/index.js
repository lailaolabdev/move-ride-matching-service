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
const updateDriverLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const driverId = req.user.id;
        const { longitude, latitude, isOnline, registrationSource } = req.body;
        const user = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${driverId}`);
        const userData = (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.user;
        if (!userData || userData.status === "BLOCKED") {
            res.status(200).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: "Your account has been blocked. Please contact support for more information.",
            });
            return;
        }
        yield (0, driverLocation_1.updateDriverLocationService)({
            driverId,
            longitude,
            latitude,
            isOnline,
            registrationSource
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
