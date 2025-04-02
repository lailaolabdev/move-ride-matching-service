import { Router } from "express";
import { checkAuthorizationMiddleware } from "../middlewares";
import {
    createDrivingLicenseType,
    deleteDrivingLicenseType,
    getDrivingLicenseType,
    getDrivingLicenseTypes,
    updateDrivingLicenseType,
} from "../controllers/drivingLicenseType";
import { validateCreateDrivingLicense } from "../validators/drivingLicense";

const router = Router();

router.get("/", getDrivingLicenseTypes);

router.get("/:id", checkAuthorizationMiddleware, getDrivingLicenseType);

router.post("/", checkAuthorizationMiddleware, validateCreateDrivingLicense, createDrivingLicenseType);

router.put("/:id", checkAuthorizationMiddleware, updateDrivingLicenseType);

router.delete("/:id", checkAuthorizationMiddleware, deleteDrivingLicenseType);

export default router;
