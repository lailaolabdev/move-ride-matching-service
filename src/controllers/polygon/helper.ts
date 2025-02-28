import mongoose, { FilterQuery } from "mongoose";

const filterTaxis = (query: any): FilterQuery<any> => {
    let filter: FilterQuery<any> = {};
    if (query.taxiType) {
        if (Array.isArray(query.taxiType)) {
            // Filter by array of charger types
            filter.taxiType = { $in: query.taxiType };
        } else {
            // Single charger type filter
            filter.taxiType = query.taxiType;
        }
    }

    // Filter by passengerMin
    if (query.passengerMin) {
        filter = {
            ...filter,
            passengerMin: query.passengerMin,
        };
    }

    if (query.passengerMax) {
        filter = {
            ...filter,
            passengerMax: query.passengerMax,
        };
    }

    if(query.meteredFare) {
        filter = {
            ...filter,
            meteredFare: query.meteredFare,
        };
    }

    if(query.flatFare) {
        filter = {
            ...filter,
            flatFare: query.flatFare,
        };
    }

    

    // Filter by createdAt using startDate and endDate
    if (query.startDate || query.endDate) {
        filter = {
            ...filter,
            createdAt: {
                ...(query.startDate ? { $gte: new Date(query.startDate) } : {}),
                ...(query.endDate ? { $lte: new Date(query.endDate) } : {}),
            },
        };
    }

    return filter;
};

export { filterTaxis };
