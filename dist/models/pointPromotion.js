"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pointPromotionSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    }, // e.g., "Welcome Bonus", "Spend and Earn"
    type: {
        type: String,
        enum: ["register", "payment"],
        required: true,
    },
    // for 'payment' promotions
    minAmount: Number, // optional, like "minimum 50 THB"
    pointReward: {
        type: Number,
        required: true
    }, // how many points to give
    status: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    country: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("PointPromotion", pointPromotionSchema);
