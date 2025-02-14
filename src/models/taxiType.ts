import mongoose, { Document, Schema } from 'mongoose';

export interface ITaxiType extends Document {
    name: string;
    icon: string;
    createdAt: Date;
    createdBy: string;
    createdByFullName: string;
    updatedAt: Date;
    updatedBy: string;
    updatedByFullName: string;
}

const TaxiTypeSchema: Schema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    createdByFullName: {
        type: String,
        required: true,
    },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String },
    updatedByFullName: String
});

const taxiTypeModel = mongoose.model<ITaxiType>('TaxiType', TaxiTypeSchema);

export default taxiTypeModel;
