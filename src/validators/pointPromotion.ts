import { Request, Response, NextFunction } from "express";
import { messages } from "../config/index";

export const validateCreatePointPromotion = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, type, pointReward, country, minAmount, startDate, endDate, status } = req.body;

  if (!name || typeof name !== "string") {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid or missing field: name",
    });
    return;
  }

  if (!type || typeof type !== "string" || !["REGISTER", "PAYMENT"].includes(type)) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid or missing field: type (must be REGISTER or PAYMENT)",
    });
    return;
  }

  if (pointReward === undefined || typeof pointReward !== "number" || pointReward < 0) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid or missing field: pointReward (must be a non-negative number)",
    });
    return;
  }

  if (!country || typeof country !== "string") {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid or missing field: country",
    });
    return;
  }

  // Validate optional fields
  if (minAmount !== undefined && (typeof minAmount !== "number" || minAmount < 0)) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid field: minAmount (must be a non-negative number)",
    });
    return;
  }

  if (status !== undefined && typeof status !== "boolean") {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid field: status (must be boolean)",
    });
    return;
  }

  // Validate dates if provided
  if (startDate !== undefined) {
    if (typeof startDate !== "string") {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: "Invalid field: startDate (must be a valid date string)",
      });
      return;
    }

    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: "Invalid date format in startDate",
      });
      return;
    }
  }

  if (endDate !== undefined) {
    if (typeof endDate !== "string") {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: "Invalid field: endDate (must be a valid date string)",
      });
      return;
    }

    const end = new Date(endDate);
    if (isNaN(end.getTime())) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: "Invalid date format in endDate",
      });
      return;
    }
  }

  // Validate that startDate is before endDate if both provided
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: "startDate must be before endDate",
      });
      return;
    }
  }

  // For PAYMENT type, minAmount should be provided
  if (type === "PAYMENT" && minAmount === undefined) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "minAmount is required for PAYMENT type promotions",
    });
    return;
  }

  next();
};

export const validateUpdatePointPromotion = validateCreatePointPromotion;