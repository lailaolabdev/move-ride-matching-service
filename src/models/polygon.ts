import mongoose, { Document, Schema } from 'mongoose';

export interface IPolygon extends Document {
    name: string;
    coordinates: { lat: number; lng: number }[];
    price: string;
    color: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

const Polygon: Schema = new Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
});

const PolygonSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        coordinates: [Polygon],
        price: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        updatedBy: {
            type: String,
            default: null
        },
    },
    { timestamps: true }
);

const polygonModel = mongoose.model<IPolygon>('Polygon', PolygonSchema);

export default polygonModel;
