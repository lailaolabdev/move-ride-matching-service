import { Request, Response } from "express";
import {
  createAroundLimitService,
  getAllAroundLimitsService,
  getAroundLimitByIdService,
  updateAroundLimitService,
  deleteAroundLimitService,
} from "../../services/aroundLimit";
import { messages } from "../../config/index";

// CREATE Around Limit
export const createAroundLimit = async (req: Request, res: Response) => {
  try {
    const { around, country, countryCode } = req.body;

    const newAroundLimit = await createAroundLimitService({
      around,
      country,
      countryCode,
    });

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "Around limit created successfully",
      data: newAroundLimit,
    });
  } catch (error) {
    console.error("Error creating around limit:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// GET ALL Around Limits
export const getAllAroundLimits = async (req: Request, res: Response) => {
  try {
    const { skip, country, countryCode } = req.query;

    const parsedSkip = parseInt(skip as string, 10) || 0;

    const filter: any = {};
    if (country) filter.country = country;
    if (countryCode) filter.countryCode = countryCode;

    const result = await getAllAroundLimitsService(parsedSkip, filter);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Around limits fetched successfully",
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    console.error("Error fetching around limits:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// GET Around Limit by ID
export const getAroundLimitById = async (req: Request, res: Response) => {
  try {
    const aroundLimit = await getAroundLimitByIdService(req.params.id);

    if (!aroundLimit) {
      return res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Around limit not found",
      });
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Around limit fetched successfully",
      data: aroundLimit,
    });
  } catch (error) {
    console.error("Error fetching around limit by ID:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// UPDATE Around Limit
export const updateAroundLimit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { around, country, countryCode } = req.body;

    const updated = await updateAroundLimitService({
      id,
      around,
      country,
      countryCode,
    });

    if (!updated) {
      return res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Around limit not found",
      });
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Around limit updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating around limit:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// DELETE Around Limit
export const deleteAroundLimit = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteAroundLimitService(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Around limit not found",
      });
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Around limit deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting around limit:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};
