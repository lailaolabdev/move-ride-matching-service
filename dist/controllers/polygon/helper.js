"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTaxis = void 0;
const filterTaxis = (query) => {
    let filter = {};
    if (query.taxiType) {
        if (Array.isArray(query.taxiType)) {
            // Filter by array of charger types
            filter.taxiType = { $in: query.taxiType };
        }
        else {
            // Single charger type filter
            filter.taxiType = query.taxiType;
        }
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
        filter = Object.assign(Object.assign({}, filter), { createdAt: Object.assign(Object.assign({}, (query.startDate ? { $gte: new Date(query.startDate) } : {})), (query.endDate ? { $lte: new Date(query.endDate) } : {})) });
    }
    return filter;
};
exports.filterTaxis = filterTaxis;
