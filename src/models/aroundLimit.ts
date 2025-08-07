import mongoose, { Document, Schema } from "mongoose";

export interface IAroundLimit extends Document {
    around: number,
    country: string,
    countryCode: string,
}

const aroundLimitSchema = new Schema({
    around: {
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

export const aroundLimitModel = mongoose.model<IAroundLimit>(
    "aroundLimit",
    aroundLimitSchema
);

