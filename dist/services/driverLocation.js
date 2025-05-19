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
exports.updateDriverLocationService = void 0;
const axios_1 = __importDefault(require("axios"));
const updateDriverLocationService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.user.id;
        const { longitude, latitude, isOnline } = req.body;
        if (isOnline === "online" || isOnline === "offline") {
            yield axios_1.default.put(
            // `${process.env.SOCKET_SERVICE_URL}/v1/api/driver-location-socket/${driverId}`,
            `http://localhost:3000/v1/api/driver-location-socket/${driverId}`, { longitude, latitude, isOnline });
        }
        return true;
    }
    catch (error) {
        console.log("Error updating driver location: ", error);
        throw error;
    }
});
exports.updateDriverLocationService = updateDriverLocationService;
