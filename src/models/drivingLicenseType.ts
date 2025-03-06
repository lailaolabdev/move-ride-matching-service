import mongoose, { Document, Schema } from "mongoose";

export interface IDrivingLicenseType extends Document {
    name: string;
}

const DrivingLicenseTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: String,
    createdByFullName: String,
    updatedBy: String,
    updatedByFullName: String,
    country: String,
});

export const drivingLicenseTypeModel = mongoose.model<IDrivingLicenseType>(
    "DrivingLicenseType",
    DrivingLicenseTypeSchema
);
