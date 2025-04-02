import mongoose, { Document, Schema } from "mongoose";

export interface IDriverLocation extends Document {
    driverId: mongoose.Schema.Types.ObjectId,
    latitude: string,
    longitude: number,
}

const DriverLocationSchema = new Schema({
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

export const driverLocationModel = mongoose.model<IDriverLocation>(
    "DriverLocation",
    DriverLocationSchema
);
