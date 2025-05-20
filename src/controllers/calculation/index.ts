import { Request, Response } from "express";
import { messages } from "../../config";
import {
    calculateDriverDistanceAndDurationService,
    calculateUserDistanceAndDurationService,
} from "../../services/calculation";
import taxiTypePricingModel from "../../models/taxiTypePricing";
import { getOnPeakTimeService } from "../../services/onPeakTime";

export const calculateUserDistanceAndDuration = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { origin, destination } = req.body;

        // Calculate distance and duration
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

        // find taxi type pricing base on distance
        const distance = calculate.totalDistance;

        const taxiTypePricing = await taxiTypePricingModel.aggregate([
            {
                $match: {
                    minDistance: { $lte: distance },
                    maxDistance: { $gt: distance },
                },
            },
            {
                $lookup: {
                    from: 'taxitypes', // name of the referenced collection
                    localField: 'taxiTypeId',
                    foreignField: '_id',
                    as: 'taxiType',
                },
            },
            {
                $unwind: '$taxiType', // optional: flatten the array
            },
        ]);

        const calculation: any = [];

        let delayPrice = 0;

        // Calculate peak time
        const onPeakTime = await getOnPeakTimeService(req.headers.authorization as string)
        const onPeakTimePrice = onPeakTime.credit ?? 0
        const calculatePeakTimePrice = onPeakTimePrice + distance

        for (let i = 0; i < taxiTypePricing.length; i++) {
            calculation.push({
                id: taxiTypePricing[i].taxiType._id,
                image: taxiTypePricing[i].taxiType.icon,
                cartType: taxiTypePricing[i].taxiType.name,
                seats: taxiTypePricing[i].taxiType.seats,
                ...calculate,
                totalPrice: Math.ceil(
                    taxiTypePricing[i].price * distance +
                    calculatePeakTimePrice +
                    calculate.priceInPolygon +
                    delayPrice * calculate.delayDuration
                ),
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
