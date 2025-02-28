const jwt = require("jsonwebtoken");
import type { Request, Response, NextFunction } from "express";
import { messages } from "../config";
import dotenv from "dotenv";

dotenv.config();


export const checkAuthorizationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {

	try {
		const token = req.headers["authorization"];
		if (token) {
			const accessToken: string = token.replace("Bearer ", "");
			const payloadData = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
			(req as any).user = payloadData;
		} else {
			res.status(401).json({
				code: messages.UNAUTHORIZED.code,
				message: messages.UNAUTHORIZED.message,
				detail: "Unauthorized",
			});
			return;
		}
		next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			res.status(401).json({
				code: messages.UNAUTHORIZED.code,
				message: messages.UNAUTHORIZED.message,
				detail: "Your session has expired. Please log in again.",
			});
			return
		}
		res.status(401).json({
			code: messages.UNAUTHORIZED.code,
			message: messages.UNAUTHORIZED.message,
			detail: "Invalid or malformed token.",
		});
	}
};

export const checkAuthorizationManagerRole = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const user = (req as any).user;
	if (user.role !== "TAXI_MANAGER") {
		res.status(403).json({
			code: messages.FORBIDDEN.code,
			message: messages.FORBIDDEN.message,
			detail: "Permission denied",
		});
		return;
	}
	next();
};

export const checkAuthorizationStaffRole = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const user = (req as any).user;
	if (user.role !== "TAXI_STAFF" || user.role !== "TAXI_MANAGER") {
		res.status(403).json({
			code: messages.FORBIDDEN.code,
			message: messages.FORBIDDEN.message,
			detail: "Permission denied",
		});
		return;
	}
	next();
};

export const checkAuthorizationAdminRole = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const user = (req as any).user;
	if (
		user.role !== "TAXI_ADMIN" &&
		user.role !== "TAXI_STAFF" &&
		user.role !== "TAXI_MANAGER"
	) {
		res.status(403).json({
			code: messages.FORBIDDEN.code,
			message: messages.FORBIDDEN.message,
			detail: "Permission denied",
		});
		return;
	}
	next();
};