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
}

const DriverCashSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    phone: String,
    email: String,
    country: String,
    countryCode: String,
    driver: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
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
