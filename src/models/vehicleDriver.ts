import mongoose, { Document, Schema } from 'mongoose';


export interface IVehicleDriver extends Document {
    taxi: mongoose.Types.ObjectId;
    driver: string;
    driverFullName: string;
    frontVehicleImage: string;
    backVehicleImage: string;
    licensePlate: string;
    createdAt: Date;
    createdBy: string;
    createdByFullName: string;
    updatedAt: Date;
    updatedBy: string;
    updatedByFullName: string;
}


const vehicleDriverSchema: Schema = new Schema({
    taxi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Taxi'
    },
    taxiType: {
        type: String,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    vehicleBrand: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true
    },
    driverFullName: {
        type: String,
        required: true
    },
    frontVehicleImage: {
        type: String,
        required: true
    },
    backVehicleImage: {
        type: String,
        required: true
    },
    licensePlate: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    createdByFullName: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String },
    updatedByFullName: { type: String },
});

const vehicleDriverModel = mongoose.model<IVehicleDriver>('VehicleDriver', vehicleDriverSchema);

export default vehicleDriverModel;