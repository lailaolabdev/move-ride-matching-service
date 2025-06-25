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
  PICKED_UP: "Picked_Up", // ລູກຄ້າຂຶ້ນລົດແລ້ວ
  DEPARTURE: "Departure", // ຢູ່ລະຫວ່າງການເດີນທາງ
  SEND_SUCCESS: "Success", // ສົ່ງລູກຄ້າສຳເລັດ
  PAID: "Paid", // ຈ່າຍເງິນສຳເລັດ(ສຳເລັດການເອີ້ນລົດ)
  CANCELED: "Canceled",
  TIMEOUT: "Timeout", // ໝົດເວລາຮອດ Driver ບໍ່ຮັບ
};

export interface ICallTaxi extends Document {
  // Passenger info
  passengerId: string;
  passengerComplain?: {
    rating?: number;
    driverBehavior?: string;
    satisfaction?: string;
    remark?: string;
    image?: string[];
  };
  carTypeId: string;
  origin: string;
  destination: string;
  originName: string;
  destinationName: string;
  requestType: string;

  // Trip data
  distanceInPolygon: number;
  durationInPolygon: number;
  normalDuration: number;
  delayDuration: number;
  delayDistance: number;
  totalDuration: number;
  totalDistance: number;
  totalPrice: number;
  disappear: boolean;
  status: string;

  // Driver info
  driverId?: string;
  driverComplain?: {
    rating?: number;
    customerBehavior?: string;
    satisfaction?: string;
    remark?: string;
    image?: string[];
  };

  // Price calculation details
  actualPrice?: number;
  estimatedPrice?: number;
  actualUsedTime?: string;
  calculatePrice?: number;
  polygonPrice?: number;
  onPeakTimePrice?: number;
  delayPrice?: number;
  billNumber: string,
  country: string,
  countryCode: string,
  platform: string,
  currency: string
  passengerFullName: String,
  passengerPhoneNumber: String,

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
    passengerFullName: String,
    passengerPhoneNumber: String,
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
    actualUsedTime: String,
    // price from distance per KM
    price: {
      type: Number,
      required: true,
    },
    polygonPrice: {
      type: Number,
      required: true,
    },
    onPeakTimePrice: {
      type: Number,
      required: true,
    },
    delayPrice: {
      type: Number,
      required: true,
    },
    isClaim: {
      type: Boolean,
      default: false
    },
    billNumber: {
      type: String,
      required: true,
    },
    driverIncome: Number,
    driverRate: Number,
    country: String,
    countryCode: String,
    driverFullName: String,
    driverPhoneNumber: String,
    currency: String,
    claimMoney: String,
    point: Number,
    paymentMethod: String,
    registrationSource: String,
    isRequestTaxInvoice: {
      type: Boolean,
      default: false
    },
    licensePlate: String,
    vehicleBrandName: String,
    vehicleModelName: String,
    festivalPromotion: {
      type: [
        {
          promotion: String,
          promotionName: String,
          promotionPrice: Number,
          promotionPercentage: Number,
          promotionType: String,
          promotionPeriod: {
            startDate: Date,
            endDate: Date,
          },
        }
      ],
      default: undefined, // or you can use default: []
    },
  },
  {
    timestamps: true,
  }
);

export const CallTaxi = model<ICallTaxi>("CallTaxi", CallTaxiSchema);
