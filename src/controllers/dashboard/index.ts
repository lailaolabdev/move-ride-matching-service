import { Request, Response } from "express";
import { messages } from "../../config";
import { CallTaxi } from "../../models/callTaxi";
import axios from "axios";
import mongoose from "mongoose";

export const summaryRevenueCallTaxi = async (req: Request, res: Response) => {
    try {
        // Extract filters from the query parameters
        const { startDate, endDate, country } = req.query;

        // Build the filter object
        let filter: any = {};

        // Add the startDate and endDate filters if they are provided
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate as string),  // Greater than or equal to startDate
                $lte: new Date(endDate as string),    // Less than or equal to endDate
            };
        }

        // Add the country filter if it's provided
        if (country) {
            filter.country = country;
        }

        // Perform the aggregation to calculate the total price and the total price for isClaim = true
        const result = await CallTaxi.aggregate([
            {
                $match: filter, // Apply the filters (startDate, endDate, country)
            },
            {
                $group: {
                    _id: null, // No grouping by specific field, we want the total sum
                    totalPrice: { $sum: "$totalPrice" }, // Sum the totalPrice field
                    totalClaimedPrice: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$isClaim", true] }, // Only sum totalPrice if isClaim is true
                                then: "$totalPrice",
                                else: 0,
                            },
                        },
                    },
                },
            },
        ]);

        // Check if the result has a totalPrice field and send the response
        if (result.length > 0) {
            res.status(200).json({
                code: messages.SUCCESSFULLY.code,
                message: messages.SUCCESSFULLY.message,
                totalPrice: result[0].totalPrice,
                totalClaimedPrice: result[0].totalClaimedPrice,
            });
        } else {
            res.status(200).json({
                code: messages.SUCCESSFULLY.code,
                message: messages.SUCCESSFULLY.message,
                totalPrice: 0,
                totalClaimedPrice: 0,
                totalNotClaimedPrice: 0,
            });
        }
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
        });
        return;
    }
};

export const summaryRideCallTaxi = async (req: Request, res: Response) => {
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
        const filter: any = {};
        if (country) {
            filter.country = new mongoose.Types.ObjectId(country as string); // Assuming country is an ObjectId
        }

        // Aggregation pipeline for the three groups
        const aggregationResult = await CallTaxi.aggregate([
            // Group 1: callStatistic (Total, Success, Cancel)
            {
                $facet: {
                    callStatistic: [
                        {
                            $match: {
                                createdAt: {
                                    $gte: startDate ? new Date(startDate as string) : new Date(0),
                                    $lte: endDate ? new Date(endDate as string) : new Date(),
                                },
                                ...filter, // Include the country filter
                            },
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
                            },
                        },
                    ],

                    // Group 2: lastSixMonth (Count per month for last 6 months)
                    lastSixMonth: [
                        {
                            $match: {
                                createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months, including the current month
                                ...filter, // Include the country filter
                            },
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
            const existingMonth = result.lastSixMonth.find(
                (data: any) => data._id.year === month.year && data._id.month === month.month
            );
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
            },
            lastSixMonth: lastSixMonthWithDefaults,
        });
    } catch (error) {
        console.log("Error in getting call statistics:", error);
        res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while fetching the call statistics.",
        });
    }
};



// Function to get calling transactions based on the status filter or default statuses
export const getCallingTransaction = async (req: Request, res: Response) => {
    try {
        const { status, startDate, endDate, country } = req.query; // Get query parameters

        // Default statuses if no status is provided
        const statuses = status ? [status] : ["Accepted", "Driver_Arrived", "Picked_Up", "Departure"];

        // Build query object for filtering by status and createdAt date range
        const query: any = {
            status: { $in: statuses },
        };

        // Add startDate and endDate filters for createdAt
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate as string),
                $lte: new Date(endDate as string),
            };
        }

        if (country) {
            query.country = country
        }

        // Fetch the calling transactions with the specified filters
        const callingTransactions = await CallTaxi.find(query)
            .select("passengerId carTypeId status totalDistance totalPrice createdAt originName destinationName");

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: messages.SUCCESSFULLY.message,
            callingTransaction: callingTransactions,
        });
    } catch (error) {
        console.log("Error in getting calling transaction:", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
        });
    }
};

