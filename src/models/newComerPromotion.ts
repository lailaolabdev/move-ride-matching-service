import mongoose, { Document, Schema } from 'mongoose';

export interface INewComerPromotion extends Document {
  name: string;
  discount: string;
  status: boolean;
  country: string;
}

const NewComerPromotionSchema: Schema = new Schema({
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
  'NewComerPromotion',
  NewComerPromotionSchema
);

export default newComerPromotionModel;