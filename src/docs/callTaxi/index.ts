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
 *       - Call Taxi
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
 *               requestType:
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

/**
 * @swagger
 * /v1/api/call-taxi/driver-confirm/{id}:
 *   put:
 *     summary: Update a Calling taxi
 *     description: Update the name or icon of an existing calling taxi.
 *     tags:
 *       - Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Calling taxi updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 message:
 *                   type: string
 *                   example: "Taxi Type updated successfully"
 *                 updatedTaxiType:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Taxi Type ID.
 *                       example: "63d2fcd0c90a5300188b4567"
 *                     name:
 *                       type: string
 *                       description: Taxi Type name.
 *                       example: "Luxury Sedan"
 *                     icon:
 *                       type: string
 *                       description: Taxi Type icon.
 *                       example: "luxury_sedan_icon.png"
 *       404:
 *         description: This ride request was taken.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "This ride request was taken"
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
// history 

/**
 * @swagger
 * /v1/api/call-taxi/ride-history/{id}:
 *   get:
 *     summary: Retrieve ride history
 *     description: Fetches the ride history for a user, including details such as total distance traveled.
 *     tags:
 *       - Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Ride history retrieved successfully.
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
 *                   example: "Successfully"
 *                 History:
 *                   type: object
 *                   properties:
 *                     origin:
 *                       type: string
 *                       description: Taxi Type ID.
 *                       example: "17.967290, 102.608902"
 *                     destination:
 *                       type: string
 *                       description: Taxi Type name.
 *                       example: "17.971523,102.6200467"
 *                     totalDistance:
 *                       type: number
 *                       description: Taxi Type icon.
 *                       example: 7.13
 *                     totalPrice:
 *                       type: number
 *                       description: Taxi Type icon.
 *                       example: 78.4
 *                     date:
 *                       type: string
 *                       description: Taxi Type icon.
 *                       example: "19/03/2025 13:29"
 *                     
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
 * /v1/api/call-taxi/last-ride/{id}:
 *   get:
 *     summary: Retrieve the last ride for a passenger
 *     description: Fetches the most recent ride record for a passenger based on their ID.
 *     tags:
 *       -  Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Last ride retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 message:
 *                   type: string
 *                   example: "Last ride retrieved successfully"
 *                 lastRide:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Ride ID.
 *                       example: "67d9305b5da6b7f2b97ff39a"
 *                     passengerId:
 *                       type: string
 *                       description: Passenger ID.
 *                       example: "67d9305b5da6b7f2b97ff39a"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the ride was created.
 *                       example: "2023-10-01T12:34:56Z"
 *                     status:
 *                       type: string
 *                       description: Status of the ride (e.g., completed, canceled).
 *                       example: "PAID"
 *     
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
 */


/**
 * @swagger
 * /v1/api/call-taxi/total-distance/{id}:
 *   get:
 *     summary: Retrieve total distance traveled by a passenger
 *     description: Fetches the total distance traveled by a passenger for rides with a status of "Requesting".
 *     tags:
 *       -  Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67da485d396c4f9db4ccafad"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Total distance retrieved successfully.
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
 *                   example: "Successfully"
 *                 totalDistance:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Passenger ID.
 *                       example: "67d9305b5da6b7f2b97ff39a"
 *                     totalDistance:
 *                       type: number
 *                       description: Total distance traveled (in kilometers or miles).
 *                       example: 125.75
 *     
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
 *                
 */

/**
 * @swagger
 * /v1/api/call-taxi/total-ride/{id}:
 *   get:
 *     summary: Retrieve total ride of a passenger
 *     description: Fetches the total total by a passenger.
 *     tags:
 *       -  Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67da485d396c4f9db4ccafad"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Total distance retrieved successfully.
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
 *                   example: "Successfully"
 *                 totalRides:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Passenger ID.
 *                       example: "67d9305b5da6b7f2b97ff39a"
 *                     totalRides:
 *                       type: number
 *                       description: Total distance traveled (in kilometers or miles).
 *                       example: 10
 *     
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
 *                
 */

