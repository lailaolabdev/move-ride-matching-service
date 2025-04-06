import mongoose, { Document, Schema } from "mongoose";

export interface IDriverLocation extends Document {
    driverId: mongoose.Schema.Types.ObjectId,
    latitude: string,
    longitude: number,
    location: {
        type: string,
        coordinates: number[]
    }
    isOnline: boolean,
}

const DriverLocationSchema = new Schema({
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    isOnline: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

DriverLocationSchema.index({ location: '2dsphere' }); // Add a 2dsphere index for geospatial queries

export const driverLocationModel = mongoose.model<IDriverLocation>(
    "DriverLocation",
    DriverLocationSchema
);
