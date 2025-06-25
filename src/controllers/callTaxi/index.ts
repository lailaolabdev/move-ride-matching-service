import type { Request, Response } from "express";
import { messages } from "../../config";
import {
  createCallTaxiService,
  getDriverCallTaxisService,
  getUserCallTaxisService,
  updateCallTaxiService,
  driverUpdateStatusService,
  getTotalRideService,
  getHistoryRideService,
  callTaxiTotalPriceReportService,
  createDriverComplainPassengerService,
  createPassengerComplainDriverService,
  getPassengerComplainDriverByIdService,
  sentDataToDriverSocket,
  getRideHistoryDetailByIdService,
  getCallTaxisService,
  getDriverRideHistoryDetailByIdService,
  getTotalDistanceService,
  getTheLastRideService,
  getNumberOfCallingTaxiService,
  travelHistoryService,
  getPassengerCommentAndRatingService,
  getTotalDriverIncomeService,
  getTotalDriverIncomeServiceThatWasNotClaim,
  getDriverPaymentDetailService,
  getDriverCommentAndRatingService,
} from "../../services/callTaxi";
import { CallTaxi, REQUEST_TYPE, STATUS } from "../../models/callTaxi";
import axios from "axios";
import { getCountry, getDriver, getPassenger, pipeline } from "./helper";
import taxiModel from "../../models/taxi";
import { ratingModel } from "../../models/rating";
import vehicleDriverModel from "../../models/vehicleDriver";
import { Types } from "mongoose";
import { driverRateCal } from "../calculation";
import { createClaimMoney, getClaimMoney, updateClaimMoney } from "../../services/claimMoney";

