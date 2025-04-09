import mongoose, { Document, Schema } from "mongoose";

export interface ILoyalty extends Document {
    image: string,
    name: string,
    quantity: number,
    price: number,
    status: boolean
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
    countryId: String,
    countryCode: String,
    createdBy: String,
    updatedBy: String,
},
    { timestamps: true }
);

export const loyaltyModel = mongoose.model<ILoyalty>(
    "Loyalty",
    LoyaltySchema
);
