/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /v1/api/calculate/passenger:
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
 *                 meter:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "67c5587478a1f4ee9d92f75a"
 *                       image:
 *                         type: string
 *                         example: "f20acc36-c8a5-44c0-9afd-84020e3b3d0a.png"
 *                       cartType:
 *                         type: string
 *                         example: "type 1"
 *                       seats:
 *                         type: integer
 *                         example: 4
 *                       meterPrice:
 *                         type: number
 *                         example: 11
 *                       polygonPrice:
 *                         type: number
 *                         example: 30.4
 *                       onPeakTimePrice:
 *                         type: number
 *                         example: 10
 *                       delayPrice:
 *                         type: number
 *                         example: 10
 *                       distanceInPolygon:
 *                         type: number
 *                         example: 1.52
 *                       durationInPolygon:
 *                         type: number
 *                         example: 4.17
 *                       priceInPolygon:
 *                         type: number
 *                         example: 30.4
 *                       normalDuration:
 *                         type: number
 *                         example: 18.62
 *                       delayDuration:
 *                         type: number
 *                         example: 0.25
 *                       delayDistance:
 *                         type: number
 *                         example: 0.09
 *                       totalDuration:
 *                         type: number
 *                         example: 18.87
 *                       totalDistance:
 *                         type: number
 *                         example: 6.85
 *                       actualCalculate:
 *                         type: number
 *                         example: 177
 *                       estimatedCalculate:
 *                         type: number
 *                         example: 207
 *                 flatFare:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "67c5587478a1f4ee9d92f75a"
 *                       image:
 *                         type: string
 *                         example: "f20acc36-c8a5-44c0-9afd-84020e3b3d0a.png"
 *                       cartType:
 *                         type: string
 *                         example: "type 1"
 *                       seats:
 *                         type: integer
 *                         example: 4
 *                       meterPrice:
 *                         type: number
 *                         example: 11
 *                       polygonPrice:
 *                         type: number
 *                         example: 30.4
 *                       onPeakTimePrice:
 *                         type: number
 *                         example: 10
 *                       delayPrice:
 *                         type: number
 *                         example: 10
 *                       distanceInPolygon:
 *                         type: number
 *                         example: 1.52
 *                       durationInPolygon:
 *                         type: number
 *                         example: 4.17
 *                       priceInPolygon:
 *                         type: number
 *                         example: 30.4
 *                       normalDuration:
 *                         type: number
 *                         example: 18.62
 *                       delayDuration:
 *                         type: number
 *                         example: 0.25
 *                       delayDistance:
 *                         type: number
 *                         example: 0.09
 *                       totalDuration:
 *                         type: number
 *                         example: 18.87
 *                       totalDistance:
 *                         type: number
 *                         example: 6.85
 *                       totalPrice:
 *                         type: number
 *                         example: 170
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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /v1/api/calculate/driver:
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