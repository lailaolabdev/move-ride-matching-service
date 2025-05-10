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
exports.updateDriverLocationService = void 0;
const redis_1 = require("../config/redis/redis");
const updateDriverLocationService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.user.id;
        const { longitude, latitude, isOnline } = req.body;
        if (isOnline === "offline") {
            yield redis_1.redis.del(`driver:${driverId}:status`);
            yield redis_1.redis.zrem('drivers:locations', driverId);
            return true;
        }
        else if (isOnline === "online") {
            yield redis_1.redis.set(`driver:${driverId}:status`, isOnline);
            yield redis_1.redis.geoadd('drivers:locations', longitude, latitude, driverId);
            return true;
        }
        return true;
    }
    catch (error) {
        console.log("Error updating driver location: ", error);
        throw error;
    }
});
exports.updateDriverLocationService = updateDriverLocationService;
