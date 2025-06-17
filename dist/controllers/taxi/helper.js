"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTaxis = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const filterTaxis = (query) => {
    let filter = {};
    if (query.taxiType) {
        // if (Array.isArray(query.taxiType)) {
        //     // Filter by array of charger types
        //     filter.taxiType = { $in: query.taxiType };
        // } else {
        //     // Single charger type filter
        //     filter.taxiType = query.taxiType;
        // }
        filter.taxiType = new mongoose_1.default.Types.ObjectId(query.taxiType);
    }
    // Filter by passengerMin
    if (query.passengerMin) {
        filter = Object.assign(Object.assign({}, filter), { passengerMin: query.passengerMin });
    }
    if (query.passengerMax) {
        filter = Object.assign(Object.assign({}, filter), { passengerMax: query.passengerMax });
    }
    if (query.meteredFare) {
        filter = Object.assign(Object.assign({}, filter), { meteredFare: query.meteredFare });
    }
    if (query.flatFare) {
        filter = Object.assign(Object.assign({}, filter), { flatFare: query.flatFare });
    }
    // Filter by createdAt using startDate and endDate
    if (query.startDate || query.endDate) {
        const createdAtFilter = {};
        if (query.startDate) {
            const startLao = new Date(query.startDate);
            // Convert to UTC by subtracting 7 hours immediately
            startLao.setHours(startLao.getHours() - 7);
            startLao.setMinutes(0);
            startLao.setSeconds(0);
            startLao.setMilliseconds(0);
            createdAtFilter.$gte = startLao;
        }
        if (query.endDate) {
            const endLao = new Date(query.endDate);
            // Convert to UTC by subtracting 7 hours immediately
            endLao.setHours(endLao.getHours() - 7 + 23);
            endLao.setMinutes(59);
            endLao.setSeconds(59);
            endLao.setMilliseconds(999);
            createdAtFilter.$lte = endLao;
        }
        filter.createdAt = createdAtFilter;
    }
    if (query.vehicleBrand) {
        filter.vehicleBrand = query.vehicleBrand;
    }
    if (query.vehicleModel) {
        filter.vehicleModel = query.vehicleModel;
    }
    return filter;
};
exports.filterTaxis = filterTaxis;
