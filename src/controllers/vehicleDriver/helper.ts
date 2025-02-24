import mongoose, { FilterQuery } from "mongoose";


export const filterVehicleDriver = (query: any): FilterQuery<any> => {
    let filter: FilterQuery<any> = {};

    if(query.driver) {
        filter.driver = query.driver;
    }

    if(query.licensePlate) {
        filter.licensePlate = query.licensePlate;
    }

    if (query.taxiType) {
        filter.taxiType = new mongoose.Types.ObjectId(query.taxiType);
    }

    if(query.vehicleBrand) {
        filter['taxi.vehicleBrand'] = query.vehicleBrand;  // Filter by vehicleBrand
    }

    if(query.vehicleModel) {
        filter['taxi.vehicleModel'] = query.vehicleModel;  // Filter by vehicleModel
    }

    return filter;
}