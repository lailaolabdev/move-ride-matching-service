import mongoose, { Document, Schema, Types } from "mongoose";

export interface INewComerPromotionUsage extends Document {
  userId: string | Types.ObjectId;
  newComerPromotionId: string | Types.ObjectId;
  usedAt: Date;
  country: string;
}

const newComerPromotionUsageSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  newComerPromotionId: {
    type: Types.ObjectId,
    ref: 'newComerPromotion',
    required: true
  },
  usedAt: {
    type: Date,
    default: Date.now
  },
  country: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create compound index to ensure one usage per user per country
newComerPromotionUsageSchema.index({ userId: 1, country: 1 }, { unique: true });

const newComerPromotionUsageModel = mongoose.model<INewComerPromotionUsage>(
  'newComerPromotionUsage',
  newComerPromotionUsageSchema
);

export default newComerPromotionUsageModel;