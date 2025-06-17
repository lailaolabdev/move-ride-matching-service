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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptToUpdateCountry = exports.summaryRevenueCallTaxi = void 0;
const config_1 = require("../../config");
const callTaxi_1 = require("../../models/callTaxi");
const summaryRevenueCallTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract filters from the query parameters
        const { startDate, endDate, country } = req.query;
        // Build the filter object
        let filter = {};
        // Add the startDate and endDate filters if they are provided
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate), // Greater than or equal to startDate
                $lte: new Date(endDate), // Less than or equal to endDate
            };
        }
        // Add the country filter if it's provided
        if (country) {
            filter.country = country;
        }
        // Perform the aggregation to calculate the total price and the total price for isClaim = true
        const result = yield callTaxi_1.CallTaxi.aggregate([
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
                code: config_1.messages.SUCCESSFULLY.code,
                message: config_1.messages.SUCCESSFULLY.message,
                totalPrice: result[0].totalPrice,
                totalClaimedPrice: result[0].totalClaimedPrice,
            });
        }
        else {
            res.status(200).json({
                code: config_1.messages.SUCCESSFULLY.code,
                message: config_1.messages.SUCCESSFULLY.message,
                totalPrice: 0,
                totalClaimedPrice: 0,
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
const scriptToUpdateCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = "67c6c076d9ba8fe6164eac43"; // Example country ID
        const countryCode = "TH"; // Example country code
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
