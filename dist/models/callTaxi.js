"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallTaxi = exports.STATUS = exports.REQUEST_TYPE = void 0;
const mongoose_1 = require("mongoose");
exports.REQUEST_TYPE = {
    METERED_FARE: "meter",
    FLAT_FARE: "flat_fare",
};
exports.STATUS = {
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
const CallTaxiSchema = new mongoose_1.Schema({
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
        enum: Object.values(exports.REQUEST_TYPE),
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
        enum: Object.values(exports.STATUS),
        default: exports.STATUS.REQUESTING,
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
}, {
    timestamps: true,
});
exports.CallTaxi = (0, mongoose_1.model)("CallTaxi", CallTaxiSchema);
