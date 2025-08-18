import { Request, Response } from "express";
import {
    createTaxiTypePricingService,
    deleteTaxiTypePricingService,
    getAllTaxiTypePricingService,
    getTaxiTypePricingByIdService,
    updateTaxiTypePricingService,
} from "../../services/taxiTypePricing";
import { messages } from "../../config/index"; // Assuming you have a messages file for status codes
import taxiTypePricingModel from "../../models/taxiTypePricing";

// CREATE Taxi Type
export const createTaxiTypePricing = async (req: Request, res: Response) => {
    try {
        const {
            taxiTypeId,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country,
            countryCode
        } = req.body;

        // ✅ Validation: minDistance must be less than maxDistance
        if (minDistance >= maxDistance) {
            res.status(400).json({
                code: messages.BAD_REQUEST.code,
                message: messages.BAD_REQUEST.message,
                detail: "minDistance must be less than maxDistance"
            });

            return;
        }

        const existingTaxiTypePricing = await taxiTypePricingModel.find({
            taxiTypeId,
            countryCode,
            country
        });

        for (let i = 0; i < existingTaxiTypePricing.length; i++) {
            const taxiTypePricing = existingTaxiTypePricing[i];

            if (taxiTypePricing.minDistance < maxDistance) {
                res.status(400).json({
                    code: messages.BAD_REQUEST.code,
                    message: messages.BAD_REQUEST.message,
                    detail: "Taxi Type Pricing overlaps with existing entry"
                });
                return;
            }
        }

        const taxiTypePricing = await createTaxiTypePricingService({
            taxiTypeId,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country,
            countryCode
        });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: "Taxi Type created successfully",
            taxiTypePricing,
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
        return;
    }
};

// READ All Taxi Types
export const getAllTaxiTypePricing = async (req: Request, res: Response) => {
    try {
        const { taxiTypeId, skip, limit } = req.query;
        const parseSkip = parseInt(skip as string, 10);
        const parsedLimit = parseInt(limit as string, 10);

        const filter: any = {}

        if (taxiTypeId) filter.taxiTypeId = taxiTypeId

        const taxiTypePricings = await getAllTaxiTypePricingService(
            parseSkip,
            parsedLimit,
            filter
        );

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Taxi Types fetched successfully",
            taxiTypePricings,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
        return;
    }
};

// READ Taxi Type by ID
export const getTaxiTypePricingById = async (req: Request, res: Response) => {
    try {
        const taxiTypePricing = await getTaxiTypePricingByIdService(
            req.params.id
        );

        if (!taxiTypePricing) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });

            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Taxi Type fetched successfully",
            taxiTypePricing,
        });
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
        return;
    }
};

// UPDATE Taxi Type
export const updateTaxiTypePricing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const {
            taxiTypeId,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country,
            countryCode
        } = req.body;

        const updatedTaxiTypePricing = await updateTaxiTypePricingService({
            id,
            taxiTypeId,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country,
            countryCode
        });

        if (!updatedTaxiTypePricing) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Taxi Type updated successfully",
            updatedTaxiTypePricing,
        });
        return;
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });

        return;
    }
};

// DELETE Taxi Type
export const deleteTaxiTypePricing = async (req: Request, res: Response) => {
    try {
        const deletedTaxiTypePricing = await deleteTaxiTypePricingService(
            req.params.id
        );

        if (!deletedTaxiTypePricing) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Taxi Type deleted successfully",
            deletedTaxiTypePricing,
        });
        return;
    } catch (error) {
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });

        return;
    }
};
