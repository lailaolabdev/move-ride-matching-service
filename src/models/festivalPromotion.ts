import mongoose, { Document, Schema } from 'mongoose';

export const usingTypeEnum = {
  onceTimeType: "ONCE_TIME_TYPE",
  periodType: "PERIOD_TYPE",
};

export interface IFestivalPromotion extends Document {
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
  period: {
    startDate: String,
    endDate: String
  },
  status: {
    type: Boolean,
    default: true
  },
  country: {
    type: String,
    required: true
  },
});

const festivalPromotionModel = mongoose.model<IFestivalPromotion>(
  'FestivalPromotion',
  FestivalPromotionSchema
);

export default festivalPromotionModel;