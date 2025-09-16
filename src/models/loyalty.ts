import mongoose, { Document, Schema } from "mongoose";

export interface ILoyalty extends Document {
    image: string,
    name: string,
    quantity: number,
    price: number,
    status: boolean,
    country?: string,
    countryCode?: string,
    createdBy?: string,
    createdByFullName?: string,
    updatedBy?: string,
    updatedByFullName?: string,
}

const LoyaltySchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    country: String,
    countryCode: String,
    createdBy: String,
    createdByFullName: String,
    updatedBy: String,
    updatedByFullName: String,
},
    { timestamps: true }
);

export const loyaltyModel = mongoose.model<ILoyalty>(
    "Loyalty",
    LoyaltySchema
);
