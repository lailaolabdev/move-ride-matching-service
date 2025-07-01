import mongoose, { Document, Schema } from 'mongoose';
import { REQUEST_TYPE } from './callTaxi';

export interface ITaxiTypePricing extends Document {
  taxiTypeId: string
  minDistance: number
  maxDistance: number
  price: number
  rideMatchingType: string
  status: boolean,
  country: string,
  countryCode: string
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
  meterPrice: {
    type: Number,
    required: true
  },
  flatFarePrice: {
    type: Number,
    default: true
  },
  country: String,
  countryCode: String,
});

const taxiTypePricingModel = mongoose.model<ITaxiTypePricing>(
  'TaxiTypePricing',
  TaxiTypePricingSchema
);

export default taxiTypePricingModel;
