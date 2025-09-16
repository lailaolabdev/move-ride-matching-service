import mongoose, { Document, Schema } from 'mongoose';

export const usingTypeEnum = {
  onceTimeType: "ONE_TIME_TYPE",
  periodType: "PERIOD_TYPE",
};

export interface IFestivalPromotion extends Document {
  name: string;
  discount: number;
  usingType: string;
  periodStartTime: Date;
  periodEndTime: Date;
  status: boolean;
  country: string;
}

const FestivalPromotionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  usingType: {
    type: String,
    enum: Object.values(usingTypeEnum),
  },
  periodStartTime: {
    type: Date,
    required: true
  },
  periodEndTime: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  country: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const festivalPromotionModel = mongoose.model<IFestivalPromotion>(
  'FestivalPromotion',
  FestivalPromotionSchema
);

export default festivalPromotionModel;