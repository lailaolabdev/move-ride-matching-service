import mongoose, { Document, Schema } from "mongoose";

export interface IRoundLimit extends Document {
    round: number;
    country: string;
    countryCode: string;
}

const roundLimitSchema = new Schema(
    {
        round: {
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

export const roundLimitModel = mongoose.model<IRoundLimit>(
    "roundLimit",
    roundLimitSchema
);