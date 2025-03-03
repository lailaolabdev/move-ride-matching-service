import { Request, Response } from "express"
import { messages } from "../../config";
import { calculateUserDistanceAndDurationService } from "../../services/calculation";
import taxiTypeModel from "../../models/taxiType";

export const calculateUserDistanceAndDuration = async (req: Request, res: Response): Promise<any> => {
    try {
        const { origin, destination } = req.body

        const taxiTypes = await taxiTypeModel.find();

        if (!taxiTypes.length) {
            return res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: `Taxi not available`,
            });
        }

        // Calculate distance and duration
        const calculate = await calculateUserDistanceAndDurationService(origin, destination)

        if (!calculate) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: `Calculate not found ${messages.NOT_FOUND.message}`,
            });
        }

        const calculation: any = []

        const delayPrice = 7
        const priceInPolygonPerKm = 7

        for (let i = 0; i < taxiTypes.length; i++) {
            calculation.push(
                {
                    id: taxiTypes[i]._id,
                    image: taxiTypes[i].icon,
                    cartType: taxiTypes[i].name,
                    seats: taxiTypes[i].seats,
                    ...calculate,
                    totalPrice: Math.ceil((taxiTypes[i].price * calculate.totalDistance) + (priceInPolygonPerKm * calculate.distanceInPolygon) + (delayPrice * calculate.delayDuration)),
                }
            )
        }

        res.status(200).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: messages.CREATE_SUCCESSFUL.message,
            calculation
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