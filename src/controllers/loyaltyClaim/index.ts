import { Request, Response } from "express";
import {
  createLoyaltyClaimService,
  deleteLoyaltyClaimService,
  getAllLoyaltyClaimService,
  getLoyaltyClaimByIdService,
  updateLoyaltyClaimService,
} from "../../services/loyaltyClaim";
import { IErrorResponse, messages } from "../../config";
import { ILoyalty, loyaltyModel } from "../../models/loyalty";
import axios from "axios";
import { Types } from "mongoose";
import mongoose from "mongoose";

export const createLoyaltyClaim = async (req: Request, res: Response): Promise<any> => {
  const session = await mongoose.startSession();
  
  try {
    await session.withTransaction(async () => {
      const userId = (req as any).user.id;

      const { loyaltyId } = req.body
      console.log("loyaltyId: ", loyaltyId);

      // Check user
      const user = await axios.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${userId}`);
      const userData = user?.data?.user

      if (!userData) {
        throw {
          code: messages.USER_NOT_FOUND.code,
          message: messages.USER_NOT_FOUND.message
        }
      }
      console.log("userData: ", userData);

      // Check is loyalty exist
      const loyalty = await loyaltyModel.findById(loyaltyId).session(session);
      console.log("loyalty: ", loyalty);

      if (!loyalty) {
        throw {
          code: messages.LOYALTY_NOT_FOUND.code,
          message: messages.LOYALTY_NOT_FOUND.message
        }
      }

      // Check is user point enough or not 
      const userPoint = Number(userData?.point ?? 0);
      const loyaltyPrice = Number(loyalty?.price ?? 0);

      if (userPoint < loyaltyPrice) {
        throw new Error("User does not have enough points");
      }

      // Check if loyalty has enough quantity
      if (loyalty.quantity <= 0) {
        throw new Error("Loyalty item is out of stock");
      }

      // Reduce loyalty quantity
      await loyaltyModel.findByIdAndUpdate(loyaltyId, {
        quantity: loyalty.quantity - 1
      }, { session });

      // Reduce user point
      await axios.patch(`${process.env.USER_SERVICE_URL}/v1/api/users/${userId}/point/add`,
        {
          point: userData.point - loyalty.price
        },
        {
          headers: {
            Authorization: `${req.headers["authorization"]}`,
          }
        }
      );

      // Create loyalty claim within the transaction
      await createLoyaltyClaimService(req, userData.phone, loyalty.name, loyalty.price, session);
    });

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "Loyalty claim created successfully"
    });
  } catch (error) {
    console.log("Error: ", error);

    let statusCode = 500;
    let message = messages.INTERNAL_SERVER_ERROR.message;

    // Handle specific error cases
    if ((error as IErrorResponse).code === messages.USER_NOT_FOUND.code) {
      statusCode = parseInt(messages.USER_NOT_FOUND.code);
      message = messages.USER_NOT_FOUND.message;
    } else if ((error as IErrorResponse).code === messages.LOYALTY_NOT_FOUND.code) {
      statusCode = parseInt(messages.LOYALTY_NOT_FOUND.code);
      message = messages.LOYALTY_NOT_FOUND.message;
    } 

    res.status(statusCode).json({
      code: statusCode === 500 ? messages.INTERNAL_SERVER_ERROR.code : messages.BAD_REQUEST.code,
      message: message,
      detail: (error as Error).message,
    });
  } finally {
    await session.endSession();
  }
};

export const getAllLoyaltyClaim = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const role = (req as any).user.role;

    const {
      skip = 0,
      limit = 10,
      status,
      country,
      startDate,
      endDate
    } = req.query;

    const parseSkip = parseInt(skip as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    const filter: any = {}

    if (role === "CUSTOMER" || role === "DRIVER") {
      if (userId) filter.userId = new Types.ObjectId(userId)
    }

    if (status) filter.status = status
    if (country) filter.country = country
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

    const loyaltyClaim = await getAllLoyaltyClaimService(parseSkip, parsedLimit, filter);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Loyalty claim fetched successfully",
      ...loyaltyClaim,
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

export const getLoyaltyClaimById = async (req: Request, res: Response) => {
  try {
    const loyaltyClaim = await getLoyaltyClaimByIdService(req.params.id);

    if (!loyaltyClaim) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Loyalty claim not found",
      });

      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Loyalty claim fetched successfully",
      loyaltyClaim,
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

export const updateLoyaltyClaim = async (req: Request, res: Response) => {
  try {
    const updatedLoyaltyClaim = await updateLoyaltyClaimService(req);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Loyalty claim updated successfully",
      loyaltyClaim: updatedLoyaltyClaim,
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

export const deleteLoyaltyClaim = async (req: Request, res: Response) => {
  try {
    const deletedLoyaltyClaim = await deleteLoyaltyClaimService(req.params.id);

    if (!deletedLoyaltyClaim) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Loyalty claim not found",
      });

      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Loyalty claim deleted successfully",
      loyaltyClaim: deletedLoyaltyClaim,
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
