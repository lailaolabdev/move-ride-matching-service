import { Request, Response } from "express";
import {
    createPointPromotionService,
    getAllPointPromotionsService,
    getPointPromotionByIdService,
    updatePointPromotionService,
    deletePointPromotionService,
} from "../../services/pointPromotion";
import { messages } from "../../config/index";
import { filterPointPromotion } from "./helper";

// CREATE
export const createPointPromotion = async (req: Request, res: Response) => {
    try {
        const { name, type, minAmount, pointReward, status, startDate, endDate, country } = req.body;

        const pointPromotion = await createPointPromotionService({
            name,
            type,
            minAmount,
            pointReward,
            status,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            country
        });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: "Point promotion created successfully",
            pointPromotion,
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
export const getAllPointPromotions = async (req: Request, res: Response) => {
    try {
        const {
            skip,
            limit,
            name,
            type,
            status,
            country,
            minAmount,
            pointReward,
            startDate,
            endDate,
            createdStartDate,
            createdEndDate
        } = req.query;

        const parsedSkip = parseInt(skip as string, 10) || 0;
        const parsedLimit = parseInt(limit as string, 10) || 10;

        const filter = filterPointPromotion(
            name,
            type,
            status,
            startDate,
            endDate,
            country,
            minAmount,
            pointReward,
            createdStartDate,
            createdEndDate
        );

        const pointPromotions = await getAllPointPromotionsService(
            parsedSkip,
            parsedLimit,
            filter
        );

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Point promotions fetched successfully",
            pointPromotions,
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
export const getPointPromotionById = async (req: Request, res: Response) => {
    try {
        const pointPromotion = await getPointPromotionByIdService(req.params.id);

        if (!pointPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Point promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Point promotion fetched successfully",
            pointPromotion,
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
export const updatePointPromotion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type, minAmount, pointReward, status, startDate, endDate, country } = req.body;

        const updatedPointPromotion = await updatePointPromotionService({
            id,
            name,
            type,
            minAmount,
            pointReward,
            status,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            country
        });

        if (!updatedPointPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Point promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Point promotion updated successfully",
            updatedPointPromotion,
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
export const deletePointPromotion = async (req: Request, res: Response) => {
    try {
        const deletedPointPromotion = await deletePointPromotionService(req.params.id);

        if (!deletedPointPromotion) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Point promotion not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Point promotion deleted successfully",
            deletedPointPromotion,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
    }
};
