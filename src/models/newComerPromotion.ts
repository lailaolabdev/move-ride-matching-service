import mongoose, { Document, Schema } from 'mongoose';

export interface INewComerPromotion extends Document {
  name: string;
  discount: number;
  status: boolean;
  country: string;
}

const newComerPromotionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
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

const newComerPromotionModel = mongoose.model<INewComerPromotion>(
  'newComerPromotion',
  newComerPromotionSchema
);

export default newComerPromotionModel;