import { Schema, model } from "mongoose";

const REQUEST_TYPE = {
	METERED_FARE: "meter",
	FLAT_FARE: "flat_fare",
};

export const STATUS = {
	REQUESTING: "Requesting", // ລໍຖ້າ Driver ກົດຮັບ
	NO_RECEIVED: "No_Received", // Driver ບໍ່ກົດຮັບ
	DRIVER_RECEIVED: "Accepted", // Driver ກົດຮັບແລ້ວ
	DRIVER_ARRIVED: "Driver_Arrived", // Driver ມາຮອດແລ້ວ
	Departuring: "Departuring", // ຢູ່ລະຫວ່າງການເດີນທາງ
	SEND_SUCCESS: "Success", // ສົ່ງລູກຄ້າສຳເລັດ
	PAID: "Paid", // ຈ່າຍເງິນສຳເລັດ(ສຳເລັດການເອີ້ນລົດ)
	MISSED: "Missed", // ບໍ່ມີ Driver ກົດຮັບ
};

export interface ICallTaxi extends Document {
	passengerId: String;
	driverId: String;
	carTypeId: String;
	origin: String;
	destination: String;
	type: String;
	distanceInPolygon: Number;
	durationInPolygon: Number;
	totalDistance: Number;
	normalDurationMin: Number;
	trafficDelayMin: Number;
	totalDurationMin: Number;
	totalPrice: Number,
	status: String;
	createdAt: Date;
	updatedAt: Date;
}

const CallTaxiSchema: Schema = new Schema(
	{
		passengerId: {
			type: String,
			required: true,
		},
		carTypeId: {
			type: String,
			required: true,
		},
		driverId: {
			type: String,
			default: null,
		},
		origin: {
			type: String,
			required: true,
		},
		destination: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: Object.values(REQUEST_TYPE),
			required: true,
		},
		distanceInPolygon: {
			type: Number,
			required: true,
		},
		durationInPolygon: {
			type: Number,
			required: true,
		},
		normalDuration: {
			type: Number,
			required: true,
		},
		delayDuration: {
			type: Number,
			required: true,
		},
		delayDistance: {
			type: Number,
			required: true,
		},
		totalDuration: {
			type: Number,
			required: true,
		},
		totalDistance: {
			type: Number,
			required: true,
		},
		totalPrice: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(STATUS),
			default: STATUS.REQUESTING,
		},
	},
	{
		timestamps: true,
	}
);

export const CallTaxi = model<ICallTaxi>(
	"CallTaxi",
	CallTaxiSchema
);
