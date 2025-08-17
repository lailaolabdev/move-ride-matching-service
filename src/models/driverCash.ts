import mongoose, { Document, Schema } from 'mongoose';

export interface IDriverCash extends Document {
    driver: string,
    amount: number,
}

const DriverCashSchema: Schema = new Schema({
    driver: {
        type: String,
        required: true
    },
    amount: {
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
