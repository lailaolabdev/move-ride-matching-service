import { Request, Response } from "express";
import {
  createRoundLimitService,
  getAllRoundLimitsService,
  getRoundLimitByIdService,
  updateRoundLimitService,
  deleteRoundLimitService,
} from "../../services/roundLimit";
import { messages } from "../../config/index";

// CREATE Round Limit
export const createRoundLimit = async (req: Request, res: Response): Promise<any> => {
  try {
    const { round, country, countryCode } = req.body;

    const newRoundLimit = await createRoundLimitService({
      round,
      country,
      countryCode,
    });

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "Round limit created successfully",
      data: newRoundLimit,
    });
  } catch (error) {
    console.error("Error creating round limit:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// GET ALL Round Limits
export const getAllRoundLimits = async (req: Request, res: Response): Promise<any> => {
  try {
    const { skip, country, countryCode } = req.query;

    const parsedSkip = parseInt(skip as string, 10) || 0;

    const filter: any = {};
    if (country) filter.country = country;
    if (countryCode) filter.countryCode = countryCode;

    const result = await getAllRoundLimitsService(parsedSkip, filter);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Round limits fetched successfully",
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    console.error("Error fetching round limits:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// GET Round Limit by ID
export const getRoundLimitById = async (req: Request, res: Response): Promise<any> => {
  try {
    const roundLimit = await getRoundLimitByIdService(req.params.id);

    if (!roundLimit) {
      return res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Round limit not found",
      });
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Round limit fetched successfully",
      data: roundLimit,
    });
  } catch (error) {
    console.error("Error fetching round limit by ID:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// UPDATE Round Limit
export const updateRoundLimit = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { round, country, countryCode } = req.body;

    const updated = await updateRoundLimitService({
      id,
      round,
      country,
      countryCode,
    });

    if (!updated) {
      return res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Round limit not found",
      });
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Round limit updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating round limit:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// DELETE Round Limit
export const deleteRoundLimit = async (req: Request, res: Response): Promise<any> => {
  try {
    const deleted = await deleteRoundLimitService(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Round limit not found",
      });
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Round limit deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting round limit:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};
