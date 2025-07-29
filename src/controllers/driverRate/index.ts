import { Request, Response } from "express";
import {
  createDriverRateService,
  deleteDriverRateService,
  getAllDriverRatesService,
  getDriverRateByIdService,
  updateDriverRateService,
} from "../../services/driverRate";
import { messages } from "../../config/index";

// CREATE Driver Rate
export const createDriverRate = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const {
      registrationSource,
      minDistance,
      maxDistance,
      percentage,
      country,
      countryCode
    } = req.body;

    const rate = await createDriverRateService({
      registrationSource,
      minDistance,
      maxDistance,
      percentage,
      country,
      countryCode,
      createdBy: user.id,
      createdByFullName: user.fullName,
    });

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "Driver rate created successfully",
      rate,
    });
  } catch (error) {
    console.error("Error creating driver rate:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// READ All Driver Rates
export const getAllDriverRates = async (req: Request, res: Response) => {
  try {
    const { skip, limit, country, countryCode, taxiType } = req.query;
    const parseSkip = parseInt(skip as string, 10) || 0;
    const parsedLimit = parseInt(limit as string, 10) || 20;

    const filter: any = {};

    if (country) filter.country = country;
    if (countryCode) filter.countryCode = countryCode;
    if (taxiType) filter.taxiType = taxiType;

    const driverRates = await getAllDriverRatesService(parseSkip, parsedLimit, filter);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Driver rates fetched successfully",
      driverRates,
    });
  } catch (error) {
    console.error("Error fetching driver rates:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// READ Driver Rate by ID
export const getDriverRateById = async (req: Request, res: Response) => {
  try {
    const driverRate = await getDriverRateByIdService(req.params.id);

    if (!driverRate) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Driver rate not found",
      });
      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Driver rate fetched successfully",
      driverRate,
    });
  } catch (error) {
    console.error("Error fetching driver rate by ID:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// UPDATE Driver Rate
export const updateDriverRate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const {
      registrationSource,
      minDistance,
      maxDistance,
      percentage,
    } = req.body;

    const updatedDriverRate = await updateDriverRateService({
      id,
      registrationSource,
      minDistance,
      maxDistance,
      percentage,
      updatedBy: user.id,
      updatedByFullName: user.fullName,
    });

    if (!updatedDriverRate) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Driver rate not found",
      });
      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Driver rate updated successfully",
      updatedDriverRate,
    });
  } catch (error) {
    console.error("Error updating driver rate:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

// DELETE Driver Rate
export const deleteDriverRate = async (req: Request, res: Response) => {
  try {
    const deletedDriverRate = await deleteDriverRateService(req.params.id);

    if (!deletedDriverRate) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Driver rate not found",
      });
      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Driver rate deleted successfully",
      deletedDriverRate,
    });
  } catch (error) {
    console.error("Error deleting driver rate:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};
