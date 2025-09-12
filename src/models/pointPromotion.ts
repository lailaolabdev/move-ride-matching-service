import mongoose, { Document, Schema } from "mongoose";

export interface IPointPromotion extends Document {
  name: string;
  type: "REGISTER" | "PAYMENT";
  pointReward: number;
  status: boolean;
  minAmount?: number;
  startDate?: Date;
  endDate?: Date;
  country: string;
}

const pointPromotionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  type: {
    type: String,
    enum: ["REGISTER", "PAYMENT"],
    required: true,
  },
  minAmount: {
    type: Number,
    required: true
  }, 
  pointReward: {
    type: Number,
    required: true
  }, 
  status: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
  country: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const pointPromotionModel = mongoose.model<IPointPromotion>("pointPromotion", pointPromotionSchema);

export default pointPromotionModel;