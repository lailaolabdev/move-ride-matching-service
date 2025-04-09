import mongoose, { Document, Schema, Types } from "mongoose";

const ACCEPTED_TYPE = {
    PICK_UP: "pick_up",
    DELIVERY: "delivery",
};

const STATUS = {
    PENDING: "pending",
    ACCEPTED: "accepted",
    CANCELED: "canceled",
    SHIPPED: "shipped",
}

export interface ILoyaltyClaim extends Document {
    userId: string | Types.ObjectId,
    loyaltyId: string | Types.ObjectId,
    acceptedType: string,
    address: string,
    status: string
}

const LoyaltyClaimSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true
    },
    loyaltyId: {
        type: Types.ObjectId,
        required: true
    },
    acceptedType: {
        type: String,
        enum: Object.values(ACCEPTED_TYPE),
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.PENDING
    },
    countryId: {
        type: Types.ObjectId,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

export const loyaltyClaimModel = mongoose.model<ILoyaltyClaim>(
    "LoyaltyClaim",
    LoyaltyClaimSchema
);
