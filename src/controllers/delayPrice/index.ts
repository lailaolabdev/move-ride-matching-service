import { Request, Response } from "express";
import {
  createDelayPriceService,
  deleteDelayPriceService,
  getAllDelayPricesService,
  getDelayPriceByIdService,
  updateDelayPriceService,
} from "../../services/delayPrice";
import { messages } from "../../config/index";

// CREATE Delay Price
export const createDelayPrice = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { price, country, countryCode } = req.body;

    const delayPriceExists = await getAllDelayPricesService(0, 0, { country, countryCode });

    if (delayPriceExists?.prices?.length > 0) {
      res.status(400).json({
        code: messages.DELAY_PRICE_ALREADY_EXIST.code,
        message: messages.DELAY_PRICE_ALREADY_EXIST.message,
      });

      return
    }

    const delayPrice = await createDelayPriceService({
      price,
      country,
      countryCode,
      createdBy: user.id,
      createdByFullName: user.fullName,
    });

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "Delay price created successfully",
      delayPrice,
    });
  } catch (error) {
    console.error("Error creating delay price:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// READ All Delay Prices
export const getAllDelayPrices = async (req: Request, res: Response) => {
  try {
    const { skip, limit, country, countryCode } = req.query;
    const parsedSkip = parseInt(skip as string, 10) || 0;
    const parsedLimit = parseInt(limit as string, 10) || 20;

    const filter: any = {};
    if (country) filter.country = country;
    if (countryCode) filter.countryCode = countryCode;

    const delayPrices = await getAllDelayPricesService(parsedSkip, parsedLimit, filter);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Delay prices fetched successfully",
      delayPrices,
    });
  } catch (error) {
    console.error("Error fetching delay prices:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// READ Delay Price by ID
export const getDelayPriceById = async (req: Request, res: Response) => {
  try {
    const delayPrice = await getDelayPriceByIdService(req.params.id);

    if (!delayPrice) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Delay price not found",
      });
      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Delay price fetched successfully",
      delayPrice,
    });
  } catch (error) {
    console.error("Error fetching delay price by ID:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// UPDATE Delay Price
export const updateDelayPrice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const { price, country, countryCode } = req.body;

    const delayPriceExists = await getAllDelayPricesService(0, 0, { country, countryCode });

    if (delayPriceExists?.prices?.length > 0) {
      res.status(400).json({
        code: messages.DELAY_PRICE_ALREADY_EXIST.code,
        message: messages.DELAY_PRICE_ALREADY_EXIST.message,
      });

      return
    }

    const updatedDelayPrice = await updateDelayPriceService({
      id,
      price,
      country,
      countryCode,
      updatedBy: user.id,
      updatedByFullName: user.fullName,
    });

    if (!updatedDelayPrice) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Delay price not found",
      });
      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Delay price updated successfully",
      updatedDelayPrice,
    });
  } catch (error) {
    console.error("Error updating delay price:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// DELETE Delay Price
export const deleteDelayPrice = async (req: Request, res: Response) => {
  try {
    const deletedDelayPrice = await deleteDelayPriceService(req.params.id);

    if (!deletedDelayPrice) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Delay price not found",
      });
      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Delay price deleted successfully",
      deletedDelayPrice,
    });
  } catch (error) {
    console.error("Error deleting delay price:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};
