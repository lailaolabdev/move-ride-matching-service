import { Request, Response } from "express";
import {
  createCashLimitService,
  getAllCashLimitsService,
  getCashLimitByIdService,
  updateCashLimitService,
  deleteCashLimitService,
} from "../../services/cashLimit";
import { messages } from "../../config/index";

// CREATE Cash Limit
export const createCashLimit = async (req: Request, res: Response) => {
  try {
    const { amount, country, countryCode } = req.body;

    const newCashLimit = await createCashLimitService({
      amount,
      country,
      countryCode,
    });

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "Cash limit created successfully",
      data: newCashLimit,
    });
  } catch (error) {
    console.error("Error creating cash limit:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// GET ALL Cash Limits
export const getAllCashLimits = async (req: Request, res: Response) => {
  try {
    const { skip, country, countryCode } = req.query;

    const parsedSkip = parseInt(skip as string, 10) || 0;

    const filter: any = {};
    if (country) filter.country = country;
    if (countryCode) filter.countryCode = countryCode;

    const result = await getAllCashLimitsService(parsedSkip, filter);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Cash limits fetched successfully",
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    console.error("Error fetching cash limits:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// GET Cash Limit by ID
export const getCashLimitById = async (req: Request, res: Response) => {
  try {
    const cashLimit = await getCashLimitByIdService(req.params.id);

    if (!cashLimit) {
      return res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Cash limit not found",
      });
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Cash limit fetched successfully",
      data: cashLimit,
    });
  } catch (error) {
    console.error("Error fetching cash limit by ID:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// UPDATE Cash Limit
export const updateCashLimit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, country, countryCode } = req.body;

    const updated = await updateCashLimitService({
      id,
      amount,
      country,
      countryCode,
    });

    if (!updated) {
      return res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Cash limit not found",
      });
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Cash limit updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating cash limit:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// DELETE Cash Limit
export const deleteCashLimit = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteCashLimitService(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Cash limit not found",
      });
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Cash limit deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting cash limit:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};
