import express from "express";
import {
    driverUpdateStatus,
    createCallTaxi,
    getDriverCallTaxis,
    getUserCallTaxis,
    updateCallTaxis,
    callTaxiTotalPrice,
    // callTaxiStarDateAndEndDateTotalPriceReport
} from "../controllers/callTaxi"
import { validateParamID } from "../utils/validateParamId";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post(
    "/",
    // checkAuthorizationMiddleware,
    createCallTaxi,
);

router.get(
    "/user-history",
    checkAuthorizationMiddleware,
    getUserCallTaxis,
);

router.get(
    "/driver-history",
    checkAuthorizationMiddleware,
    getDriverCallTaxis,
);
// get total price of call taxi
router.get(
    "/total-price",
    checkAuthorizationMiddleware,
    callTaxiTotalPrice,
);
// get total price of call taxi  by start date and end date
// router.get(
//     "/startDate-endDate",
//     checkAuthorizationMiddleware,
//     callTaxiStarDateAndEndDateTotalPriceReport,
// );

router.put(
    "/:id",
    validateParamID,
    checkAuthorizationMiddleware,
    updateCallTaxis,
);

router.put(
    "/driver-confirm/:id",
    checkAuthorizationMiddleware,
    driverUpdateStatus,
);


export default router;
