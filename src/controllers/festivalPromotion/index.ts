import { Request, Response } from "express";
import {
    createFestivalPromotionService,
    getAllFestivalPromotionsService,
    getFestivalPromotionByIdService,
    updateFestivalPromotionService,
    deleteFestivalPromotionService,
    updateFestivalPromotionByDateService,
} from "../../services/festivalPromotion";
import { messages } from "../../config/index";
import { filterPromotion } from "./helper"; // You may rename this to filterFestivalPromotion if applicable

// CREATE
export const createFestivalPromotion = async (req: Request, res: Response) => {
    try {
        const { name, discount, usingType, period, country } = req.body;

        const festivalPromotion = await createFestivalPromotionService({
            name,
            discount,
            usingType,
            period,
            country,
        });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: "Festival promotion created successfully",
            festivalPromotion,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// READ ALL
export const getAllFestivalPromotions = async (req: Request, res: Response) => {
    try {
        const {
            skip,
            limit,
            name,
            usingType,
            startDate,
            endDate,
            status,
            country
        } = req.query;

        const parsedSkip = parseInt(skip as string, 10) || 0;
        const parsedLimit = parseInt(limit as string, 10) || 10;

        const filter = filterPromotion(
            name,
            usingType,
            startDate,
            endDate,
            status,
            country
        );

        const festivalPromotions = await getAllFestivalPromotionsService(
            parsedSkip,
            parsedLimit,
            filter
        );

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Festival promotions fetched successfully",
            festivalPromotions,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// READ BY ID
export const getFestivalPromotionById = async (req: Request, res: Response) => {
    try {
        const festivalPromotion = await getFestivalPromotionByIdService(req.params.id);

        if (!festivalPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Festival promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Festival promotion fetched successfully",
            festivalPromotion,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// UPDATE
export const updateFestivalPromotion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, discount, usingType, period, status, country } = req.body;

        const updatedFestivalPromotion = await updateFestivalPromotionService({
            id,
            name,
            discount,
            usingType,
            period,
            status,
            country,
        });

        if (!updatedFestivalPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Festival promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Festival promotion updated successfully",
            updatedFestivalPromotion,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// DELETE
export const deleteFestivalPromotion = async (req: Request, res: Response) => {
    try {
        const deletedFestivalPromotion = await deleteFestivalPromotionService(req.params.id);

        if (!deletedFestivalPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Festival promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Festival promotion deleted successfully",
            deletedFestivalPromotion,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// UPDATE Promotion when it less than current date
export const updateFestivalPromotionByDate = async (req: Request, res: Response) => {
    try {
        const { date, country } = req.body

        const updatedFestivalPromotion = await updateFestivalPromotionByDateService({
            date,
            country
        });

        if (!updatedFestivalPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Festival promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Festival promotion updated successfully",
            updatedFestivalPromotion,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};