/**
 * @swagger
 * /v1/api/call-taxi/total-meter/{id}:
 *   get:
 *     summary: Retrieve total travel type request meter
 *     description: Fetches the total travel as meter by a passenger.
 *     tags:
 *       -  Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67da485d396c4f9db4ccafad"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Total distance retrieved successfully.
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
 *                   example: "Successfully"
 *                 totalMeter:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Passenger ID.
 *                       example: "67d9305b5da6b7f2b97ff39a"
 *                     totalMeter:
 *                       type: number
 *                       description: Total distance traveled (in kilometers or miles).
 *                       example: 0
 *     
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
 *                
 */

/**
 * @swagger
 * /v1/api/call-taxi/flat-fare/{id}:
 *   get:
 *     summary: Retrieve total travel type request flat_fare
 *     description: Fetches the total travel as flat_fare by a passenger.
 *     tags:
 *       -  Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67da485d396c4f9db4ccafad"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Total distance retrieved successfully.
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
 *                   example: "Successfully"
 *                 totalFlatFare:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Passenger ID.
 *                       example: "67d9305b5da6b7f2b97ff39a"
 *                     totalFlatFare:
 *                       type: number
 *                       description: Total distance traveled (in kilometers or miles).
 *                       example: 1
 *     
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
 *                
 */

/**
 * @swagger
 * /v1/api/call-taxi/total-travel/{id}:
 *   get:
 *     summary: Retrieve total travel for a passenger
 *     description: Fetches the total travel by a passenger.
 *     tags:
 *       -  Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67da485d396c4f9db4ccafad"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Total distance retrieved successfully.
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
 *                   example: "Successfully"
 *                 totalTravel:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Passenger ID.
 *                       example: "67d9305b5da6b7f2b97ff39a"
 *                     totalTravel:
 *                       type: number
 *                       description: Total distance traveled (in kilometers or miles).
 *                       example: 1
 *     
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
 *                
 */



/**
 * @swagger
 * /v1/api/call-taxi/travel-history/{id}:
 *   get:
 *     summary: Retrieve ride history
 *     description: Fetches the ride history for a user, including details such as total distance traveled.
 *     tags:
 *       - Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67da485d396c4f9db4ccafad"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Ride history retrieved successfully.
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
 *                   example: "Successfully"
 *                 History:
 *                   type: object
 *                   properties:
 *                     origin:
 *                       type: string
 *                       description: Taxi Type ID.
 *                       example: "17.967290, 102.608902"
 *                     destination:
 *                       type: string
 *                       description: Taxi Type name.
 *                       example: "17.971523,102.6200467"
 *                     totalDistance:
 *                       type: number
 *                       description: Taxi Type icon.
 *                       example: 7.13
 *                     totalPrice:
 *                       type: number
 *                       description: Taxi Type icon.
 *                       example: 78.4
 *                     date:
 *                       type: string
 *                       description: Taxi Type icon.
 *                       example: "19/03/2025 13:29"
 *                     
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
 * /v1/api/call-taxi/cancel-history/{id}:
 *   get:
 *     summary: Retrieve ride history
 *     description: Fetches the ride history for a user, including details such as total distance traveled.
 *     tags:
 *       - Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67da485d396c4f9db4ccafad"
 *         description: The ID of the taxi type to be updated.
 *     responses:
 *       200:
 *         description: Ride history retrieved successfully.
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
 *                   example: "Successfully"
 *                 History:
 *                   type: object
 *                   properties:
 *                     origin:
 *                       type: string
 *                       description: Taxi Type ID.
 *                       example: "17.967290, 102.608902"
 *                     destination:
 *                       type: string
 *                       description: Taxi Type name.
 *                       example: "17.971523,102.6200467"
 *                     totalDistance:
 *                       type: number
 *                       description: Taxi Type icon.
 *                       example: 7.13
 *                     totalPrice:
 *                       type: number
 *                       description: Taxi Type icon.
 *                       example: 78.4
 *                     date:
 *                       type: string
 *                       description: Taxi Type icon.
 *                       example: "19/03/2025 13:29"
 *                     
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