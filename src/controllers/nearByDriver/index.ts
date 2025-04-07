import { Request, Response } from "express";
import { messages } from "../../config";
import { getNearbyDriversService } from "../../services/nearByDriver";

export const getNearbyDrivers = async (req: Request, res: Response) => {
    try {
        const { longitude, latitude } = req.query

        const longitudeToNumber = parseFloat(longitude as string)
        const latitudeToNumber = parseFloat(latitude as string)

        const nearbyDrivers = await getNearbyDriversService({
            longitude: longitudeToNumber,
            latitude: latitudeToNumber
        })

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Drivers fetched successfully",
            drivers: nearbyDrivers,
        });
    } catch (error) {
        console.log("Error: ", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};