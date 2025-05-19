import mongoose, { Document, Schema } from 'mongoose';
import { REQUEST_TYPE } from './callTaxi';

export interface ITaxiTypePricing extends Document {
  taxiTypeId: string
  minDistance: number
  maxDistance: number
  price: number
  rideMatchingType: string
  status: boolean
}

const TaxiTypePricingSchema: Schema = new Schema({
  taxiTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaxiType',
    required: true,
  },
  minDistance: {
    type: Number,
    required: true
  },
  maxDistance: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rideMatchingType: {
    type: String,
    enum: Object.values(REQUEST_TYPE),
    require: true
  },
  status: {
    type: Boolean,
    default: true
  },
  country: {
    type: String,
    default: true
  },
});

const taxiTypePricingModel =
  mongoose.model<ITaxiTypePricing>(
    'TaxiTypePricing',
    TaxiTypePricingSchema
  );

export default taxiTypePricingModel;
