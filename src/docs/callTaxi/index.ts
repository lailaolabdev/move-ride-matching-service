/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /v1/api/call-taxi:
 *   post:
 *     summary: Call taxi
 *     description: Call taxi with specified attributes.
 *     tags:
 *       - CallTaxi
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carTypeId:
 *                 type: string
 *                 description: The ID of the car type.
 *                 example: "testId"
 *               driverId:
 *                 type: string
 *                 description: The ID of the driver.
 *                 example: "testId"
 *               origin:
 *                 type: string
 *                 description: The origin coordinates.
 *                 example: "17.9935451,102.5712961"
 *               destination:
 *                 type: string
 *                 description: The destination coordinates.
 *                 example: "17.971523,102.6200467"
 *               type:
 *                 type: string
 *                 description: The fare type.
 *                 example: "flat_fare"
 *               distanceInPolygon:
 *                 type: number
 *                 example: 1.59
 *               durationInPolygon:
 *                 type: number
 *                 example: 4.57
 *               normalDuration:
 *                 type: number
 *                 example: 18.73
 *               delayDuration:
 *                 type: number
 *                 example: 2.48
 *               delayDistance:
 *                 type: number
 *                 example: 0.94
 *               totalDuration:
 *                 type: number
 *                 example: 21.22
 *               totalDistance:
 *                 type: number
 *                 example: 7.13
 *               totalPrice:
 *                 type: number
 *                 example: 78.4
*     responses:
 *       200:
 *         description: Ride request created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-201"
 *                 message:
 *                   type: string
 *                   example: "Create successful"
 *                 rideRequest:
 *                   type: object
 *                   properties:
 *                     passengerId:
 *                       type: string
 *                       example: "testId"
 *                     carTypeId:
 *                       type: string
 *                       example: "testId"
 *                     driverId:
 *                       type: string
 *                       example: "testId"
 *                     origin:
 *                       type: string
 *                       example: "17.9935451,102.5712961"
 *                     destination:
 *                       type: string
 *                       example: "17.971523,102.6200467"
 *                     type:
 *                       type: string
 *                       example: "flat_fare"
 *                     distanceInPolygon:
 *                       type: number
 *                       example: 1.59
 *                     durationInPolygon:
 *                       type: number
 *                       example: 4.57
 *                     normalDuration:
 *                       type: number
 *                       example: 18.73
 *                     delayDuration:
 *                       type: number
 *                       example: 2.48
 *                     delayDistance:
 *                       type: number
 *                       example: 0.94
 *                     totalDuration:
 *                       type: number
 *                       example: 21.22
 *                     totalDistance:
 *                       type: number
 *                       example: 7.13
 *                     totalPrice:
 *                       type: number
 *                       example: 78.4
 *                     status:
 *                       type: string
 *                       example: "Requesting"
 *                     _id:
 *                       type: string
 *                       example: "67b6b4e6010cbd4f32fb8886"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-20T04:51:50.283Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-20T04:51:50.283Z"
 *                     __v:
 *                       type: number
 *                       example: 0
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