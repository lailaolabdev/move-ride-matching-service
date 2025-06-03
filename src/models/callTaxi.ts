import { Schema, model } from "mongoose";

export const REQUEST_TYPE = {
  METERED_FARE: "meter",
  FLAT_FARE: "flat_fare",
};

export const STATUS = {
  REQUESTING: "Requesting", // ລໍຖ້າ Driver ກົດຮັບ
  NO_RECEIVED: "No_Received", // Driver ບໍ່ກົດຮັບ
  DRIVER_RECEIVED: "Accepted", // Driver ກົດຮັບແລ້ວ
  DRIVER_ARRIVED: "Driver_Arrived", // Driver ມາຮອດແລ້ວ
  DEPARTURE: "Departure", // ຢູ່ລະຫວ່າງການເດີນທາງ
  SEND_SUCCESS: "Success", // ສົ່ງລູກຄ້າສຳເລັດ
  PAID: "Paid", // ຈ່າຍເງິນສຳເລັດ(ສຳເລັດການເອີ້ນລົດ)
  CANCELED: "Canceled", //
  TIMEOUT: "Timeout", // ໝົດເວລາຮອດ Driver ບໍ່ຮັບ
};

export interface ICallTaxi extends Document {
  passengerId: String;
  driverId: String;
  carTypeId: String;
  origin: String;
  destination: String;
  requestType: String;
  distanceInPolygon: Number;
  durationInPolygon: Number;
  totalDistance: Number;
  normalDurationMin: Number;
  trafficDelayMin: Number;
  totalDurationMin: Number;
  totalPrice: Number;
  status: String;
  createdAt: Date;
  updatedAt: Date;
}

const CallTaxiSchema: Schema = new Schema(
  {
    // passenger info
    passengerId: {
      type: String,
      required: true,
    },
    passengerComplain: {
      type: {
        rating: Number,
        driverBehavior: String,
        satisfaction: String,
        remark: String,
        image: [String],
      },
      default: undefined,
    },
    carTypeId: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    originName: {
      type: String,
      required: true,
    },
    destinationName: {
      type: String,
      required: true,
    },
    requestType: {
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
      default: 0
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.REQUESTING,
    },
    // Driver info
    driverId: String,
    driverComplain: {
      type: {
        rating: Number,
        customerBehavior: String,
        satisfaction: String,
        remark: String,
        image: [String],
      },
      default: undefined,
    },
    actualPrice: Number,
    estimatedPrice: Number,
    actualUsedTime: String
  },
  {
    timestamps: true,
  }
);

export const CallTaxi = model<ICallTaxi>("CallTaxi", CallTaxiSchema);
