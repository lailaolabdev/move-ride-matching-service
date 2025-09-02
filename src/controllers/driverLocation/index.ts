import { Request, Response } from "express";
import { updateDriverLocationService } from "../../services/driverLocation";
import { messages } from "../../config";
import axios from "axios";
import { ratingModel } from "../../models/rating";
import { CallTaxi } from "../../models/callTaxi";
import { createClaimMoney } from "../../services/claimMoney";
import driverCashModel from "../../models/driverCash";
import { cashLimitModel } from "../../models/cashLimit";

export const updateDriverLocation = async (req: Request, res: Response) => {
  try {
    const driverId = (req as any).user.id;
    const token = req.headers.authorization

    const { longitude, latitude, isOnline } = req.body

    // step 1: update driver location method and check driver's data 
    const user = await axios.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${driverId}`);
    const userData = user?.data?.user

    if (!userData) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: `User with this id: ${driverId} not found`,
      });

      return;
    }

    if (userData?.status === "BLOCKED") {
      await updateDriverLocationService({
        driverId,
        longitude,
        latitude,
      });

      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: "Your account has been blocked. Please contact support for more information.",
      });

      return;
    }

    if (userData?.role !== "DRIVER") {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: "You are not a driver",
      });

      return;
    }

    // If driver cash is limited, we will not allow to update driver location
    const driverCash = await driverCashModel.findOne({ driver: driverId });
    const cashLimit = await cashLimitModel.findOne({ countryCode: userData?.country?.code });

    if (driverCash && cashLimit && driverCash.amount > cashLimit.amount) {
      await updateDriverLocationService({ driverId });

      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: messages.BAD_REQUEST.message,
        detail: "Your cash limit has been reached. Please contact support for more information.",
      });

      return;
    }

    let numberOfRating = 0

    if (isOnline === "online") {
      // step 2: check is there rating exist
      const rating = await ratingModel.findOne({ userId: driverId })

      // step 3: if rating does not exist create a new one
      if (!rating && driverId) {
        // Sun rating from order that matched driver
        const sumRating = await CallTaxi.aggregate([
          {
            $match: {
              driverId,
              "passengerComplain.rating": { $exists: true, $ne: null }
            }
          },
          {
            $group: {
              _id: "$driverId",
              averageRating: { $avg: "$passengerComplain.rating" },
              totalRatings: { $sum: 1 }
            }
          }
        ]);

        numberOfRating = sumRating[0]?.averageRating || 0

        await ratingModel.create({ userId: driverId, rating: numberOfRating })
      } else {
        numberOfRating = rating?.rating || 0
      }
    }

    let taxiTypeId: string = "";

    if (typeof userData?.taxiType === "string") {
      const match = userData.taxiType.match(/ObjectId\('(.+?)'\)/);
      if (match) {
        taxiTypeId = match[1];
      } else {
        try {
          // try to parse JSON
          const parsed = JSON.parse(userData.taxiType);
          taxiTypeId = parsed._id || "";
        } catch {
          taxiTypeId = userData.taxiType; // fallback
        }
      }
    } else if (typeof userData?.taxiType === "object" && userData?.taxiType?._id) {
      taxiTypeId = userData.taxiType._id;
    }

    // step 5: Update driver location from socket
    await updateDriverLocationService({
      driverId,
      longitude,
      latitude,
      isOnline,
      registrationSource: userData?.registrationSource,
      rating: numberOfRating || 0,
      taxiType: taxiTypeId
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
