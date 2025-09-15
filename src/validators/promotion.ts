import { Request, Response, NextFunction } from "express";
import { messages } from "../config";
import { usingTypeEnum } from "../models/festivalPromotion";

export const validateCreatePromotion = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, discount, usingType, periodStartTime, periodEndTime, country } = req.body;

  if (!name || typeof name !== "string") {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid or missing field: name",
    });
    return;
  }

  if (
    discount === undefined ||
    typeof discount !== "number" ||
    discount < 0 ||
    discount > 100
  ) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message:
        "Invalid or missing field: discount (must be a number between 0 and 100)",
    });
    return;
  }

  if (!usingType || typeof usingType !== "string" || !Object.values(usingTypeEnum).includes(usingType)) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: `Invalid or missing field: usingType (must be one of ${Object.values(
        usingTypeEnum
      ).join(", ")})`,
    });
    return;
  }

  if (!periodStartTime || !periodEndTime) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Missing required fields: periodStartTime and periodEndTime",
    });
    return;
  }

  if (typeof periodStartTime !== "string" || typeof periodEndTime !== "string") {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message:
        "Invalid field: periodStartTime and periodEndTime must be strings",
    });
    return;
  }

  const start = new Date(periodStartTime);
  const end = new Date(periodEndTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message:
        "Invalid date format in periodStartTime or periodEndTime",
    });
    return;
  }

  if (end <= start) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "periodEndTime must be later than periodStartTime",
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

  next();
};

export const validateUpdatePromotion = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, discount, usingType, periodStartTime, periodEndTime, status, country } = req.body;

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid field: name must be a non-empty string",
    });
    return;
  }

  if (discount !== undefined && (typeof discount !== "number" || discount < 0 || discount > 100)) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid field: discount (must be a number between 0 and 100)",
    });
    return;
  }

  if (usingType !== undefined && (typeof usingType !== "string" || !Object.values(usingTypeEnum).includes(usingType))) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: `Invalid field: usingType (must be one of ${Object.values(
        usingTypeEnum
      ).join(", ")})`,
    });
    return;
  }

  if (periodStartTime !== undefined && periodEndTime !== undefined) {
    if (typeof periodStartTime !== "string" || typeof periodEndTime !== "string") {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message:
          "Invalid field: periodStartTime and periodEndTime must be strings",
      });
      return;
    }

    const start = new Date(periodStartTime);
    const end = new Date(periodEndTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message:
          "Invalid date format in periodStartTime or periodEndTime",
      });
      return;
    }

    if (end <= start) {
      res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: "periodEndTime must be later than periodStartTime",
      });
      return;
    }
  }

  if (status !== undefined && typeof status !== "boolean") {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid field: status must be a boolean",
    });
    return;
  }

  if (country !== undefined && (typeof country !== "string" || country.trim() === "")) {
    res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid field: country must be a non-empty string",
    });
    return;
  }

  next();
};
