import { Request, Response } from "express";
import {
    createNewComerPromotionService,
    getAllNewComerPromotionsService,
    getNewComerPromotionByIdService,
    updateNewComerPromotionService,
    deleteNewComerPromotionService,
} from "../../services/newComerPromotion";
import { messages } from "../../config/index";
import { filterPromotion } from "../festivalPromotion/helper"; // Rename if specific to newcomer

// CREATE
export const createNewComerPromotion = async (req: Request, res: Response) => {
    try {
        const { name, discount, country } = req.body;

        const newComerPromotion = await createNewComerPromotionService({
            name,
            discount,
            country,
        });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: "Newcomer promotion created successfully",
            newComerPromotion,
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
export const getAllNewComerPromotions = async (req: Request, res: Response) => {
    try {
        const { skip, limit, name, usingType, startDate, endDate } = req.query;

        const parsedSkip = parseInt(skip as string, 10) || 0;
        const parsedLimit = parseInt(limit as string, 10) || 10;

        const filter = filterPromotion(name);

        const newComerPromotions = await getAllNewComerPromotionsService(
            parsedSkip,
            parsedLimit,
            filter
        );

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Newcomer promotions fetched successfully",
            newComerPromotions,
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
export const getNewComerPromotionById = async (req: Request, res: Response) => {
    try {
        const newComerPromotion = await getNewComerPromotionByIdService(req.params.id);

        if (!newComerPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Newcomer promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Newcomer promotion fetched successfully",
            newComerPromotion,
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
export const updateNewComerPromotion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, discount, status, country } = req.body;

        const updatedNewComerPromotion = await updateNewComerPromotionService({
            id,
            name,
            discount,
            status,
            country,
        });

        if (!updatedNewComerPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Newcomer promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Newcomer promotion updated successfully",
            updatedNewComerPromotion,
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
export const deleteNewComerPromotion = async (req: Request, res: Response) => {
    try {
        const deletedNewComerPromotion = await deleteNewComerPromotionService(req.params.id);

        if (!deletedNewComerPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Newcomer promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Newcomer promotion deleted successfully",
            deletedNewComerPromotion,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};
