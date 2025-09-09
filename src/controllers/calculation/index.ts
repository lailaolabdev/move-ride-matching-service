import { Request, Response } from "express";
import { messages } from "../../config";
import { calculateDriverDistanceAndDurationService, calculateUserDistanceAndDurationService } from "../../services/calculation";
import { getOnPeakTimeService } from "../../services/onPeakTime";
import { getTaxiPricingDistance } from "../../services/taxiTypePricing";
import { driverRateModel } from "../../models/driverRate";
import { CallTaxi } from "../../models/callTaxi";
import { roundLimitModel } from "../../models/roundLimit";
import { Types } from "mongoose";

export const calculateUserDistanceAndDuration = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { origin, destination, country } = req.body;

        // Calculation method:
        // step 1 : Calculate distance and duration from google map
        const calculate = await calculateUserDistanceAndDurationService(origin, destination);

        if (!calculate) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: `Taxi not available`,
            });

            return;
        }

        // step 2 : find taxi type pricing base on distance, 
        // example: distance 5km find distance between 1 - 5
        const distance = calculate.totalDistance;

        const taxiTypePricing: any = await getTaxiPricingDistance({ country, distance }) ?? []

        const meter: any = [];
        const flatFare: any = [];
        let delayPrice = 10;

        // step 3 : find peak time base on distance
        const onPeakTime = await getOnPeakTimeService(req.headers.authorization as string, country);
        const onPeakTimePrice = onPeakTime.credit ?? 0;

        // step 4 : loop through taxiTypePricing and 
        // calculate price both meter and flat fare
        // calculation method: 
        //
        // (meter price or flat fare price + peak time price) * total distance +
        // calculate.priceInPolygon +
        // delay price * delay duration

        for (let i = 0; i < taxiTypePricing.length; i++) {
            const taxiPricing = {
                id: taxiTypePricing[i].taxiType._id,
                image: taxiTypePricing[i].taxiType.icon,
                cartType: taxiTypePricing[i].taxiType.name,
                seats: taxiTypePricing[i].taxiType.seats,
            }

            flatFare.push({
                ...taxiPricing,
                price: taxiTypePricing[i].flatFarePrice,
                polygonPrice: calculate.priceInPolygon ?? 0,
                onPeakTimePrice,
                delayPrice,
                ...calculate,
                totalPrice: distance > 1
                    ? ((taxiTypePricing[i].flatFarePrice + onPeakTimePrice) * distance) + calculate.priceInPolygon + (delayPrice * calculate.delayDuration)
                    : taxiTypePricing[i].flatFarePrice + onPeakTimePrice + calculate.priceInPolygon + (delayPrice * calculate.delayDuration)
            });

            meter.push({
                ...taxiPricing,
                price: taxiTypePricing[i].meterPrice,
                polygonPrice: calculate.priceInPolygon ?? 0,
                onPeakTimePrice,
                delayPrice,
                ...calculate,
                actualCalculate: distance > 1
                    ? (taxiTypePricing[i].meterPrice * distance) + (0.05 * taxiTypePricing[i].meterPrice * distance)
                    : (taxiTypePricing[i].meterPrice),
                estimatedCalculate: distance > 1
                    ? (taxiTypePricing[i].meterPrice * distance) + (0.10 * taxiTypePricing[i].meterPrice * distance)
                    : (taxiTypePricing[i].meterPrice)
            });
        }

        res.status(200).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: messages.CREATE_SUCCESSFUL.message,
            meter,
            flatFare
        });
    } catch (error) {
        console.log("error: ", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

export const calculateDriverDistanceAndDuration = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { origin, destination } = req.body;

        const calculation = await calculateDriverDistanceAndDurationService(
            origin,
            destination
        );

        if (!calculation) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: `Calculate not found ${messages.NOT_FOUND.message}`,
            });
        }

        res.status(200).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: messages.CREATE_SUCCESSFUL.message,
            calculation,
        });
    } catch (error) {
        console.log("error: ", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

export const driverRateCal = async (callTaxi: any) => {
    try {
        let isInsideBonus = false;

        // Check if registrationSource is "inside"
        if (callTaxi.registrationSource === "inside") {
            // Get round limit from roundLimit model based on country
            const roundLimitData = await roundLimitModel.findOne({ country: callTaxi.country }).sort({ createdAt: -1 });

            if (!roundLimitData) {
                return {
                    calculatedPrice: 0,
                    driverRate: 0,
                    code: messages.ROUND_LIMIT_NOT_FOUND.code,
                    message: messages.ROUND_LIMIT_NOT_FOUND.message
                };
            }

            const requiredTransactions = roundLimitData.round;

            // Get current date for monthly transaction check
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            // Count driver's transactions in current month (only Success and Paid status)
            const driverTransactionCount = await CallTaxi.countDocuments({
                driverId: callTaxi.driverId,
                createdAt: {
                    $gte: startOfMonth,
                    $lte: endOfMonth
                },
                status: { $in: ["Paid"] } // Only count Paid transactions
            });

            // If driver has less than required transactions, return zero values
            if (driverTransactionCount > requiredTransactions) {
                isInsideBonus = true
            }
        }

        // Fetch the driverRate based on the taxiType
        // if country code find by country code also
        const driverRates = await driverRateModel.findOne({
            minDistance: { $lte: callTaxi.totalDistance },
            maxDistance: { $gte: callTaxi.totalDistance },
            countryCode: callTaxi?.countryCode,
            registrationSource: callTaxi?.registrationSource
        });

        if (driverRates) {
            const calculatedPrice = (driverRates?.percentage / 100) * callTaxi.totalPrice;
            const calculatedPlatformPrice = callTaxi.totalPrice - calculatedPrice

            // Return the calculated price and the corresponding driver rate
            return {
                calculatedPrice,
                driverRate: driverRates?.percentage,
                isInsideBonus,
                calculatedPlatformPrice
            };
        }

        return { message: "No driver rates found for this taxi type." };
    } catch (error) {
        console.log("error: ", error)
    }
}