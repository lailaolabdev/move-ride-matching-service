"use strict";
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
 *   get:
 *     summary: Get all taxi calls with optional filters
 *     tags:
 *       - Call Taxi
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for filtering createdAt
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for filtering createdAt
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum total price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum total price
 *       - in: query
 *         name: minTotalDistance
 *         schema:
 *           type: number
 *         description: Minimum trip duration
 *       - in: query
 *         name: maxTotalDistance
 *         schema:
 *           type: number
 *         description: Maximum trip duration
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for passenger or driver by full name
 *     responses:
 *       200:
 *         description: List of taxi call records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 callTaxi:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       billNumber:
 *                         type: string
 *                       passengerId:
 *                         type: string
 *                       passengerFullname:
 *                         type: string
 *                       driverId:
 *                         type: string
 *                       driverFullname:
 *                         type: string
 *                       originName:
 *                         type: string
 *                       destinationName:
 *                         type: string
 *                       totalDistance:
 *                         type: number
 *                       totalDuration:
 *                         type: number
 *                       totalPrice:
 *                         type: number
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       currency:
 *                         type: string
 *                         example: "LAK"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /v1/api/call-taxi/update/claim-money:
 *   put:
 *     summary: Update claimMoney for a driver's unclaimed rides
 *     description: Update the `claimMoney` field for all documents where the driverId matches the given id and isClaim is false.
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
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "683d1c1f71cc2d05068644e7"
 *                 description: List of CallTaxi IDs to update
 *               claimMoney:
 *                 type: string
 *                 example: "685a07d4ffb74ef043512cfb"
 *               isClaim:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - claimMoney
 *     responses:
 *       200:
 *         description: Claim money updated successfully.
 *       400:
 *         description: Invalid input (claimMoney is missing).
 *       404:
 *         description: No matching documents found for this driver.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /v1/api/call-taxi/{id}:
 *   get:
 *     summary: Get passenger complain
 *     description: Get passenger complain by passenger id
 *     tags:
 *       - Call Taxi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "683d1c1f71cc2d05068644e7"
 *         description: The ID of passenger to be get passenger complains.
 *     responses:
 *       200:
 *         description: Calling taxi updated successfully.
 *       404:
 *         description: This ride request was taken.
 *       500:
 *         description: Internal server error.
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
 *                 description: The ID of the taxi type.
 *                 example: "67c5587478a1f4ee9d92f75a"
 *               origin:
 *                 type: string
 *                 description: The origin coordinates.
 *                 example: "17.9935451,102.5712961"
 *               destination:
 *                 type: string
 *                 description: The destination coordinates.
 *                 example: "17.971523,102.6200467"
 *               originName:
 *                 type: string
 *                 description: The origin coordinates.
 *                 example: "origin name"
 *               destinationName:
 *                 type: string
 *                 description: The destination coordinates.
 *                 example: "Destination name"
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
 *               price:
 *                 type: number
 *                 example: 21.22
 *               polygonPrice:
 *                 type: number
 *                 example: 7.13
 *               onPeakTimePrice:
 *                 type: number
 *                 example: 78.4
 *               delayPrice:
 *                 type: number
 *                 example: 78.4
 *               country:
 *                 type: string
 *                 example: 67c6c05bd9ba8fe6164eac3f
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
 * /v1/api/call-taxi/passenger-complain/{id}:
 *   get:
 *     summary: Get passenger complain
 *     description: Get passenger complain by passenger id
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
 *         description: The ID of passenger to be get passenger complains.
 *     responses:
 *       200:
 *         description: Calling taxi updated successfully.
 *       404:
 *         description: This ride request was taken.
 *       500:
 *         description: Internal server error.
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
 * /v1/api/call-taxi/ride-history/{id}:
 *   get:
 *     summary: Retrieve ride history ດຶງຂໍ້ມູນລ່າສຸດ ແລະ ປະຫວັດການເດີນທາງ
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
 *           example: "68254ea9e2f2e47753d2e00b"
 *         description: The ID of the driver location to get.
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
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique ID of the ride history record.
 *                         example: "6846514f5476c59644bd2872"
 *                       origin:
 *                         type: string
 *                         description: Coordinates of the ride's starting point.
 *                         example: "17.973677,102.664599"
 *                       destination:
 *                         type: string
 *                         description: Coordinates of the ride's destination.
 *                         example: "17.936424,102.671520"
 *                       originName:
 *                         type: string
 *                         description: Name or address of the starting location.
 *                         example: "Vientiane Vientiane"
 *                       destinationName:
 *                         type: string
 *                         description: Name or address of the destination location.
 *                         example: "0109, Vientiane"
 *                       totalPrice:
 *                         type: number
 *                         description: Price of the call taxi order.
 *                         example: 80
 *                       status:
 *                         type: string
 *                         description: Status of the call taxi order.
 *                         example: "Success"
 *                       invoiceRequestStatus:
 *                         type: boolean
 *                         description: Invoice request status of the call taxi order.
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the ride was created.
 *                         example: "2025-06-09T03:13:19.103Z"
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
 *           example: "68254ea9e2f2e47753d2e00b"
 *         description: The ID of the driver location to get.
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
 * /v1/api/call-taxi/total-distance:
 *   get:
 *     summary: Retrieve total distance traveled by a passenger
 *     description: Fetches the total distance traveled by a passenger for rides with a status of "Requesting".
 *     tags:
 *       -  Call Taxi
 *     security:
 *       - BearerAuth: []
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
 * /v1/api/call-taxi/total-ride:
 *   get:
 *     summary: Retrieve total ride of a passenger
 *     description: Fetches the total total by a passenger.
 *     tags:
 *       -  Call Taxi
 *     security:
 *       - BearerAuth: []
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
 * /v1/api/call-taxi/total-price:
 *   get:
 *     summary: Get total price of all call taxi and filter by date range
 *     description: Get total price of all call taxi and filter by date range
 *     tags:
 *       - Call Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         example: "2025-02-20T04:51:50.283Z"
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         example: "2025-02-20T04:51:50.283Z"
 *
 *     responses:
 *       200:
 *         description: Total price of all call taxi and filter by date range
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
 *                 totalPrice:
 *                   type: number
 *                   example: 12622.400000000001
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
 *                   example: "An unexpected error occurred"
 *                 detail:
 *                   type: string
 *                   example: "Error fetching tax info"
 */
