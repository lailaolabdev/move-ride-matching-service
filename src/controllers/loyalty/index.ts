import { Request, Response } from "express";
import {
  createLoyaltyService,
  deleteLoyaltyService,
  getAllLoyaltyService,
  getLoyaltyByIdService,
  updateLoyaltyService,
} from "../../services/loyalty";
import { messages } from "../../config";
import { loyaltyModel } from "../../models/loyalty";

export const createLoyalty = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const existingLoyalty = await loyaltyModel.findOne({ name })

    if (existingLoyalty) {
      res.status(400).json({
        code: messages.ALREADY_EXIST.code,
        messages: `Loyalty ${messages.ALREADY_EXIST.message}`
      })

      return
    }

    const loyalty = await createLoyaltyService(req);

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "Loyalty created successfully",
      loyalty,
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

export const getAllLoyalty = async (req: Request, res: Response) => {
  try {
    const { skip, limit, country, countryCode, name } = req.query;

    const parseSkip = parseInt(skip as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    const filter: any = {}

    if (country) filter.countryId = country
    if (countryCode) filter.countryCode = countryCode
    if (name) filter.name = { $regex: name, $options: 'i' }

    const loyalties = await getAllLoyaltyService(parseSkip, parsedLimit, filter);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Loyalty fetched successfully",
      ...loyalties,
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

export const getLoyaltyById = async (req: Request, res: Response) => {
  try {
    const taxi = await getLoyaltyByIdService(req.params.id);

    if (!taxi) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Vehicle not found",
      });

      return;
    }
    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Vehicle fetched successfully",
      taxi,
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

export const updateLoyalty = async (req: Request, res: Response) => {
  try {
    const updatedLoyalty = await updateLoyaltyService(req);

    if (!updatedLoyalty) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Vehicle not found",
      });

      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Vehicle updated successfully",
      taxi: updatedLoyalty,
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

export const deleteLoyalty = async (req: Request, res: Response) => {
  try {
    const deletedLoyalty = await deleteLoyaltyService(req.params.id);

    if (!deletedLoyalty) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Vehicle not found",
      });

      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Vehicle deleted successfully",
      taxi: deleteLoyalty,
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
