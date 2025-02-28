"use strict";
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /v1/api/calculate/distance:
 *   post:
 *     summary: Calculate duration, distance, and price
 *     description: Calculates duration, distance, and price based on specified attributes.
 *     tags:
 *       - Calculation
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *                 description: The origin for the start point.
 *                 example: "17.9935451,102.5712961"
 *               destination:
 *                 type: string
 *                 description: The destination for the end point.
 *                 example: "17.971523,102.6200467"
 *     responses:
 *       200:
 *         description: Calculation successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-200"
 *                 message:
 *                   type: string
 *                   example: "Create successful"
 *                 calculation:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "001"
 *                       image:
 *                         type: string
 *                         example: ""
 *                       cartType:
 *                         type: string
 *                         example: "suv"
 *                       distanceInPolygon:
 *                         type: number
 *                         example: 3.16
 *                       durationInPolygon:
 *                         type: number
 *                         example: 9.75
 *                       normalDuration:
 *                         type: number
 *                         example: 17.9
 *                       delayDuration:
 *                         type: number
 *                         example: 2.8
 *                       delayDistance:
 *                         type: number
 *                         example: 1.06
 *                       totalDuration:
 *                         type: number
 *                         example: 20.7
 *                       totalDistance:
 *                         type: number
 *                         example: 6.81
 *                       totalPrice:
 *                         type: number
 *                         example: 75.77
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "INTERNAL_SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */ 
