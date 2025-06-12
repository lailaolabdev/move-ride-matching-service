import type { Request, Response } from "express";
import { messages } from "../../config";
import {
  createCallTaxiService,
  getDriverCallTaxisService,
  getUserCallTaxisService,
  updateCallTaxiService,
  driverUpdateStatusService,
  getTotalRideService,
  getTotalDistanceService,
  getTheLastRideService,
  getHistoryRideService,
  getCommentAndRatingService,
  updateChatCallTaxiService,
  updateStarAndCommentService,
  callTaxiTotalPriceReportService,
  travelHistoryService,
  cancelTravelHistoryService,
  getTotaltravelTimeService,
  getTotalmeterService,
  getTotalFlatFareService,
  createDriverComplainPassengerService,
  createPassengerComplainDriverService,
  getPassengerComplainDriverByIdService,
  sentDataToDriverSocket,
} from "../../services/callTaxi";
import { CallTaxi, REQUEST_TYPE, STATUS } from "../../models/callTaxi";
import axios from "axios";
import { getDriver, getPassenger, pipeline } from "./helper";
import taxiModel from "../../models/taxi";
import { ratingModel } from "../../models/rating";
import vehicleDriverModel from "../../models/vehicleDriver";
import { redis } from "../../config/redis/redis";

export const createCallTaxi = async (req: Request, res: Response) => {
  try {
    const passengerId = (req as any).user.id;

    // // If production deployed uncomment this
    // const isCallTaxiExist = await getCallTaxisService(req)

    // if (isCallTaxiExist) {
    //     res.status(400).json({
    //         code: messages.BAD_REQUEST.code,
    //         message: messages.BAD_REQUEST.message,
    //         detail: "A taxi request is already in progress"
    //     });

    //     return
    // }

    // Fetch user data
    const passenger = await getPassenger(req, res);

    if (!passenger) {
      res.status(404).json({
        ...messages.NOT_FOUND,
        detail: `Driver id: ${passengerId} not found`,
      });

      return;
    }

    const callTaxi: any = await createCallTaxiService(req);

    if (!callTaxi) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: messages.BAD_REQUEST.message,
      });

      return;
    }

    // Emit socket
    const token = req.headers["authorization"];

    const data = {
      fullName: passenger?.fullName ?? "",
      profileImage: passenger?.profileImage ?? "",
      ...callTaxi,
    };

    await sentDataToDriverSocket(token!, data);

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: messages.CREATE_SUCCESSFUL.message,
      callTaxi: { ...data },
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

