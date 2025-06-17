import { Request, Response } from "express";
import { messages } from "../../config";
import { CallTaxi } from "../../models/callTaxi";

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

    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
        });
        return;
    }
}



export const scriptToUpdateCountry = async (req: Request, res: Response) => {
    try {
        const country = "67c6c076d9ba8fe6164eac43"; // Example country ID
        const countryCode = "TH"; // Example country code

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