import mongoose, { Document, Schema } from 'mongoose';
import { ITaxiType } from './taxiType';

export interface ITaxi extends Document {
    taxiType: ITaxiType['_id'];
    vehicleModel: string;
    vehicleModelName: string;
    vehicleBrand: string;
    vehicleBrandName: string;
    passengerMin: number;
    passengerMax: number;
    meteredFare: number;
    flatFare: number;
    createdAt: Date;
    createdBy: string;
    createdByFullName: string;
    updatedAt: Date;
    updatedBy: string;
    updatedByFullName: string;
}

const taxiSchema: Schema = new Schema({
    taxiType: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxiType', required: true },
    vehicleModel: { type: String, required: true },
    vehicleModelName: {
        type: String,
        required: true
    },
    vehicleBrand: { type: String, required: true },
    vehicleBrandName: {
        type: String,
        required: true
    },
    passengerMin: { type: Number, required: true },
    passengerMax: { type: Number, required: true },
    meteredFare: { type: Number, required: true },
    flatFare: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    createdByFullName: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String },
    updatedByFullName: { type: String },
});

const taxiModel = mongoose.model<ITaxi>('Taxi', taxiSchema);

export default taxiModel;
