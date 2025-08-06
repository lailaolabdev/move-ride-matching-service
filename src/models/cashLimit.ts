import mongoose, { Document, Schema } from "mongoose";

export interface ICashLimit extends Document {
    price: number,
    limit: number,
    amount: number,
    country: string,
    countryCode: string,
}

const cashLimitSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    country: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
}, 
    { timestamps: true }
);

export const cashLimitModel = mongoose.model<ICashLimit>(
    "cashLimit",
    cashLimitSchema
);

