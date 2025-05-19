import mongoose, { Document, Schema } from 'mongoose';

export const usingTypeEnum = {
  onceTimeType: "ONCE_TIME_TYPE",
  periodType: "PERIOD_TYPE",
}

export interface IPromotion extends Document {
  status: boolean
  country: string
}

const PromotionSchema: Schema = new Schema({
  name: {
    type: String,
    require: true
  },
  discount: {
    type: Number,
    require: true
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
    require: true
  },
});

const promotionModel = mongoose.model<IPromotion>(
  'Promotion',
  PromotionSchema
);

export default promotionModel;
