import { Request, Response } from "express"
import { messages } from "../../config";
import { calculateUserDistanceAndDurationService } from "../../services/calculation";

interface Calculation {
    distanceInPolygon: number;
    durationInPolygon: number;
    normalDuration: number;
    delayDuration: number;
    delayDistance: number;
    totalDuration: number;
    totalDistance: number;
}

export const calculateUserDistanceAndDuration = async (req: Request, res: Response) => {
    try {
        const { origin, destination } = req.body

        // Demo car type
        const carType = [
            {
                image: "",
                id: "001",
                carType: "suv",
                price: 5 // Per kilometer
            },
            {
                id: "002",
                image: "",
                carType: "car",
                price: 6 // Per kilometer
            },
            {
                id: "003",
                image: "",
                carType: "mini truck",
                price: 7 // Per kilometer
            },
        ]

        if (!carType) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: `Car Type ${messages.NOT_FOUND.message}`,
            });
        }

        // Calculate distance and duration
        const calculate: Calculation = await calculateUserDistanceAndDurationService(origin, destination)

        if (!calculate) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: `Calculate not found ${messages.NOT_FOUND.message}`,
            });
        }

        const calculation = []

        const delayPrice = 7
        const priceInPolygonPerKm = 7

        for (let i = 0; i < carType.length; i++) {
            calculation.push(
                {
                    id: carType[i].id,
                    image: carType[i].image,
                    cartType: carType[i].carType,
                    ...calculate,
                    totalPrice: (carType[i].price * calculate.totalDistance) + (priceInPolygonPerKm * calculate.distanceInPolygon) + (delayPrice * calculate.delayDuration),
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