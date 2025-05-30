import { Request, Response } from "express";
import { updateDriverLocationService } from "../../services/driverLocation";
import { messages } from "../../config";
import axios from "axios";

export const updateDriverLocation = async (req: Request, res: Response) => {
  try {
    const driverId = (req as any).user.id;
    const { longitude, latitude, isOnline, registrationSource } = req.body

    const user = await axios.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${driverId}`);
    const userData = user?.data?.user

    if (!userData || userData.status === "BLOCKED") {
      res.status(200).json({
        code: messages.BAD_REQUEST.code,
        message: "Your account has been blocked. Please contact support for more information.",
      });

      return;
    }

    await updateDriverLocationService({
      driverId,
      longitude,
      latitude,
      isOnline,
      registrationSource
    });

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
