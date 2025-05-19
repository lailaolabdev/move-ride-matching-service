import { Request, Response, NextFunction } from "express";
import { messages } from "../config";
import { usingTypeEnum } from "../models/promotion";

export const validateCreatePromotion = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, discount, usingType, period, status, country } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid or missing field: name",
    });
  }

  if (
    discount === undefined ||
    typeof discount !== "number" ||
    discount < 0 ||
    discount > 100
  ) {
    return res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message:
        "Invalid or missing field: discount (must be a number between 0 and 100)",
    });
  }

  if (usingType) {
    if (
      typeof usingType !== "string" ||
      !Object.values(usingTypeEnum).includes(usingType)
    ) {
      return res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message: `Invalid or missing field: usingType (must be one of ${Object.values(
          usingTypeEnum
        ).join(", ")})`,
      });
    }
  }

  if (period) {
    if (
      typeof period !== "object" ||
      typeof period.startDate !== "string" ||
      typeof period.endDate !== "string"
    ) {
      return res.status(400).json({
        code: messages.BAD_REQUEST.code,
        message:
          "Invalid or missing field: period (must contain startDate and endDate as strings)",
      });
    }
  }

  const start = new Date(period.startDate);

  const end = new Date(period.endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message:
        "Invalid date format in period.startDate or period.endDate",
    });
  }

  if (end < start) {
    return res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "endDate cannot be earlier than startDate",
    });
  }

  if (!country || typeof country !== "string") {
    return res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid or missing field: country",
    });
  }

  if (status !== undefined && typeof status !== "boolean") {
    return res.status(400).json({
      code: messages.BAD_REQUEST.code,
      message: "Invalid field: status (must be boolean)",
    });
  }

  next();
};
