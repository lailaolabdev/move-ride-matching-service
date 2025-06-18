import mongoose, { Document, Schema } from 'mongoose';

export interface ITaxiType extends Document {
    name: string,
    icon: string,
    seats: number,
    country: string,
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
