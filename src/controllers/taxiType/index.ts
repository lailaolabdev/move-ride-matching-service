import { Request, Response } from 'express';
import { createTaxiTypeService, deleteTaxiTypeService, getAllTaxiTypesService, getTaxiTypeByIdService, updateTaxiTypeService } from '../../services/taxiType';
import { messages } from '../../config/index';  // Assuming you have a messages file for status codes

// CREATE Taxi Type
export const createTaxiType = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;  // Assuming user data is added to the request object (e.g., via authentication middleware)
        const { name, icon, price, seats, country } = req.body;

        const taxiType = await createTaxiTypeService(
            {
                name,
                icon,
                price,
                seats,
                country,
                createdBy: user.id,
                createdByFullName: user.fullName
            });

        res.status(201).json({
            code: messages.CREATE_SUCCESSFUL.code,
            message: 'Taxi Type created successfully',
            taxiType
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};

// READ All Taxi Types
export const getAllTaxiTypes = async (req: Request, res: Response) => {
    try {
        const { skip, limit } = req.query;
        const parseSkip = parseInt(skip as string, 10);
        const parsedLimit = parseInt(limit as string, 10);

        const taxiTypes = await getAllTaxiTypesService(parseSkip, parsedLimit);
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: 'Taxi Types fetched successfully',
            taxiTypes
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};

// READ Taxi Type by ID
export const getTaxiTypeById = async (req: Request, res: Response) => {
    try {
        const taxiType = await getTaxiTypeByIdService(req.params.id);

        if (!taxiType) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: 'Taxi Type not found'
            });
            return;
        }

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: 'Taxi Type fetched successfully',
            taxiType
        });
        return;
    } catch (error) {
        console.log("Error: ", error);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};

// UPDATE Taxi Type
export const updateTaxiType = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        const updatedTaxiType = await updateTaxiTypeService(
            {
                id: req.params.id,
                name: req.body.name,
                icon: req.body.icon,
                price: req.body.price,
                updatedBy: user.id,
                updatedByFullName: user.fullName
            });
        if (!updatedTaxiType) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: 'Taxi Type not found'
            });
            return;
        }
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: 'Taxi Type updated successfully',
            updatedTaxiType
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};

// DELETE Taxi Type
export const deleteTaxiType = async (req: Request, res: Response) => {
    try {
        const deletedTaxiType = await deleteTaxiTypeService(req.params.id);
        if (!deletedTaxiType) {
            res.status(404).json({
                code: messages.NOT_FOUND.code,
                message: 'Taxi Type not found'
            });
            return;
        }
        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: 'Taxi Type deleted successfully',
            deletedTaxiType
        });
        return;
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message
        });
        return;
    }
};
