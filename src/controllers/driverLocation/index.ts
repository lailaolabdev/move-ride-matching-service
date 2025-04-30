import { Request, Response } from "express";
import {
  createDriverLocationService,
  deleteDriverLocationService,
  getAllDriverLocationService,
  getDriverLocationByIdService,
  updateDriverLocationService,
} from "../../services/driverLocation";
import { messages } from "../../config";

export const createDriverLocation = async (req: Request, res: Response) => {
  try {
    const driverLocation = await createDriverLocationService(req);

    res.status(201).json({
      code: messages.CREATE_SUCCESSFUL.code,
      message: "DriverLocation created successfully",
      driverLocation,
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

export const getAllDriverLocation = async (req: Request, res: Response) => {
  try {
    const loyalties = await getAllDriverLocationService();

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Driver socation fetched successfully",
      loyalties,
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

export const getDriverLocationById = async (req: Request, res: Response) => {
  try {
    const taxi = await getDriverLocationByIdService(req.params.id);

    if (!taxi) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Driver location not found",
      });

      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Driver location fetched successfully",
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


export const updateDriverLocation = async (req: Request, res: Response) => {
  try {
    const updatedDriverLocation = await updateDriverLocationService(req);

    if (!updatedDriverLocation) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Driver location not found",
      });

      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Driver location updated successfully",
      taxi: updatedDriverLocation,
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

export const deleteDriverLocation = async (req: Request, res: Response) => {
  try {
    const deletedDriverLocation = await deleteDriverLocationService(req.params.id);

    if (!deletedDriverLocation) {
      res.status(404).json({
        code: messages.NOT_FOUND.code,
        message: "Vehicle not found",
      });

      return;
    }

    res.status(200).json({
      code: messages.SUCCESSFULLY.code,
      message: "Vehicle deleted successfully",
      taxi: deleteDriverLocation,
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
