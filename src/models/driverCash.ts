import mongoose, { Document, Schema } from 'mongoose';

export interface IDriverCash extends Document {
    firstName: string,
    lastName: string,
    fullName: string,
    phone: string,
    email: string,
    country: string,
    countryCode: string,
    driver: string,
    amount: number,
    limit: number,
}

const DriverCashSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    limit: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
});

const driverCashModel = mongoose.model<IDriverCash>(
    'DriverCash',
    DriverCashSchema
);

export default driverCashModel;
