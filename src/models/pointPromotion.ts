import mongoose from "mongoose";

export interface IPointPromotion extends Document {
  name: string;
  type: "register" | "payment";
  pointReward: number;
  status: boolean;
  minAmount?: number | null | undefined;
  startDate?: NativeDate | null | undefined;
  endDate?: NativeDate | null | undefined;
  country: string;
}

const pointPromotionSchema = new mongoose.Schema({
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

export default mongoose.model("PointPromotion", pointPromotionSchema);