import { Request } from 'express';
import polygonModel from '../models/polygon';
import { IPolygon } from '../models/polygon';

export const createPolygonService = async (req: Request): Promise<IPolygon | null> => {
    try {
        const user = (req as any).user._id;

        const {
            name,
            coordinates,
            price,
            color
        } = req.body

        const polygon = new polygonModel({
            name,
            coordinates,
            price,
            color,
            createdBy: user,
        });

        const savedPolygon = await polygon.save();

        return savedPolygon;
    } catch (error) {
        console.log("Error creating vehicle: ", error);
        throw error;
    }
};

export const getAllPolygonService = async (skip: number, limit: number): Promise<any> => {
    try {
        const total = await polygonModel.countDocuments();
        const polygons = await polygonModel.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, polygons };
    } catch (error) {
        console.log("Error retrieving vehicles: ", error);
        throw error;
    }
};

export const getPolygonByIdService = async (id: string): Promise<IPolygon | null> => {
    try {
        const polygon = await polygonModel.findById(id)

        return polygon;
    } catch (error) {
        console.log("Error retrieving vehicle by ID: ", error);
        throw error;
    }
};

export const updatePolygonService = async (req: Request): Promise<IPolygon | null> => {
    try {
        const user = (req as any).user._id;

        const id = req.params.id

        const {
            name,
            coordinates,
            price,
            color,
        } = req.body

        const updatedPolygon = await polygonModel.findByIdAndUpdate(
            id,
            {
                name,
                coordinates,
                price,
                color,
                updatedBy: user,
            },
            { new: true }
        );

        return updatedPolygon;
    } catch (error) {
        console.log("Error updating polygon: ", error);
        throw error;
    }
};

export const deletePolygonService = async (id: string): Promise<IPolygon | null> => {
    try {
        const deletedPolygon = await polygonModel.findByIdAndDelete(id);

        return deletedPolygon;
    } catch (error) {
        console.log("Error deleting vehicle: ", error);
        throw error;
    }
};