export const getTopTenDriver = async (req: Request, res: Response) => {
    try {
        const { status, startDate, endDate, country } = req.query; // Get query parameters
        const statuses = status ? [status] : ["Paid"]; // Only filter for "Paid" status for now
        // Build the query for the filters
        const filter: any = { status: { $in: statuses } };

        // Apply startDate and endDate filters
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate as string),
                $lte: new Date(endDate as string),
            };
        }

        // Apply country filter if provided
        if (country) {
            filter.country = country // Assuming the country field is an ObjectId
        }

        // Fetch the top 10 drivers based on "Paid" transactions with the additional filters
        const topDrivers = await CallTaxi.aggregate([
            {
                $match: filter, // Match the filters (status, date range, country)
            },
            {
                $group: {
                    _id: "$driverId", // Group by driverId (it’s a string)
                    totalCalls: { $sum: 1 }, // Count the total number of "Paid" calls for each driver
                },
            },
            {
                $sort: { totalCalls: -1 }, // Sort in descending order based on totalCalls
            },
            {
                $limit: 10, // Limit to the top 10 drivers
            },
            {
                $project: {
                    _id: 0, // Exclude _id from the result
                    driverId: "$_id", // Use driverId
                    totalCalls: 1, // Display the total calls
                },
            },
        ]);

        // Send a request to get driver summary from user service with filters
        const summaryResponse = await axios.get(`${process.env.USER_SERVICE_URL}/v1/api/users/summary/count-driver`, {
            headers: {
                Authorization: req.headers['authorization']
            },
            params: { startDate, endDate, country } // Pass startDate, endDate, and country to the user service
        });
        const driverSummary = summaryResponse.data;

        // Combine the top drivers data with the driver summary
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: messages.SUCCESSFULLY.message,
            driverSummary,
            topDrivers,
        });
    } catch (error) {
        console.log("Error in getting top 10 drivers:", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
        });
    }
};


export const getTopTenPassenger = async (req: Request, res: Response) => {
    try {
        const { status, startDate, endDate, country } = req.query; // Get query parameters
        const statuses = status ? [status] : ["Paid"]; // Only filter for "Paid" status for now

        // Build the query for the filters
        const filter: any = { status: { $in: statuses } };

        // Apply startDate and endDate filters
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate as string),
                $lte: new Date(endDate as string),
            };
        }

        // Apply country filter if provided
        if (country) {
            filter.country = country; // Assuming the country field is an ObjectId
        }

        // Fetch the top 10 passengers based on "Paid" transactions with the additional filters
        const topPassengers = await CallTaxi.aggregate([
            {
                $match: filter, // Match the filters (status, date range, country)
            },
            {
                $group: {
                    _id: "$passengerId", // Group by passengerId (it’s a string)
                    totalTrips: { $sum: 1 }, // Count the total number of "Paid" trips for each passenger
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
                },
            },
        ]);

        // Send a request to get passenger summary from user service with filters
        const summaryResponse = await axios.get(`${process.env.USER_SERVICE_URL}/v1/api/users/summary/count-user`, {
            headers: {
                Authorization: req.headers['authorization']
            },
            params: { startDate, endDate, country } // Pass startDate, endDate, and country to the user service
        });
        const passengerSummary = summaryResponse.data;

        // Combine the top passengers data with the passenger summary
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: messages.SUCCESSFULLY.message,
            passengerSummary,
            topPassengers,
        });
    } catch (error) {
        console.log("Error in getting top 10 passengers:", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
        });
    }
};









export const scriptToUpdateCountry = async (req: Request, res: Response) => {
    try {
        // Thai
        // const country = "67c6c076d9ba8fe6164eac43"; // Example country ID
        // const countryCode = "TH"; // Example country code

        const country = "67c6c05bd9ba8fe6164eac3f";
        const countryCode = "LA";

        // Update all records in the CallTaxi collection by adding country and countryCode
        const result = await CallTaxi.updateMany(
            {},
            {
                $set: {
                    country: country,
                    countryCode: countryCode,
                },
            }
        );

        // Send a success response with the number of records updated
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: messages.SUCCESSFULLY.message,
            updatedCount: result.modifiedCount,
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
        });
    }
};