/**
 * @swagger
 * /v1/api/call-taxi/rating-comment/{id}:
 *   put:
 *     summary: Update star and comment of a calling taxi
 *     description: Update star and comment of a calling taxi
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
 *           example: "67b758886ec0110acaac7d5c"
 *         description: The ID of the calling taxi to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: The rating of the calling taxi.
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: The comment of the calling taxi.
 *                 example: "Good service"
 *
 *     responses:
 *       '200':
 *         description: Successfully updated the star and comment of the calling taxi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-200"
 *                   description: The response code.
 *                 messages:
 *                   type: string
 *                   example: "Successfully"
 *                   description: The response message.
 *
 */
/**
 * @swagger
 * /v1/api/call-taxi/chat-call-taxi/{id}:
 *   put:
 *     summary: Update chat details for a specific call taxi by ID
 *     description: This endpoint updates the chat details (an array of chat messages) for a specific call taxi identified by its ID.
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
 *           example: "67b758886ec0110acaac7d5c"
 *         description: The unique identifier of the call taxi record to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *
 *               message:
 *                 type: string
 *                 description: The comment of the calling taxi.
 *                 example: "test"
 *
 *     responses:
 *       200:
 *         description: Chat details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-200"
 *                 messages:
 *                   type: string
 *                   example: "Successfully."
 */
/**
 * @swagger
 * /v1/api/call-taxi/comment-rating/{id}:
 *   get:
 *     summary: Get comments and ratings for a specific driver
 *     description: Retrieve all comments and ratings for a specific driver by their ID.
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
 *         description: The ID of the driver to retrieve comments and ratings for.
 *     responses:
 *       200:
 *         description: Successfully retrieved comments and ratings for the driver.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-19T08:26:41.760Z"
 *                       comment:
 *                         type: string
 *                         example: "well"
 *                       rating:
 *                         type: number
 *                         example: 1
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       profileImage:
 *                         type: string
 *                         nullable: true
 *                         example: null
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
 *                   example: "An unexpected error occurred"
 *                 detail:
 *                   type: string
 *                   example: "Error fetching comments and ratings"
 */
