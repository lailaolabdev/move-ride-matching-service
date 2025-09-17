import mongoose, { Document, Schema, Types } from "mongoose";

const ACCEPTED_TYPE = {
    PICK_UP: "PICK_UP",
    DELIVERY: "DELIVERY",
};

const STATUS = {
    PENDING: "PENDING",
    APPROVED: "APPROVED", 
    REJECTED: "REJECTED",
    DELIVERED: "DELIVERED",
}

export interface ILoyaltyClaim extends Document {
    userId: string | Types.ObjectId,
    loyaltyId: string | Types.ObjectId,
    userFullName: string,
    userPhone: string,
    loyaltyPrice: number,
    loyaltyName: string,
    acceptedType: string,
    address: string,
    status: string,
    country: string | Types.ObjectId,
    createdBy?: string,
    createdByFullName?: string,
    updatedBy?: string,
    updatedByFullName?: string,
    approvedAt?: Date,
    approvedBy?: string,
    rejectedAt?: Date,
    rejectedBy?: string,
    deliveredAt?: Date,
    deliveredBy?: string,
}

const LoyaltyClaimSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userFullName: String,
    userPhone: String, 
    loyaltyPrice: {
        type: Number,
        required: true
    },
    loyaltyId: {
        type: Types.ObjectId,
        required: true
    },
    loyaltyName: {
        type: String,
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
    country: {
        type: String,
        required: true
    },
    createdBy: String,
    createdByFullName: String,
    updatedBy: String,
    updatedByFullName: String,
    approvedAt: Date,
    approvedBy: String,
    rejectedAt: Date,
    rejectedBy: String,
    deliveredAt: Date,
    deliveredBy: String,
},
    { timestamps: true }
);

export const loyaltyClaimModel = mongoose.model<ILoyaltyClaim>(
    "loyaltyClaim",
    LoyaltyClaimSchema
);
