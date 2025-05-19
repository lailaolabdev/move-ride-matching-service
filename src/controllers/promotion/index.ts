import { Request, Response } from "express";
import {
    createPromotionService,
    getAllPromotionsService,
    getPromotionByIdService,
    updatePromotionService,
    deletePromotionService,
} from "../../services/promotion";
import { messages } from "../../config/index";
import { filterPromotion } from "./helper";

// CREATE
export const createPromotion = async (req: Request, res: Response) => {
    try {
        const { name, discount, usingType, period, country } = req.body;

        const promotion = await createPromotionService({
            name,
            discount,
            usingType,
            period,
            country,
        });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: "Promotion created successfully",
            promotion,
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
export const getAllPromotions = async (req: Request, res: Response) => {
    try {
        const { skip, limit, name, usingType, startDate, endDate } = req.query;

        const parsedSkip = parseInt(skip as string, 10) || 0;
        const parsedLimit = parseInt(limit as string, 10) || 10;

        const filter = filterPromotion(name, usingType, startDate, endDate);

        const promotions = await getAllPromotionsService(
            parsedSkip,
            parsedLimit,
            filter
        );

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Promotions fetched successfully",
            promotions,
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
export const getPromotionById = async (req: Request, res: Response) => {
    try {
        const promotion = await getPromotionByIdService(req.params.id);

        if (!promotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Promotion fetched successfully",
            promotion,
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
export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, discount, usingType, period, status, country } = req.body;

        const updatedPromotion = await updatePromotionService({
            id,
            name,
            discount,
            usingType,
            period,
            status,
            country,
        });

        if (!updatedPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Promotion updated successfully",
            updatedPromotion,
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
export const deletePromotion = async (req: Request, res: Response) => {
    try {
        const deletedPromotion = await deletePromotionService(req.params.id);

        if (!deletedPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Promotion deleted successfully",
            deletedPromotion,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};
