"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalFlatFareTime = exports.getTotalMeterTime = exports.gettotalTravelTime = exports.cancelTravelHistoryHistory = exports.travelHistoryHistory = exports.getComentAndRating = exports.chatCallTaxi = exports.updateStartAndComment = exports.callTaxiTotalPrice = exports.getRideHistory = exports.getThelastRide = exports.getTotalDistance = exports.gettotalRide = exports.driverUpdateStatus = exports.updateCallTaxis = exports.getDriverCallTaxis = exports.getPassengerComplainById = exports.createPassengerComplain = exports.createDriverComplain = exports.getUserCallTaxis = exports.createCallTaxi = void 0;
const config_1 = require("../../config");
const callTaxi_1 = require("../../services/callTaxi");
const callTaxi_2 = require("../../models/callTaxi");
const axios_1 = __importDefault(require("axios"));
const helper_1 = require("./helper");
const createCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const passengerId = req.user.id;
        // // If production deployed uncomment this 
        // const isCallTaxiExist = await getCallTaxisService(req)
        // if (isCallTaxiExist) {
        //     res.status(400).json({
        //         code: messages.BAD_REQUEST.code,
        //         message: messages.BAD_REQUEST.message,
        //         detail: "A taxi request is already in progress"
        //     });
        //     return
        // }
        // Fetch user data
        const passengerData = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${passengerId}`, {
            headers: {
                Authorization: `${req.headers["authorization"]}`,
            },
        });
        const passenger = (_a = passengerData === null || passengerData === void 0 ? void 0 : passengerData.data) === null || _a === void 0 ? void 0 : _a.user;
        if (!passenger) {
            res.status(404).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: `Id: ${passengerId} not found` }));
            return;
        }
        const callTaxi = yield (0, callTaxi_1.createCallTaxiService)(req);
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: config_1.messages.CREATE_SUCCESSFUL.message,
            callTaxi: Object.assign({ fullName: passenger.fullName, profileImage: passenger.profileImage }, callTaxi.toObject())
        });
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createCallTaxi = createCallTaxi;
const getUserCallTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const callTaxis = yield (0, callTaxi_1.getUserCallTaxisService)(req);
        // must check passenger first
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            callTaxis,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getUserCallTaxis = getUserCallTaxis;
const createDriverComplain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created = yield (0, callTaxi_1.createDriverComplainPassengerService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: created,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createDriverComplain = createDriverComplain;
const createPassengerComplain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created = yield (0, callTaxi_1.createPassengerComplainDriverService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: created,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createPassengerComplain = createPassengerComplain;
const getPassengerComplainById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complain = yield (0, callTaxi_1.getPassengerComplainDriverByIdService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: complain,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getPassengerComplainById = getPassengerComplainById;
const getDriverCallTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const callTaxis = yield (0, callTaxi_1.getDriverCallTaxisService)(req);
        // must check rider first
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            callTaxis,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getDriverCallTaxis = getDriverCallTaxis;
const updateCallTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield (0, callTaxi_1.updateCallTaxiService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: updated,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateCallTaxis = updateCallTaxis;
const driverUpdateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        const driver = yield axios_1.default.get(`
            ${process.env.USER_SERVICE_URL}/v1/api/users/${user.id}`, {
            headers: {
                Authorization: `${req.headers["authorization"]}`
            }
        });
        if (!(driver === null || driver === void 0 ? void 0 : driver.data)) {
            res.status(404).json(Object.assign(Object.assign({}, config_1.messages.NOT_FOUND), { detail: `Driver id: ${user.id} not found` }));
            return;
        }
        if (driver.data.user.role !== "DRIVER") {
            res.status(400).json(Object.assign(Object.assign({}, config_1.messages.BAD_REQUEST), { detail: "You are not a driver" }));
            return;
        }
        const callTaxi = yield callTaxi_2.CallTaxi.findById(id);
        if (!callTaxi) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "This ride request was taken",
            });
            return;
        }
        let status = "";
        if (!callTaxi.driverId) {
            // driver confirm ride request
            if (callTaxi.status === callTaxi_2.STATUS.REQUESTING)
                status = callTaxi_2.STATUS.DRIVER_RECEIVED;
        }
        if (callTaxi && callTaxi.driverId === user.id) {
            // driver arrived to passenger
            if (callTaxi.status === callTaxi_2.STATUS.DRIVER_RECEIVED)
                status = callTaxi_2.STATUS.DRIVER_ARRIVED;
            // departure
            if (callTaxi.status === callTaxi_2.STATUS.DRIVER_ARRIVED)
                status = callTaxi_2.STATUS.DEPARTURE;
            // Success
            if (callTaxi.status === callTaxi_2.STATUS.DEPARTURE)
                status = callTaxi_2.STATUS.SEND_SUCCESS;
            if (callTaxi.status === callTaxi_2.STATUS.SEND_SUCCESS) {
                res.status(200).json({
                    code: config_1.messages.SUCCESSFULLY.code,
                    messages: config_1.messages.SUCCESSFULLY.message,
                });
                return;
            }
        }
        const confirmed = yield (0, callTaxi_1.driverUpdateStatusService)(req, status);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            confirmed,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.driverUpdateStatus = driverUpdateStatus;
// report total ride 
const gettotalRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRide = yield (0, callTaxi_1.getTotalRideService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalRide));
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.gettotalRide = gettotalRide;
// report total totalDistance 
const getTotalDistance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalDistance = yield (0, callTaxi_1.getTotalDistanceService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalDistance));
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getTotalDistance = getTotalDistance;
// report total the last ride
const getThelastRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastRide = yield (0, callTaxi_1.getTheLastRideService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, lastRide));
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getThelastRide = getThelastRide;
// report  ride history
const getRideHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travelHistory = yield (0, callTaxi_1.getHistoryRideService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            travelHistory
        });
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getRideHistory = getRideHistory;
// Call the service function to calculate the total price of the taxi
const callTaxiTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        // Create pipeline
        const pipeneMongo = (0, helper_1.pipeline)({
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
        });
        // Call the  service function
        const totalPrice = yield (0, callTaxi_1.callTaxiTotalPriceReportService)(pipeneMongo);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            totalPrice: totalPrice,
        });
    }
    catch (error) {
        console.error("Error fetching tax info:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.callTaxiTotalPrice = callTaxiTotalPrice;
const updateStartAndComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        if (rating > 5) {
            return res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                messages: config_1.messages.BAD_GATEWAY.message,
                detail: "The rating must not exceed 5. Please provide a value between 1 and 5."
            });
        }
        yield (0, callTaxi_1.updateStarAndCommentService)(id, rating, comment);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateStartAndComment = updateStartAndComment;
const chatCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let { message } = req.body;
        const chatId = req.user.id;
        const chatData = [{
                id: chatId,
                message: message,
                createdAt: new Date(),
                updatedAt: new Date()
            }];
        const data = yield (0, callTaxi_1.updateChatCallTaxiService)(id, chatData);
        // const data=  await updateChatCallTaxiService(id, chat);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.chatCallTaxi = chatCallTaxi;
const getComentAndRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, callTaxi_1.getCommentAndRatingService)(id);
        // const data=  await updateChatCallTaxiService(id, chat);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            data: data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getComentAndRating = getComentAndRating;
// report ride history
const travelHistoryHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travelHistory = yield (0, callTaxi_1.travelHistoryService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            travelHistory
        });
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.travelHistoryHistory = travelHistoryHistory;
const cancelTravelHistoryHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travelHistory = yield (0, callTaxi_1.cancelTravelHistoryService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            messages: config_1.messages.SUCCESSFULLY.message,
            travelHistory
        });
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.cancelTravelHistoryHistory = cancelTravelHistoryHistory;
// total travel time 
const gettotalTravelTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalTravelTime = yield (0, callTaxi_1.getTotaltravelTimeService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalTravelTime));
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.gettotalTravelTime = gettotalTravelTime;
// get total travel request type meter
const getTotalMeterTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalMeterTime = yield (0, callTaxi_1.getTotalmeterService)(req);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalMeterTime));
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getTotalMeterTime = getTotalMeterTime;
// get total travel request type meter
const getTotalFlatFareTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalFlatFare = yield (0, callTaxi_1.getTotalFlatFareService)(req);
        console.log(totalFlatFare);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, messages: config_1.messages.SUCCESSFULLY.message }, totalFlatFare));
    }
    catch (error) {
        console.error("Error fetching total ride:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getTotalFlatFareTime = getTotalFlatFareTime;
