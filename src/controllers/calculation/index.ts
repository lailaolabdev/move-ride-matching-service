import { Request, Response } from "express";
import { messages } from "../../config";
import { calculateDriverDistanceAndDurationService, calculateUserDistanceAndDurationService } from "../../services/calculation";
import { getOnPeakTimeService } from "../../services/onPeakTime";
import { getTaxiPricingDistance } from "../../services/taxiTypePricing";
import { driverRateModel } from "../../models/driverRate";

export const calculateUserDistanceAndDuration = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const {
            origin,
            destination,
            country
        } = req.body;

        // Calculation method:
        // step 1 : Calculate distance and duration from google map
        const calculate = await calculateUserDistanceAndDurationService(
            origin,
            destination
        );

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

        const taxiTypePricing: any = await getTaxiPricingDistance({
            country,
            distance
        }) ?? []

        const meter: any = [];
        const flatFare: any = [];
        let delayPrice = 10;

        // step 3 : find peak time base on distance
        const onPeakTime = await getOnPeakTimeService(req.headers.authorization as string, country)
        const onPeakTimePrice = onPeakTime.credit ?? 0

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
                totalPrice: Math.ceil(
                    (taxiTypePricing[i].flatFarePrice + onPeakTimePrice) * distance +
                    calculate.priceInPolygon +
                    delayPrice * calculate.delayDuration
                ),
            });

            meter.push({
                ...taxiPricing,
                price: taxiTypePricing[i].meterPrice,
                polygonPrice: calculate.priceInPolygon ?? 0,
                onPeakTimePrice,
                delayPrice,
                ...calculate,
                actualCalculate: Math.ceil(
                    (taxiTypePricing[i].meterPrice + onPeakTimePrice) * distance +
                    calculate.priceInPolygon +
                    delayPrice * calculate.delayDuration
                ),
                estimatedCalculate: Math.ceil(
                    (taxiTypePricing[i].meterPrice + onPeakTimePrice) * distance +
                    calculate.priceInPolygon +
                    delayPrice * calculate.delayDuration +
                    30
                ),
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
        // Fetch the driverRate based on the taxiType
        const driverRates = await driverRateModel.find({
            taxiType: callTaxi.carTypeId, // Assuming carTypeId matches taxiType in driverRate
        });

        if (driverRates.length === 0) {
            return {
                message: "No driver rates found for this taxi type."
            };
        }

        for (const rate of driverRates) {
            // Check if the totalDistance is within the range of minDistance and maxDistance
            if (
                callTaxi.totalDistance >= rate.minDistance &&
                callTaxi.totalDistance <= rate.maxDistance
            ) {
                // Calculate the total price based on the percentage
                const calculatedPrice = (rate.percentage / 100) * callTaxi.totalPrice;

                // Return the calculated price and the corresponding driver rate
                return {
                    calculatedPrice,
                    driverRate: rate,
                };
            }
        }

    } catch (error) {
        console.log("error: ", error)
    }
}