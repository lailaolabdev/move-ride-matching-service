import { Request, Response } from "express";
import {
  createRatingService,
  deleteRatingService,
  getAllRatingsService,
  getRatingByIdService,
  updateRatingService,
} from "../../services/rating";
import { messages } from "../../config";
import { ratingModel } from "../../models/rating";

export const createRating = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body

    const existingRating = await ratingModel.findOne({ userId });

    if (existingRating) {
      res.status(400).json({
        code: messages.ALREADY_EXIST.code,
        messages: `Rating ${messages.ALREADY_EXIST.message}`,
      });
      return
    }

    const rating = await createRatingService(req);

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "Rating created successfully",
      rating,
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

export const getAllRatings = async (req: Request, res: Response) => {
  try {
    const { skip, limit, userId } = req.query;

    const parseSkip = parseInt(skip as string, 10) || 0;
    const parsedLimit = parseInt(limit as string, 10) || 10;

    const filter: any = {};

    if (userId) filter.userId = userId;

    const ratings = await getAllRatingsService(parseSkip, parsedLimit, filter);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Ratings fetched successfully",
      ...ratings,
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

export const getRatingById = async (req: Request, res: Response) => {
  try {
    const rating = await getRatingByIdService(req.params.id);

    if (!rating) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Rating not found",
      });
      return
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Rating fetched successfully",
      rating,
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

export const updateRating = async (req: Request, res: Response) => {
  try {
    const updatedRating = await updateRatingService(req);

    if (!updatedRating) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Rating not found",
      });
      return
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Rating updated successfully",
      rating: updatedRating,
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

export const deleteRating = async (req: Request, res: Response) => {
  try {
    const deletedRating = await deleteRatingService(req.params.id);

    if (!deletedRating) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Rating not found",
      });
      return
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Rating deleted successfully",
      rating: deletedRating,
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
