import { Request, Response } from "express";
import {
  createPolygonService,
  deletePolygonService,
  getAllPolygonService,
  getPolygonByIdService,
  updatePolygonService,
} from "../../services/polygon";
import { messages } from "../../config";
import polygonModel from "../../models/polygon";

export const createPolygon = async (req: Request, res: Response) => {
  try {
    const polygon = polygonModel.findOne({ name })

    if (!polygon) {
      res.status(400).json({
        code: messages.ALREADY_EXIST.code,
        messages: `Polygon ${messages.ALREADY_EXIST.message}`
      })

      return
    }

    const createdPolygon = await createPolygonService(req);

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "Polygon created successfully",
      createdPolygon,
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

export const getAllPolygon = async (req: Request, res: Response) => {
  try {
    const { skip, limit } = req.query;
    const parseSkip = parseInt(skip as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    const polygons = await getAllPolygonService(parseSkip, parsedLimit);

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Vehicles fetched successfully",
      polygons,
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

export const getPolygonById = async (req: Request, res: Response) => {
  try {
    const taxi = await getPolygonByIdService(req.params.id);

    if (!taxi) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Vehicle not found",
      });

      return;
    }
    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Vehicle fetched successfully",
      taxi,
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

export const updatePolygon = async (req: Request, res: Response) => {
  try {
    const updatedPolygon = await updatePolygonService(req);

    if (!updatedPolygon) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Vehicle not found",
      });

      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Vehicle updated successfully",
      taxi: updatedPolygon,
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

export const deletePolygon = async (req: Request, res: Response) => {
  try {
    const deletedPolygon = await deletePolygonService(req.params.id);
    if (!deletedPolygon) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Vehicle not found",
      });

      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Vehicle deleted successfully",
      taxi: deletePolygon,
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
