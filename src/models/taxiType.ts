import mongoose, { Document, Schema } from 'mongoose';
import { REQUEST_TYPE } from './callTaxi';

export interface ITaxiType extends Document {
    name: string,
    icon: string,
    seats: number,
    minDistance: number
    maxDistance: number
    price: number
    rideMatchingType: string
    status: boolean
}

const TaxiTypeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
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
    country: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const taxiTypeModel = mongoose.model<ITaxiType>(
    'TaxiType',
    TaxiTypeSchema
);

export default taxiTypeModel;
