import mongoose, { Document, Schema } from "mongoose";

export interface IDriverRate extends Document {
    registrationSource: string;
    minDistance: number;
    maxDistance: number;
    percentage: number;
    createdBy: string;
    createdByFullName: string;
    updatedBy: string;
    updatedByFullName: string;
    country: string;
    countryCode: string;
}

const driverRateSchema = new Schema({
    registrationSource: {
        type: String,
        enum: ["inside", "outside"]
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
    countryCode: String,
}, {
    timestamps: true
});

export const driverRateModel = mongoose.model<IDriverRate>(
    "driverate",
    driverRateSchema
);
