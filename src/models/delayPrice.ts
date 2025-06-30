import mongoose, { Document, Schema } from "mongoose";

export interface IDelayPrice extends Document {
    price: number;
    createdBy: string;
    createdByFullName: string;
    updatedBy: string;
    updatedByFullName: string;
    country: string;
    countryCode: string;
}

const delayPriceSchema = new Schema({
    price: {
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

export const driverRateModel = mongoose.model<IDelayPrice>(
    "delayPrice",
    delayPriceSchema
);
