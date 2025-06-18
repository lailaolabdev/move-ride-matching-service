import { Request, Response } from "express";
import {
    createTaxiTypeService,
    deleteTaxiTypeService,
    getAllTaxiTypeService,
    getTaxiTypeByIdService,
    updateTaxiTypeService,
} from "../../services/taxiType";
import { messages } from "../../config/index"; // Assuming you have a messages file for status codes

// CREATE Taxi Type
export const createTaxiType = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;  // Assuming user data is added to the request object (e.g., via authentication middleware)

        const {
            name,
            icon,
            seats,
            country
        } = req.body;

        const taxiType = await createTaxiTypeService({
            name,
            icon,
            seats,
            country,
            createdBy: user.id,
            createdByFullName: user.fullName
        });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: "Taxi Type created successfully",
            taxiType,
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
export const getAllTaxiType = async (req: Request, res: Response) => {
    try {
        const { taxiTypeId, skip, limit, name } = req.query;
        const parseSkip = parseInt(skip as string, 10);
        const parsedLimit = parseInt(limit as string, 10);

        const filter: any = {}

        if (taxiTypeId) filter.taxiTypeId = taxiTypeId
        if (name) filter.name = { $regex: name, $options: 'i' }

        const taxiTypes = await getAllTaxiTypeService(
            parseSkip,
            parsedLimit,
            filter
        );

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Taxi Types fetched successfully",
            taxiTypes,
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
export const getTaxiTypeById = async (req: Request, res: Response) => {
    try {
        const taxiType = await getTaxiTypeByIdService(
            req.params.id
        );

        if (!taxiType) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });

            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Taxi Type fetched successfully",
            taxiType,
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
export const updateTaxiType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = (req as any).user;

        const {
            name,
            icon,
            seats,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country
        } = req.body;

        const updatedTaxiType = await updateTaxiTypeService({
            id,
            name,
            icon,
            seats,
            country,
            updatedBy: user.id,
            updatedByFullName: user.fullName
        });

        if (!updatedTaxiType) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Taxi Type updated successfully",
            updatedTaxiType,
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
export const deleteTaxiType = async (req: Request, res: Response) => {
    try {
        const deletedTaxiType = await deleteTaxiTypeService(
            req.params.id
        );

        if (!deletedTaxiType) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Taxi Type deleted successfully",
            deletedTaxiType,
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