/**
 * @swagger
 * /v1/api/call-taxi/admin/update/status/{id}:
 *   put:
 *     summary: Update claimMoney by admin
 *     description: Update the `claimMoney` by admin.
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
 *           example: "68523e717b4de0edfd0f1ba1"
 *         description: The unique identifier of the call taxi record to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Canceled"
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Claim money updated successfully.
 *       400:
 *         description: Invalid input (claimMoney is missing).
 *       404:
 *         description: No matching documents found for this driver.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /v1/api/call-taxi/{id}:
 *   put:
 *     summary: Update call taxi details
 *     description: Update various fields of a call taxi record including status, pricing, and trip details.
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
 *           example: "67b758886ec0110acaac7d5c"
 *         description: The unique identifier of the call taxi record to update.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The request type of the call taxi.
 *                 example: "flat_fare"
 *               status:
 *                 type: string
 *                 description: The status of the call taxi.
 *                 enum: ["Requesting", "No_Received", "Accepted", "Driver_Arrived", "Picked_Up", "Departure", "Success", "Paid", "Canceled", "Timeout"]
 *                 example: "Paid"
 *               actualUsedTime:
 *                 type: string
 *                 description: The actual time used for the trip.
 *                 example: "00:25:30"
 *               claimMoney:
 *                 type: string
 *                 description: The claim money reference ID.
 *                 example: "685a07d4ffb74ef043512cfb"
 *               point:
 *                 type: number
 *                 description: Points earned from the trip.
 *                 example: 50
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method used.
 *                 example: "cash"
 *               promotionPrice:
 *                 type: number
 *                 description: The promotion price applied.
 *                 example: 10000
 *               festivalPromotion:
 *                 type: array
 *                 description: Array of festival promotions applied.
 *                 items:
 *                   type: object
 *                   properties:
 *                     promotion:
 *                       type: string
 *                       example: "67c5587478a1f4ee9d92f75a"
 *                     promotionName:
 *                       type: string
 *                       example: "New Year Special"
 *                     promotionPercentage:
 *                       type: number
 *                       example: 15
 *                     promotionType:
 *                       type: string
 *                       example: "percentage"
 *                     periodStartTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-01T00:00:00.000Z"
 *                     periodEndTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-31T23:59:59.999Z"
 *               totalPrice:
 *                 type: number
 *                 description: The total price of the trip.
 *                 example: 85000
 *               prepaid:
 *                 type: boolean
 *                 description: Whether the trip is prepaid.
 *                 example: false
 *               waitingPrepaid:
 *                 type: boolean
 *                 description: Whether waiting for prepaid confirmation.
 *                 example: false
 *               meterDistance:
 *                 type: number
 *                 description: The meter distance traveled.
 *                 example: 7.5
 *     responses:
 *       200:
 *         description: Call taxi updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-200"
 *                 messages:
 *                   type: string
 *                   example: "Successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67b758886ec0110acaac7d5c"
 *                     passengerId:
 *                       type: string
 *                       example: "67b758886ec0110acaac7d5c"
 *                     driverId:
 *                       type: string
 *                       example: "67b758886ec0110acaac7d5c"
 *                     status:
 *                       type: string
 *                       example: "Paid"
 *                     totalPrice:
 *                       type: number
 *                       example: 85000
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-20T04:51:50.283Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-20T04:51:50.283Z"
 *       400:
 *         description: Bad request - Invalid input or call taxi not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-404"
 *                 message:
 *                   type: string
 *                   example: "Not Found"
 *                 detail:
 *                   type: string
 *                   example: "Ride matching with id:67b758886ec0110acaac7d5c not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-500"
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */
/**
 * @swagger
 * /v1/api/call-taxi/check/promotion:
 *   post:
 *     summary: Check if a ONE_TIME_TYPE promotion has been used by the passenger
 *     description: Verify whether a specific ONE_TIME_TYPE promotion has already been used by the current passenger. This endpoint only checks for promotions that can only be used once per user.
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
 *             required:
 *               - promotion
 *               - passengerId
 *             properties:
 *               promotion:
 *                 type: string
 *                 description: The promotion ID to check (must be ONE_TIME_TYPE)
 *                 example: "60d5ecb8b3f1a20015c45678"
 *               passengerId:
 *                 type: string
 *                 description: The passenger ID to check promotion usage for
 *                 example: "60d5ecb8b3f1a20015c45679"
 *     responses:
 *       200:
 *         description: Successfully checked promotion usage
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
 *                   example: "Success"
 *                 isPromotionUsed:
 *                   type: boolean
 *                   description: Returns true if the ONCE_TIME_TYPE promotion has been used by the user, false otherwise
 *                   example: false
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-401"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-500"
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */
/**
 * @swagger
 * /v1/api/call-taxi/check/newcomer-promotion:
 *   post:
 *     summary: Check if a newcomer promotion has been used by the passenger
 *     description: Verify whether a specific newcomer promotion has already been used by the passenger. This endpoint checks the callTaxi collection to see if the user has previously used the newcomer promotion.
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
 *             required:
 *               - newcomerPromotionId
 *               - passengerId
 *             properties:
 *               newcomerPromotionId:
 *                 type: string
 *                 description: The newcomer promotion ID to check
 *                 example: "60d5ecb8b3f1a20015c45680"
 *               passengerId:
 *                 type: string
 *                 description: The passenger ID to check newcomer promotion usage for
 *                 example: "60d5ecb8b3f1a20015c45679"
 *     responses:
 *       200:
 *         description: Successfully checked newcomer promotion usage
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
 *                   example: "Success"
 *                 isNewcomerPromotionUsed:
 *                   type: boolean
 *                   description: Returns true if the newcomer promotion has been used by the user, false otherwise
 *                   example: false
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-401"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "EV-500"
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */
/**
 * @swagger
 * /v1/api/call-taxi/usage/check/new-comer-promotions/{userId}:
 *   get:
 *     summary: Check if a user has already used newcomer promotion
 *     tags:
 *       - Call Taxi
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to check promotion usage for
 *         example: "66556b3412ad2c5e13a1e888"
 *     responses:
 *       200:
 *         description: Usage check completed successfully
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
 *                   example: "Request successful"
 *                 hasUsed:
 *                   type: boolean
 *                   example: false
 *                   description: Whether the user has already used a newcomer promotion
 *                 usageDetails:
 *                   type: object
 *                   nullable: true
 *                   description: Details of the call taxi record where newcomer promotion was used, or null if not used
 *                   example: null
 *       400:
 *         description: Bad request - Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "MISSING_USER_ID"
 *                 message:
 *                   type: string
 *                   example: "User ID is required"
 *       500:
 *         description: Internal server error
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
 *                   example: "Internal Server Error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */
