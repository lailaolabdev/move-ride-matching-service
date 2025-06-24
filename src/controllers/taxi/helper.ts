import mongoose, { FilterQuery } from "mongoose";

const filterTaxis = (query: any): FilterQuery<any> => {
    let filter: FilterQuery<any> = {};
    if (query.taxiType) {
        // if (Array.isArray(query.taxiType)) {
        //     // Filter by array of charger types
        //     filter.taxiType = { $in: query.taxiType };
        // } else {
        //     // Single charger type filter
        //     filter.taxiType = query.taxiType;
        // }
        filter.taxiType = new mongoose.Types.ObjectId(query.taxiType as string);
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

    if (query.meteredFare) {
        filter = {
            ...filter,
            meteredFare: query.meteredFare,
        };
    }

    if (query.flatFare) {
        filter = {
            ...filter,
            flatFare: query.flatFare,
        };
    }

    // Filter by createdAt using startDate and endDate
    if (query.startDate || query.endDate) {
        const createdAtFilter: any = {};

        if (query.startDate) {
            const startLao = new Date(query.startDate as string);
            // Convert to UTC by subtracting 7 hours immediately
            startLao.setHours(startLao.getHours() - 7);
            startLao.setMinutes(0);
            startLao.setSeconds(0);
            startLao.setMilliseconds(0);
            createdAtFilter.$gte = startLao;
        }

        if (query.endDate) {
            const endLao = new Date(query.endDate as string);
            // Convert to UTC by subtracting 7 hours immediately
            endLao.setHours(endLao.getHours() - 7 + 23);
            endLao.setMinutes(59);
            endLao.setSeconds(59);
            endLao.setMilliseconds(999);
            createdAtFilter.$lte = endLao;
        }

        filter.createdAt = createdAtFilter;
    }

    if(query.vehicleBrand) {
        filter.vehicleBrand = query.vehicleBrand;
    }

    if(query.vehicleModel) {
        filter.vehicleModel = query.vehicleModel;
    }

    if (query.country) {
        filter.country = query.country;
    }


    return filter;
};

export { filterTaxis };