export const createCallTaxi = async (req: Request, res: Response) => {
  try {
    const passengerId = (req as any).user.id;

    // If production deployed uncomment this
    const isCallTaxiExist = await getCallTaxisService(req)

    if (isCallTaxiExist) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: messages.BAD_REQUEST.message,
        detail: "Yor are in a processing"
      });

      return
    }

    // Fetch user data
    const passenger = await getPassenger(req, res);

    if (!passenger) {
      res.status(404).json({
        ...messages.NOT_FOUND,
        detail: `Driver id: ${passengerId} not found`,
      });

      return;
    }

    // Find country id
    const country: any = await getCountry(
      req.body.country,
      req.headers.authorization!
    )

    if (!country) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: messages.BAD_REQUEST.message,
      });

      return;
    } else {
      req.body.currency = country?.currency
      req.body.country = country?._id
      req.body.countryCode = country?.code
    }

    // Create call taxi
    const callTaxi: any = await createCallTaxiService({
      req,
      passengerFullName: passenger?.fullName,
      passengerPhoneNumber: passenger?.phone
    });

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
      callTaxi: data
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

    const callTaxi = await CallTaxi.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) }
      },

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

      {
        $project: {
          "_id": 1,
          "passengerId": 1,
          "carTypeId": 1,
          "origin": 1,
          "destination": 1,
          "originName": 1,
          "destinationName": 1,
          "requestType": 1,
          "distanceInPolygon": 1,
          "durationInPolygon": 1,
          "normalDuration": 1,
          "delayDuration": 1,
          "delayDistance": 1,
          "totalDuration": 1,
          "totalDistance": 1,
          "totalPrice": 1,
          "status": 1,
          "price": 1,
          "polygonPrice": 1,
          "onPeakTimePrice": 1,
          "delayPrice": 1,
          "createdAt": 1,
          "updatedAt": 1,
          "driverId": 1,
          "country": 1,
          "countryCode": 1,
          "driverComplain": 1,
          "passengerComplain": 1,
          "driverDetails._id": 1,
          "driverDetails.profileImage": 1,
          "driverDetails.fullName": 1,
          "driverDetails.phone": 1,
          "driverDetails.email": 1,
          "passengerDetails._id": 1,
          "passengerDetails.profileImage": 1,
          "passengerDetails.fullName": 1,
          "passengerDetails.phone": 1,
          "passengerDetails.email": 1,
          "registrationSource": 1,
        }
      }
    ]);

    if (callTaxi[0]?.driverDetails) {
      const vehicleDriver = await vehicleDriverModel.aggregate([
        {
          $match: {
            driver: callTaxi[0]?.driverId
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

      callTaxi[0].driverDetails.licensePlate = vehicleDriver[0].licensePlate
      callTaxi[0].driverDetails.vehicleModelName = vehicleDriver[0].vehicleModelName
      callTaxi[0].driverDetails.vehicleBrandName = vehicleDriver[0].vehicleBrandName

      res.status(200).json({
        ...messages.SUCCESSFULLY,
        ...callTaxi[0],
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
      skip = 1,
      limit = 10,
      startDate,
      endDate,
      minPrice,
      maxPrice,
      minTotalDistance,
      maxTotalDistance,
      search,
      claimMoney,
      country
    }: any = req.query;

    const match: any = {};

    if (claimMoney) match.claimMoney = claimMoney

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
    if (country) {
      match.country = country;
    }

    const parseSkip = parseInt(skip as string, 10);

    console.log("match: ", match);
    const total = await CallTaxi.countDocuments(match)
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

      { $sort: { createdAt: -1 } },
      { $skip: parseSkip },
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
          registrationSource: 1,
          driverIncome: 1
        },
      },
    ]);

    res.status(200).json({
      ...messages.SUCCESSFULLY,
      total,
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
          STATUS.DRIVER_RECEIVED,
          STATUS.DRIVER_ARRIVED,
          STATUS.PICKED_UP,
          STATUS.DEPARTURE,
          STATUS.SEND_SUCCESS
        ]
      }
    }

    if (userData.role === "CUSTOMER") filter.passengerId = userData._id
    if (userData.role === "DRIVER") filter.driverId = userData._id

    // if access by customer role we will query driver's vehicle data
    const callTaxi = await CallTaxi.aggregate([
      {
        $match: filter
      },
      {
        $lookup: {
          from: "users",
          let: { driverId: { $toObjectId: "$driverId" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$driverId"] }
              }
            }
          ],
          as: "driver",
        },
      },
      {
        $unwind: {
          path: "$driver",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          let: { passengerId: { $toObjectId: "$passengerId" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$passengerId"] }
              }
            }
          ],
          as: "passenger",
        },
      },
      {
        $unwind: {
          path: "$passenger",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          requestType: 1,
          origin: 1,
          destination: 1,
          originName: 1,
          destinationName: 1,
          totalPrice: 1,
          status: 1,
          "passenger._id": 1,
          "passenger.fullName": 1,
          "passenger.profileImage": 1,
          "driver._id": 1,
          "driver.fullName": 1,
          "driver.profileImage": 1,
          "driver.licensePlate": 1
        }
      }
    ])


    if (callTaxi.length && filter.passengerId) {
      const aggregateVehicleDriver = await vehicleDriverModel.aggregate([
        {
          $match: {
            driver: callTaxi[0]?.driver?._id.toString()
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

      callTaxi[0].driver.vehicleModelName = aggregateVehicleDriver[0].vehicleModelName
      callTaxi[0].driver.vehicleBrandName = aggregateVehicleDriver[0].vehicleBrandName
    }

    res.status(200).json({
      ...messages.SUCCESSFULLY,
      callTaxi: callTaxi.length ? callTaxi[0] : {}
    })
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
            _id: "$driverId",
            averageRating: { $avg: "$driverComplain.rating" },
            totalRatings: { $sum: 1 }
          }
        }
      ]);

      if (sumRating.length) {
        const id = new Types.ObjectId(sumRating[0]?._id)
        const averageRating = sumRating[0]?.averageRating

        const updatedPassengerRating = await ratingModel.findOneAndUpdate(
          { userId: id },
          { rating: averageRating }
        )

        if (!updatedPassengerRating) {
          await ratingModel.create({
            userId: id,
            rating: averageRating ?? 0
          })
        }
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
            _id: "$passengerId",
            averageRating: { $avg: "$passengerComplain.rating" },
            totalRatings: { $sum: 1 }
          }
        }
      ]);

      if (sumRating.length) {
        const id = new Types.ObjectId(sumRating[0]?._id)
        const averageRating = sumRating[0]?.averageRating

        const updatedPassengerRating = await ratingModel.findOneAndUpdate(
          { userId: id },
          { rating: averageRating }
        )

        if (!updatedPassengerRating) {
          await ratingModel.create({
            userId: id,
            rating: averageRating ?? 0
          })
        }
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
    const {
      type,
      status,
      actualUsedTime,
      claimMoney,
      point,
      paymentMethod,
      promotionPrice,
      promotionPercentage
    } = req.body;
    const token = req.headers.authorization!

    const callTaxi = await CallTaxi.findById(id);

    if (!callTaxi) {
      res.status(400).json({
        ...messages.NOT_FOUND,
        detail: `Ride matching with id:${id} not found`,
      });

      return;
    }

    const isValidStatus = Object.values(STATUS).includes(status);

    if (!isValidStatus) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        messages: messages.BAD_REQUEST.message,
        detail: "Cancel status is incorrect",
      });

      return;
    }

    // if status from order not equal to "Requesting" and "Accepted"
    // cannot cancel the order
    // Requesting means while passenger is calling for an order 
    // Accepted means driver is going to pick passenger
    if (status && status === STATUS.CANCELED) {
      if (
        callTaxi.status === STATUS.DEPARTURE &&
        callTaxi.status === STATUS.SEND_SUCCESS &&
        callTaxi.status === STATUS.PAID &&
        callTaxi.status === STATUS.TIMEOUT
      ) {
        res.status(400).json({
          code: messages.BAD_REQUEST.code,
          messages: messages.BAD_REQUEST.message,
          detail: "Cannot cancel this order",
        });

        return;
      }
    }

    // Update call taxi part
    const updateData: any = {}

    if (type) updateData.type = type
    if (actualUsedTime) updateData.actualUsedTime = actualUsedTime
    if (claimMoney) updateData.claimMoney = claimMoney
    if (point) updateData.point = point
    if (paymentMethod) updateData.paymentMethod = paymentMethod
    if (promotionPrice) updateData.promotionPrice = promotionPrice
    if (promotionPercentage) updateData.promotionPercentage = promotionPercentage

    if (status) {
      // If status is paid add calculatedPrice and driverRate to 
      // calculate driver income
      if (status === STATUS.PAID) {
        const { calculatedPrice, driverRate }: any = await driverRateCal(callTaxi)

        // Calculate price and driver rate
        if (calculatedPrice && driverRate) {
          const claimMoney: any = await getClaimMoney({
            token,
            driverId: callTaxi.driverId!,
            status: "WAITING_TO_CHECK",
          })

          if (claimMoney) {
            const income = claimMoney.income + calculatedPrice

            const updateClaim = await updateClaimMoney({
              token,
              id: claimMoney._id,
              income
            })

            if (updateClaim) updateData.claimMoney = updateClaim._id
          } else {
            const driver = await axios.get(`
                   ${process.env.USER_SERVICE_URL}/v1/api/users/${callTaxi?.driverId}`,
              {
                headers: {
                  Authorization: `${req.headers["authorization"]}`
                }
              }
            );

            const driverId = driver?.data?.user?._id
            const driverRegistrationSource = driver?.data?.user?.registrationSource

            const createClaim = await createClaimMoney({
              token: token as string,
              driverId,
              driverRegistrationSource,
              taxDeducted: 10,
              income: calculatedPrice
            })

            if (createClaim) updateData.claimMoney = createClaim._id
          }

          updateData.driverIncome = calculatedPrice
          updateData.driverRate = driverRate
        }
      }

      updateData.status = status
    }

    const updated: any = await updateCallTaxiService({ id, updateData });

    // if status is canceled notify to driver
    if (updated && updated.status === STATUS.CANCELED) {
      await axios.post(
        `${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/cancel`,
        callTaxi,
        {
          headers: {
            Authorization: req.headers['authorization']
          }
        }
      );
    }

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
    const rating = await ratingModel.findOne({ userId: driverData?.data?.user?._id })

    const driver = {
      id: driverData?.data?.user?._id,
      image: driverData?.data?.user?.profileImage,
      fullName: driverData?.data?.user?.fullName,
      rating: rating?.rating,
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

    if (callTaxi.status === STATUS.CANCELED) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: "Cannot accept this order due to cancel",
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
    const confirmed = await driverUpdateStatusService(
      {
        req,
        status,
        driverRegistrationSource: driverData?.data?.user?.registrationSource,
        driverFullName: driverData?.data?.user?.phone,
        driverPhoneNumber: driverData?.data?.user?.phone,
      }
    );

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
          `${process.env.SOCKET_SERVICE_URL}/v1/api/ride-request-socket/save-order-to-redis`,
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

export const getRideHistoryDetailById = async (req: Request, res: Response) => {
  try {
    const rideHistoryDetail = await getRideHistoryDetailByIdService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      rideHistoryDetail
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
}

export const getDriverRideHistoryDetailById = async (req: Request, res: Response) => {
  try {
    const riderRideHistoryDetail = await getDriverRideHistoryDetailByIdService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      messages: messages.SUCCESSFULLY.message,
      riderRideHistoryDetail
    });
  } catch (error) {
    console.error("Error fetching total ride:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
}

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

// Report passenger in passenger management page in admin dashboard
// All calling taxis
// Summary distance in KM
// Get the last calling
export const reportPassenger = async (req: Request, res: Response) => {
  try {
    const passengerId = req.params.id
    const { status } = req.query

    const filter: any = {
      passengerId,
    }

    if (status) filter.status = status

    const numberOfCallingTaxi = await getNumberOfCallingTaxiService(filter)
    const totalDistance = await getTotalDistanceService(filter)
    const getTheLastRide = await getTheLastRideService(filter)

    res.json({
      ...messages.SUCCESSFULLY,
      reportPassenger: {
        numberOfCallingTaxi,
        totalDistance,
        getTheLastRide
      }
    })
  } catch (error) {
    console.error("Error fetching tax info:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
}

export const travelHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const {
      page = "1",
      limit = "10",
      status,
      startDate,
      endDate,
      isRequestTaxInvoice,
      role = "CUSTOMER"
    } = req.query

    const pageToNumber = parseInt(page as string, 10)
    const limitToNumber = parseInt(limit as string, 10)

    const skip = (pageToNumber - 1) * limitToNumber;

    const filter: any = {}

    if (role === "DRIVER") filter.driverId = userId
    if (role === "CUSTOMER") filter.passengerId = userId
    if (status) filter.status = status
    if (isRequestTaxInvoice) filter.isRequestTaxInvoice = isRequestTaxInvoice
    if (startDate || endDate) {
      const createdAtFilter: any = {};

      if (startDate) {
        const startLao = new Date(startDate as string);
        // Convert to UTC by subtracting 7 hours immediately
        startLao.setHours(startLao.getHours() - 7);
        startLao.setMinutes(0);
        startLao.setSeconds(0);
        startLao.setMilliseconds(0);
        createdAtFilter.$gte = startLao;
      }

      if (endDate) {
        const endLao = new Date(endDate as string);
        // Convert to UTC by subtracting 7 hours immediately
        endLao.setHours(endLao.getHours() - 7 + 23);
        endLao.setMinutes(59);
        endLao.setSeconds(59);
        endLao.setMilliseconds(999);
        createdAtFilter.$lte = endLao;
      }

      filter.createdAt = createdAtFilter;
    }

    const travelHistory = await travelHistoryService(skip, limitToNumber, filter)

    res.json({
      ...messages.SUCCESSFULLY,
      travelHistory
    })
  } catch (error) {
    console.error("Error fetching tax info:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
}

export const getCommentAndRating = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const {
      skip = "1",
      limit = "10",
      status,
      role = 'CUSTOMER'
    } = req.query

    const skipToNumber = parseInt(skip as string, 10)
    const limitToNumber = parseInt(limit as string, 10)


    const filter: any = {}

    if (status) filter.status = status
    if (role === "DRIVER") filter.driverId = userId
    if (role === "CUSTOMER") filter.passengerId = userId

    const travelHistory = role === "DRIVER"
      ? await getDriverCommentAndRatingService(skipToNumber, limitToNumber, filter)
      : await getPassengerCommentAndRatingService(skipToNumber, limitToNumber, filter)

    res.json({
      ...messages.SUCCESSFULLY,
      travelHistory
    })
  } catch (error) {
    console.error("Error fetching tax info:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
}

// Report driver part
export const getTotalDriverIncome = async (req: Request, res: Response) => {
  try {
    const driverId = (req as any).user.id;

    const totalIncome = await getTotalDriverIncomeService(driverId)
    const totalIncomeThatWasNotClaim = await getTotalDriverIncomeServiceThatWasNotClaim(driverId)

    res.json({
      ...messages.SUCCESSFULLY,
      totalIncome,
      totalIncomeThatWasNotClaim
    })
  } catch (error) {
    console.error("Error fetching tax info:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
}

// Report payment detail in travel history page
export const getDriverPaymentDetail = async (req: Request, res: Response) => {
  try {
    const callTaxiId = req.params.id

    const driverPaymentDetail = await getDriverPaymentDetailService(callTaxiId)

    res.json({
      ...messages.SUCCESSFULLY,
      driverPaymentDetail,
    })
  } catch (error) {
    console.error("Error fetching tax info:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
}