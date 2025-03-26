import express from "express";
import {
    driverUpdateStatus,
    createCallTaxi,
    getDriverCallTaxis,
    getUserCallTaxis,
    updateCallTaxis,
    chatCallTaxi,
    updateStartAndComment,
    getComentAndRating,
    callTaxiTotalPrice
} from "../controllers/callTaxi"
import { validateParamID } from "../utils/validateParamId";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createCallTaxi);

router.get("/user-history", checkAuthorizationMiddleware, getUserCallTaxis);

router.get("/driver-history", checkAuthorizationMiddleware, getDriverCallTaxis);

router.put("/:id", validateParamID, checkAuthorizationMiddleware, updateCallTaxis,);

router.put("/driver-confirm/:id", checkAuthorizationMiddleware, driverUpdateStatus,);


router.get("/total-price",checkAuthorizationMiddleware,callTaxiTotalPrice,);

router.get("/comment-rating/:id",checkAuthorizationMiddleware,getComentAndRating,);

router.put("/rating-comment/:id",checkAuthorizationMiddleware,updateStartAndComment,)


router.put("/chat-call-taxi/:id",checkAuthorizationMiddleware,chatCallTaxi,);

export default router;
