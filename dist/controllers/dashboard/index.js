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
exports.scriptToUpdateCountry = exports.getTopTenPassenger = exports.getTopTenDriver = exports.getCallingTransaction = exports.summaryRideCallTaxi = exports.summaryRevenueCallTaxi = void 0;
const config_1 = require("../../config");
const callTaxi_1 = require("../../models/callTaxi");
const axios_1 = __importDefault(require("axios"));
const summaryRevenueCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate, country } = req.query;
        let filter = {
            status: "Paid", // Only include records with status = "Paid"
        };
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }
        if (country) {
            filter.country = country;
        }
        const result = yield callTaxi_1.CallTaxi.aggregate([
            {
                $match: filter,
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$totalPrice" },
                    totalClaimedDriverIncome: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$isClaim", true] },
                                then: "$driverIncome",
                                else: 0,
                            },
                        },
                    },
                    totalNotClaimedDriverIncome: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$isClaim", false] },
                                then: "$driverIncome",
                                else: 0,
                            },
                        },
                    },
                },
            },
        ]);
        if (result.length > 0) {
            const { totalPrice, totalClaimedDriverIncome, totalNotClaimedDriverIncome } = result[0];
            const taxiIncome = totalPrice - (totalClaimedDriverIncome + totalNotClaimedDriverIncome);
            res.status(200).json({
                code: config_1.messages.SUCCESSFULLY.code,
                message: config_1.messages.SUCCESSFULLY.message,
                totalPrice: parseFloat(totalPrice.toFixed(3)),
                totalClaimedDriverIncome: parseFloat(totalClaimedDriverIncome.toFixed(3)),
                totalNotClaimedDriverIncome: parseFloat(totalNotClaimedDriverIncome.toFixed(3)),
                taxiIncome: parseFloat(taxiIncome.toFixed(3)),
            });
        }
        else {
            res.status(200).json({
                code: config_1.messages.SUCCESSFULLY.code,
                message: config_1.messages.SUCCESSFULLY.message,
                totalPrice: 0,
                totalClaimedDriverIncome: 0,
                totalNotClaimedDriverIncome: 0,
                taxiIncome: 0,
            });
        }
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
        });
    }
});
exports.summaryRevenueCallTaxi = summaryRevenueCallTaxi;
const summaryRideCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate, country } = req.query; // Get query parameters
        const now = new Date();
        const currentMonth = new Date(now); // Get the current month
        const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 5)); // Start 5 months before the current month, including the current month
        // Generate an array of months for the last 6 months including the current month
        const months = [];
        for (let i = 0; i < 6; i++) {
            const date = new Date(sixMonthsAgo);
            date.setMonth(date.getMonth() + i); // Increment month
            months.push({
                year: date.getFullYear(),
                month: date.getMonth() + 1, // MongoDB months are 1-based
                total: 0,
                success: 0,
                canceled: 0,
            });
        }
        // Build the filter for the country if provided
        const filter = {};
        if (country) {
            filter.country = country; // Assuming country is an ObjectId
        }
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }
        console.log("filter: ", filter);
        // Aggregation pipeline for the three groups
        const aggregationResult = yield callTaxi_1.CallTaxi.aggregate([
            // Group 1: callStatistic (Total, Success, Cancel, InProcess)
            {
                $facet: {
                    callStatistic: [
                        {
                            $match: filter,
                        },
                        {
                            $group: {
                                _id: null, // Grouping by null to get a single result
                                totalCalls: { $sum: 1 },
                                successCalls: {
                                    $sum: { $cond: [{ $eq: ["$status", "Paid"] }, 1, 0] },
                                },
                                canceledCalls: {
                                    $sum: { $cond: [{ $eq: ["$status", "Canceled"] }, 1, 0] },
                                },
                                inProcessCalls: {
                                    $sum: {
                                        $cond: [
                                            { $in: ["$status", ["Accepted", "Driver_Arrived", "Picked_Up", "Departure", "Success"]] },
                                            1,
                                            0
                                        ]
                                    }
                                },
                            },
                        },
                    ],
                    // Group 2: lastSixMonth (Count per month for last 6 months)
                    lastSixMonth: [
                        {
                            $match: Object.assign({ createdAt: { $gte: sixMonthsAgo } }, filter),
                        },
                        {
                            $project: {
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" },
                                status: 1,
                            },
                        },
                        {
                            $group: {
                                _id: { year: "$year", month: "$month" },
                                total: { $sum: 1 },
                                success: {
                                    $sum: {
                                        $cond: [{ $eq: ["$status", "Paid"] }, 1, 0],
                                    },
                                },
                                canceled: {
                                    $sum: {
                                        $cond: [{ $eq: ["$status", "Canceled"] }, 1, 0],
                                    },
                                },
                            },
                        },
                        {
                            $sort: { "_id.year": -1, "_id.month": -1 }, // Sort by year, then month
                        },
                    ],
                },
            },
        ]);
        const result = aggregationResult[0];
        // Process lastSixMonth results to fill missing months with 0
        const lastSixMonthWithDefaults = months.map(month => {
            const existingMonth = result.lastSixMonth.find((data) => data._id.year === month.year && data._id.month === month.month);
            return {
                year: month.year,
                month: month.month,
                total: existingMonth ? existingMonth.total : 0,
                success: existingMonth ? existingMonth.success : 0,
                canceled: existingMonth ? existingMonth.canceled : 0,
            };
        });
        // Remove _id from callStatistic before sending to the client
        const callStatistic = result.callStatistic[0] || {};
        res.status(200).json({
            callStatistic: {
                totalCalls: callStatistic.totalCalls || 0,
                successCalls: callStatistic.successCalls || 0,
                canceledCalls: callStatistic.canceledCalls || 0,
                inProcessCalls: callStatistic.inProcessCalls || 0,
            },
            lastSixMonth: lastSixMonthWithDefaults,
        });
    }
    catch (error) {
        console.log("Error in getting call statistics:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
        });
    }
});
exports.summaryRideCallTaxi = summaryRideCallTaxi;
// Function to get calling transactions based on the status filter or default statuses
const getCallingTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, startDate, endDate, country } = req.query; // Get query parameters
        // Default statuses if no status is provided
        const statuses = status ? [status] : ["Accepted", "Driver_Arrived", "Picked_Up", "Departure", "Success"];
        // Build query object for filtering by status and createdAt date range
        const query = {
            status: { $in: statuses },
        };
        // Add startDate and endDate filters for createdAt
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }
        if (country) {
            query.country = country;
        }
        // Fetch the calling transactions with the specified filters
        const callingTransactions = yield callTaxi_1.CallTaxi.find(query)
            .select("passengerId carTypeId status totalDistance totalPrice createdAt originName destinationName passengerFullName driverFullName passengerPhoneNumber");
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            callingTransaction: callingTransactions,
        });
    }
    catch (error) {
        console.log("Error in getting calling transaction:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
        });
    }
});
exports.getCallingTransaction = getCallingTransaction;
const getTopTenDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, startDate, endDate, country } = req.query; // Get query parameters
        const statuses = status ? [status] : ["Paid"]; // Only filter for "Paid" status for now
        // Build the query for the filters
        const filter = { status: { $in: statuses } };
        // Apply startDate and endDate filters
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }
        // Apply country filter if provided
        if (country) {
            filter.country = country; // Assuming the country field is an ObjectId
        }
        // Fetch the top 10 drivers based on "Paid" transactions with the additional filters
        const topDrivers = yield callTaxi_1.CallTaxi.aggregate([
            {
                $match: filter, // Match the filters (status, date range, country)
            },
            {
                $group: {
                    _id: "$driverId", // Group by driverId (it’s a string)
                    totalCalls: { $sum: 1 }, // Count the total number of "Paid" calls for each driver
                    totalMeterCalls: {
                        $sum: {
                            $cond: [{ $eq: ["$requestType", "meter"] }, 1, 0], // Count trips with "meter" request type
                        },
                    },
                    totalFlatFareCalls: {
                        $sum: {
                            $cond: [{ $eq: ["$requestType", "flat_fare"] }, 1, 0], // Count trips with "flat_fare" request type
                        },
                    },
                    totalOfDriverIncome: { $sum: "$driverIncome" }, // Sum of all driver incomes
                    driverFullName: { $first: "$driverFullName" }, // Get the driver's full name (from the CallTaxi collection)
                },
            },
            {
                $sort: { totalCalls: -1 }, // Sort in descending order based on totalCalls
            },
            {
                $limit: 10, // Limit to the top 10 drivers
            },
            {
                $lookup: {
                    from: "ratings", // Lookup in the ratings collection
                    localField: "_id", // Match driverId in CallTaxi with userId in Rating
                    foreignField: "driverId",
                    as: "ratingInfo", // Join the rating info to each record
                },
            },
            {
                $unwind: {
                    path: "$ratingInfo", // Flatten the ratingInfo array to get the rating details
                    preserveNullAndEmptyArrays: true, // If no rating exists, preserve the document
                },
            },
            {
                $project: {
                    _id: 0, // Exclude _id from the result
                    driverId: "$_id", // Use driverId
                    totalCalls: 1, // Display the total calls
                    totalMeterCalls: 1, // Display the total trips with meter request type
                    totalFlatFareCalls: 1, // Display the total trips with flat fare request type
                    totalOfDriverIncome: 1, // Display the total of driver income
                    driverFullName: 1, // Display the driver full name from the CallTaxi collection
                    rating: { $ifNull: ["$ratingInfo.rating", 0] }, // Use $ifNull to set rating to 0 if no rating exists
                },
            },
        ]);
        // Send a request to get driver summary from user service with filters
        const summaryResponse = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/summary/count-driver`, {
            headers: {
                Authorization: req.headers['authorization']
            },
            params: { startDate, endDate, country } // Pass startDate, endDate, and country to the user service
        });
        const driverSummary = summaryResponse.data;
        // Combine the top drivers data with the driver summary
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            driverSummary,
            topDrivers,
        });
    }
    catch (error) {
        console.log("Error in getting top 10 drivers:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
        });
    }
});
exports.getTopTenDriver = getTopTenDriver;
const getTopTenPassenger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, startDate, endDate, country } = req.query; // Get query parameters
        const statuses = status ? [status] : ["Paid"]; // Only filter for "Paid" status for now
        // Build the query for the filters
        const filter = { status: { $in: statuses } };
        // Apply startDate and endDate filters
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }
        // Apply country filter if provided
        if (country) {
            filter.country = country; // Assuming the country field is an ObjectId
        }
        // Fetch the top 10 passengers based on "Paid" transactions with the additional filters
        const topPassengers = yield callTaxi_1.CallTaxi.aggregate([
            {
                $match: filter, // Match the filters (status, date range, country)
            },
            {
                $group: {
                    _id: "$passengerId", // Group by passengerId (it’s a string)
                    totalTrips: { $sum: 1 }, // Count the total number of "Paid" trips for each passenger
                    totalCancelTrips: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Canceled"] }, 1, 0], // Count trips with "Canceled" status
                        },
                    },
                    totalMeterTrips: {
                        $sum: {
                            $cond: [{ $eq: ["$requestType", "meter"] }, 1, 0], // Count trips with "meter" request type
                        },
                    },
                    totalFlatFareTrips: {
                        $sum: {
                            $cond: [{ $eq: ["$requestType", "flat_fare"] }, 1, 0], // Count trips with "flat_fare" request type
                        },
                    },
                    passengerFullName: { $first: "$passengerFullName" }, // Get passengerFullName from the CallTaxi collection
                },
            },
            {
                $sort: { totalTrips: -1 }, // Sort in descending order based on totalTrips
            },
            {
                $limit: 10, // Limit to the top 10 passengers
            },
            {
                $project: {
                    _id: 0, // Exclude _id from the result
                    passengerId: "$_id", // Use passengerId
                    totalTrips: 1, // Display the total trips
                    totalCancelTrips: 1, // Display the total canceled trips
                    totalMeterTrips: 1, // Display the total trips with meter request type
                    totalFlatFareTrips: 1, // Display the total trips with flat fare request type
                    passengerFullName: 1, // Display the passenger full name from the CallTaxi collection
                },
            },
        ]);
        // Send a request to get passenger summary from user service with filters
        const summaryResponse = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/summary/count-user`, {
            headers: {
                Authorization: req.headers['authorization']
            },
            params: { startDate, endDate, country } // Pass startDate, endDate, and country to the user service
        });
        const passengerSummary = summaryResponse.data;
        // Combine the top passengers data with the passenger summary
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            passengerSummary,
            topPassengers,
        });
    }
    catch (error) {
        console.log("Error in getting top 10 passengers:", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
        });
    }
});
exports.getTopTenPassenger = getTopTenPassenger;
const scriptToUpdateCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Thai
        // const country = "67c6c076d9ba8fe6164eac43"; // Example country ID
        // const countryCode = "TH"; // Example country code
        const country = "67c6c05bd9ba8fe6164eac3f";
        const countryCode = "LA";
        // Update all records in the CallTaxi collection by adding country and countryCode
        const result = yield callTaxi_1.CallTaxi.updateMany({}, {
            $set: {
                country: country,
                countryCode: countryCode,
            },
        });
        // Send a success response with the number of records updated
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: config_1.messages.SUCCESSFULLY.message,
            updatedCount: result.modifiedCount,
        });
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
        });
    }
});
exports.scriptToUpdateCountry = scriptToUpdateCountry;
