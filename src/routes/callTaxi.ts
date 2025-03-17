import express from "express";
import {
    driverUpdateStatus,
    createCallTaxi,
    getDriverCallTaxis,
    getUserCallTaxis,
    updateCallTaxis,
    callTaxiTotalPrice,
    updateStartAndComment,
    chatCallTaxi,
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
// rating and comment the driver
router.put(
    "/rating-comment/:id",
    checkAuthorizationMiddleware,
    updateStartAndComment,
);

// chat when call taxi
router.put(
    "/chat-call-taxi/:id",
    checkAuthorizationMiddleware,
    chatCallTaxi,
);


export default router;