export const getCallTaxiById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const callTaxi = await CallTaxi.findById(id).lean();

    if (callTaxi?.driverId) {
      const vehicleDriver = await vehicleDriverModel.aggregate([
        {
          $match: {
            driver: callTaxi?.driverId
          },
        },
        {
          $addFields: {
            vehicleModelObjectId: {
              $cond: {
                if: { $eq: [{ $type: "$vehicleModel" }, "string"] },
                then: { $toObjectId: "$vehicleModel" },
                else: "$vehicleModel"
              }
            },
            vehicleBrandObjectId: {
              $cond: {
                if: { $eq: [{ $type: "$vehicleBrand" }, "string"] },
                then: { $toObjectId: "$vehicleBrand" },
                else: "$vehicleBrand"
              }
            }
          }
        },
        {
          $lookup: {
            from: 'vehiclemodels',
            localField: 'vehicleModelObjectId',
            foreignField: '_id',
            as: 'vehicleModel'
          }
        },
        {
          $unwind: {
            path: '$vehicleModel',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'vehiclebrands',
            localField: 'vehicleBrandObjectId',
            foreignField: '_id',
            as: 'vehicleBrand'
          }
        },
        {
          $unwind: {
            path: '$vehicleBrand',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 0,
            licensePlate: 1,
            vehicleModelName: '$vehicleModel.name',
            vehicleBrandName: '$vehicleBrand.name'
          }
        }
      ]);

      res.status(200).json({
        ...messages.SUCCESSFULLY,
        callTaxi: {
          ...callTaxi,
          licensePlate: vehicleDriver[0].licensePlate,
          vehicleModelName: vehicleDriver[0].vehicleModelName,
          vehicleBrandName: vehicleDriver[0].vehicleBrandName
        },
      });

      return
    }

    res.status(200).json({
      ...messages.SUCCESSFULLY,
      callTaxi,
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

// Get all calling taxi
export const getCallTaxis = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      startDate,
      endDate,
      minPrice,
      maxPrice,
      minTotalDistance,
      maxTotalDistance,
      search,
    }: any = req.query;

    const match: any = {};

    // find start and date
    if (startDate && endDate) {
      match.createdAt = {
        $gte: new Date(startDate.toString()),
        $lte: new Date(endDate.toString()),
      };
    }

    // find min and max Price
    if (minPrice && maxPrice) {
      match.totalPrice = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      };
    }

    // find min and max distance
    if (minTotalDistance && maxTotalDistance) {
      match.totalDuration = {
        $gte: Number(minTotalDistance),
        $lte: Number(maxTotalDistance),
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const callTaxi = await CallTaxi.aggregate([
      { $match: match },

      // Lookup passenger
      {
        $lookup: {
          from: "users",
          let: { passengerId: { $toObjectId: "$passengerId" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$passengerId"] } } }],
          as: "passengerDetails",
        },
      },
      {
        $unwind: {
          path: "$passengerDetails",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Lookup driver
      {
        $lookup: {
          from: "users",
          let: { driverId: { $toObjectId: "$driverId" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$driverId"] } } }],
          as: "driverDetails",
        },
      },
      { $unwind: { path: "$driverDetails", preserveNullAndEmptyArrays: true } },

      // Search filter
      ...(search
        ? [
          {
            $match: {
              $or: [
                {
                  "passengerDetails.fullName": {
                    $regex: search.toString(),
                    $options: "i",
                  },
                },
                {
                  "driverDetails.fullName": {
                    $regex: search.toString(),
                    $options: "i",
                  },
                },
              ],
            },
          },
        ]
        : []),

      { $skip: skip },
      { $limit: parseInt(limit) },

      // Final projection
      {
        $project: {
          _id: 1,
          billNumber: 1,
          passengerId: "$passengerDetails._id",
          passengerFullname: "$passengerDetails.fullName",
          driverId: "$driverDetails._id",
          driverFullname: "$driverDetails.fullName",
          originName: 1,
          destinationName: 1,
          totalDistance: 1,
          totalDuration: 1,
          totalPrice: 1,
          status: 1,
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json({
      ...messages.SUCCESSFULLY,
      callTaxi,
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

export const checkCallTaxiStatus = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user.id;

    const user = await axios.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${id}`);
    const userData = user?.data?.user

    if (!userData) {
      res.status(404).json({
        ...messages.NOT_FOUND,
        detail: "User not found"
      })
      return
    }

    let filter: any = {
      status: {
        $in: [
          STATUS.REQUESTING,
          STATUS.NO_RECEIVED,
          STATUS.DRIVER_RECEIVED,
          STATUS.DRIVER_ARRIVED,
          STATUS.DEPARTURE
        ]
      }
    }

    if (userData.role === "CUSTOMER") filter.passengerId = userData._id
    if (userData.role === "DRIVER") filter.driverId = userData._id

    const callTaxi = await CallTaxi.findOne(filter).lean()

    res.status(200).json({ ...messages.SUCCESSFULLY, ...callTaxi })
  } catch (error) {
    console.log("error: ", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
}

export const getUserCallTaxis = async (req: Request, res: Response) => {
  try {
    const callTaxis = await getUserCallTaxisService(req);

    // must check passenger first

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      callTaxis,
    });
  } catch (error) {
    console.error("Error fetching tax info:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const createDriverComplain = async (req: Request, res: Response) => {
  try {
    const created = await createDriverComplainPassengerService(req);

    if (created) {
      const sumRating = await CallTaxi.aggregate([
        {
          $match: {
            passengerId: created?.passengerId,
            "driverComplain.rating": { $exists: true, $ne: null }
          }
        },
        {
          $group: {
            _id: "$passengerId",
            averageRating: { $avg: "$driverComplain.rating" },
            totalRatings: { $sum: 1 }
          }
        }
      ]);

      if (sumRating.length) {
        const id = sumRating[0]?._id
        const averageRating = sumRating[0]?.averageRating

        await ratingModel.findByIdAndUpdate(
          id,
          { rating: averageRating }
        )
      }
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      data: created,
    });
  } catch (error) {
    console.error("Error fetching tax info:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const createPassengerComplain = async (req: Request, res: Response) => {
  try {
    const created = await createPassengerComplainDriverService(req);

    if (created) {
      const sumRating = await CallTaxi.aggregate([
        {
          $match: {
            driverId: created?.driverId,
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

      if (sumRating.length) {
        const id = sumRating[0]?._id
        const averageRating = sumRating[0]?.averageRating

        await ratingModel.findByIdAndUpdate(
          id,
          { rating: averageRating }
        )
      }
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      data: created,
    });
  } catch (error) {
    console.error("Error fetching tax info:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const getPassengerComplainById = async (req: Request, res: Response) => {
  try {
    const complain = await getPassengerComplainDriverByIdService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      data: complain,
    });
  } catch (error) {
    console.error("Error fetching tax info:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const getDriverCallTaxis = async (req: Request, res: Response) => {
  try {
    const callTaxis = await getDriverCallTaxisService(req);

    // must check rider first

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      callTaxis,
    });
  } catch (error) {
    console.error("Error fetching tax info:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const updateCallTaxis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const callTaxi = await CallTaxi.findById(id);

    if (!callTaxi) {
      res.status(400).json({
        ...messages.NOT_FOUND,
        detail: `Ride matching with id:${id} not found`,
      });

      return;
    }

    // if status from order not equal to "Requesting" and "Accepted"
    // cannot cancel the order
    // Requesting means while passenger is calling for an order 
    // Accepted means driver is going to pick passenger
    if (status && status === STATUS.CANCELED) {
      if (
        callTaxi.status !== STATUS.REQUESTING &&
        callTaxi.status !== STATUS.DRIVER_RECEIVED
      ) {
        res.status(400).json({
          code: messages.BAD_REQUEST.code,
          messages: messages.BAD_REQUEST.message,
          detail: "Cannot cancel this order",
        });

        return;
      } else {
        // if status is match update order status to canceled
        const updated: any = await updateCallTaxiService(req);

        if (updated) {
          await axios.post(
            `${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/cancel`,
            callTaxi,
            {
              headers: {
                Authorization: req.headers['authorization']
              }
            }
          );

          res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            messages: messages.SUCCESSFULLY.message,
            data: updated,
          });

          return;
        }
      }
    }

    const updated = await updateCallTaxiService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      data: updated,
    });
  } catch (error) {
    console.error("Error fetching tax info:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const driverUpdateStatus = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { id } = req.params;

    // Check is driver exist or not
    const driverData = await getDriver(req, res);

    if (!driverData || !driverData?.data) {
      res.status(404).json({
        ...messages.NOT_FOUND,
        detail: `Driver id: ${user.id} not found`,
      });

      return;
    }

    // Check is driver
    if (driverData?.data?.user?.role !== "DRIVER") {
      res.status(400).json({
        ...messages.BAD_REQUEST,
        detail: "You are not a driver",
      });

      return;
    }

    const taxi = await taxiModel.findById(driverData?.data?.user?.taxi);

    const driver = {
      image: driverData?.data?.user?.profileImage,
      fullName: driverData?.data?.user?.fullName,
      licensePlate: driverData?.data?.user?.licensePlate,
      vehicleBrandName: taxi?.vehicleBrandName,
      vehicleModelName: taxi?.vehicleModelName,
    };

    // Checking calling taxi
    const callTaxi = await CallTaxi.findById(id);

    if (!callTaxi) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "This ride request was taken",
      });

      return;
    }

    // Update status
    let status: String = "";

    if (!callTaxi.driverId) {
      // driver confirm ride request
      if (callTaxi.status === STATUS.REQUESTING)
        status = STATUS.DRIVER_RECEIVED;
    }

    if (callTaxi && callTaxi.driverId === user.id) {
      // driver arrived to passenger
      if (callTaxi.status === STATUS.DRIVER_RECEIVED)
        status = STATUS.DRIVER_ARRIVED;
      else if (callTaxi.status === STATUS.DRIVER_ARRIVED)
        status = STATUS.PICKED_UP;
      else if (callTaxi.status === STATUS.PICKED_UP)
        status = STATUS.DEPARTURE;
      else if (callTaxi.status === STATUS.DEPARTURE)
        status = STATUS.SEND_SUCCESS;
      else if (callTaxi.status === STATUS.SEND_SUCCESS) {
        res.status(200).json({
          code: messages.SUCCESSFULLY.code,
          messages: messages.SUCCESSFULLY.message,
        });

        return;
      } else {
        res.status(400).json({
          code: messages.BAD_REQUEST.code,
          messages: "Status not found",
        });

        return;
      }
    }

    // Confirmed order
    const confirmed = await driverUpdateStatusService(req, status);

    if (!confirmed) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: messages.NOT_FOUND.message,
      });

      return;
    }

    if (status === STATUS.DRIVER_RECEIVED) {
      // Delete ride matching order 
      // from other when once accepted
      await axios.delete(
        `${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/remove/${confirmed?._id}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );

      // And then save an order to redis 
      // for calculating meter pricing
      if (confirmed.requestType === REQUEST_TYPE.METERED_FARE) {
        await axios.post(
          `${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/remove/${confirmed?._id}`,
          confirmed
        );
      }
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      confirmed: {
        _id: confirmed?._id,
        passengerId: confirmed?.passengerId,
        requestType: confirmed?.requestType,
        status: confirmed?.status,
        driver,
      },
    });
  } catch (error) {
    console.error("Error fetching tax info:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// report total ride
export const gettotalRide = async (req: Request, res: Response) => {
  try {
    const totalRide = await getTotalRideService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      ...totalRide,
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// report total totalDistance
export const getTotalDistance = async (req: Request, res: Response) => {
  try {
    const totalDistance = await getTotalDistanceService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      ...totalDistance,
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// report total the last ride
export const getThelastRide = async (req: Request, res: Response) => {
  try {
    const lastRide = await getTheLastRideService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      ...lastRide,
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// report ride history
export const getRideHistory = async (req: Request, res: Response) => {
  try {
    const travelHistory = await getHistoryRideService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      travelHistory,
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// Call the service function to calculate the total price of the taxi
export const callTaxiTotalPrice = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    // Create pipeline
    const pipeneMongo = pipeline({
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });
    // Call the  service function
    const totalPrice = await callTaxiTotalPriceReportService(pipeneMongo);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: messages.SUCCESSFULLY.message,
      totalPrice: totalPrice,
    });
  } catch (error) {
    console.error("Error fetching tax info:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const updateStartAndComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    if (rating > 5) {
      return res.status(400).json({
        code: messages.BAD_REQUEST.code,
        messages: messages.BAD_GATEWAY.message,
        detail:
          "The rating must not exceed 5. Please provide a value between 1 and 5.",
      });
    }
    await updateStarAndCommentService(id, rating, comment);
    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const chatCallTaxi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let { message } = req.body;

    const chatId = (req as any).user.id;

    const chatData = [
      {
        id: chatId,
        message: message,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const data = await updateChatCallTaxiService(id, chatData);
    // const data=  await updateChatCallTaxiService(id, chat);
    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const getComentAndRating = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getCommentAndRatingService(id);
    // const data=  await updateChatCallTaxiService(id, chat);
    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// report ride history
export const travelHistoryHistory = async (req: Request, res: Response) => {
  try {
    const travelHistory = await travelHistoryService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      travelHistory,
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const cancelTravelHistoryHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const travelHistory = await cancelTravelHistoryService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      travelHistory,
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// total travel time
export const gettotalTravelTime = async (req: Request, res: Response) => {
  try {
    const totalTravelTime = await getTotaltravelTimeService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      ...totalTravelTime,
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// get total travel request type meter
export const getTotalMeterTime = async (req: Request, res: Response) => {
  try {
    const totalMeterTime = await getTotalmeterService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      ...totalMeterTime,
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// get total travel request type meter
export const getTotalFlatFareTime = async (req: Request, res: Response) => {
  try {
    const totalFlatFare = await getTotalFlatFareService(req);
    console.log(totalFlatFare);
    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      ...totalFlatFare,
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};