import { Request, Response } from "express";
import { updateDriverLocationService } from "../../services/driverLocation";
import { messages } from "../../config";

export const updateDriverLocation = async (req: Request, res: Response) => {
  try {
    await updateDriverLocationService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Driver location updated successfully",
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
