import mongoose, { Document, Schema } from "mongoose";

export interface IDriverRate extends Document {
    minDistance: number;
    maxDistance: number;
    percentage: number;
}

const driverRateSchema = new Schema({
    taxiType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaxiType',
        required: true,
    },
    minDistance: {
        type: Number,
        required: true
    },
    maxDistance: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    createdBy: String,
    createdByFullName: String,
    updatedBy: String,
    updatedByFullName: String,
    country: String,
});

export const driverRateModel = mongoose.model<IDriverRate>(
    "driverate",
    driverRateSchema
);
