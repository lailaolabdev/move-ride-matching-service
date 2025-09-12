import { Request, Response } from "express";
import {
    createNewComerPromotionService,
    getAllNewComerPromotionsService,
    getNewComerPromotionByIdService,
    updateNewComerPromotionService,
    deleteNewComerPromotionService,
    checkNewComerPromotionUsageService,
    recordNewComerPromotionUsageService,
    getAllNewComerPromotionUsageService,
} from "../../services/newComerPromotion";
import { messages } from "../../config/index";
import { filterNewComerPromotion } from "./helper";

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
        const {
            skip,
            limit,
            name,
            startDate,
            endDate,
            status,
            country
        } = req.query;

        const parsedSkip = parseInt(skip as string, 10) || 0;
        const parsedLimit = parseInt(limit as string, 10) || 10;

        const filter = filterNewComerPromotion(name, status, startDate, endDate, country);

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
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// CHECK if user has already used newcomer promotion
export const checkNewComerPromotionUsage = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { country } = req.query;

        if (!country) {
            res.status(400).json({
                code: messages.BAD_REQUEST.code,
                message: "Country parameter is required",
            });
            return;
        }

        const usageCheck = await checkNewComerPromotionUsageService({
            userId,
            country: country as string,
        });

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Usage check completed successfully",
            hasUsed: usageCheck.hasUsed,
            usageDetails: usageCheck.usageDetails,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// RECORD newcomer promotion usage
export const recordNewComerPromotionUsage = async (req: Request, res: Response) => {
    try {
        const { userId, newComerPromotionId, country } = req.body;

        if (!userId || !newComerPromotionId || !country) {
            res.status(400).json({
                code: messages.BAD_REQUEST.code,
                message: "userId, newComerPromotionId, and country are required",
            });
            return;
        }

        // First check if user has already used newcomer promotion in this country
        const usageCheck = await checkNewComerPromotionUsageService({
            userId,
            country,
        });

        if (usageCheck.hasUsed) {
            res.status(409).json({
                code: "ALREADY_USED",
                message: "User has already used newcomer promotion in this country",
                usageDetails: usageCheck.usageDetails,
            });
            return;
        }

        const usageRecord = await recordNewComerPromotionUsageService({
            userId,
            newComerPromotionId,
            country,
        });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: "Newcomer promotion usage recorded successfully",
            usageRecord,
        });
    } catch (error) {
        // Handle unique constraint violation
        if ((error as any).code === 11000) {
            res.status(409).json({
                code: "ALREADY_USED",
                message: "User has already used newcomer promotion in this country",
            });
            return;
        }

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};

// GET all newcomer promotion usage records (for admin)
export const getAllNewComerPromotionUsage = async (req: Request, res: Response) => {
    try {
        const {
            skip,
            limit,
            userId,
            country,
            newComerPromotionId,
            startDate,
            endDate,
        } = req.query;

        const parsedSkip = parseInt(skip as string, 10) || 0;
        const parsedLimit = parseInt(limit as string, 10) || 10;

        const filter: any = {};
        if (userId) filter.userId = userId;
        if (country) filter.country = country;
        if (newComerPromotionId) filter.newComerPromotionId = newComerPromotionId;
        
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate as string),
                $lte: new Date(endDate as string),
            };
        }

        const usageRecords = await getAllNewComerPromotionUsageService(
            parsedSkip,
            parsedLimit,
            filter
        );

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Usage records fetched successfully",
            usageRecords,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};
