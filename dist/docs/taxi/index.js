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
 * /api/v1/taxies:
 *   post:
 *     summary: Create a new taxi
 *     description: Create a new taxi with specified attributes.
 *     tags:
 *       - Taxi
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taxiType:
 *                 type: string
 *                 description: The ID of the taxi type associated with the vehicle.
 *                 example: "63d2fcd0c90a5300188b4567"
 *               vehicleModel:
 *                 type: string
 *                 description: The model of the vehicle .
 *                 example: "67a1ce8b193fd938219965f0"
 *               vehicleModelName:
 *                 type: string
 *                 description: The model of the vehicle name.
 *                 example: Model Y
 *               vehicleBrand:
 *                 type: string
 *                 description: The brand of the vehicle.
 *                 example: "67a1ce3e193fd938219965e3"
 *               vehicleBrandName:
 *                 type: string
 *                 description: The brand name of the taxi.
 *                 example: Tesla
 *               passengerMin:
 *                 type: integer
 *                 description: The minimum number of passengers the vehicle can accommodate.
 *                 example: 2
 *               passengerMax:
 *                 type: integer
 *                 description: The maximum number of passengers the vehicle can accommodate.
 *                 example: 5
 *               meteredFare:
 *                 type: number
 *                 description: The metered fare for the vehicle's ride.
 *                 example: 10.5
 *               flatFare:
 *                 type: number
 *                 description: The flat fare for the vehicle's ride.
 *                 example: 15
 *     responses:
 *       201:
 *         description: Vehicle created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "CREATE_SUCCESSFUL"
 *                 message:
 *                   type: string
 *                   example: "Vehicle created successfully"
 *                 vehicle:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Vehicle ID.
 *                       example: "63d2fcd0c90a5300188b4567"
 *                     vehicleModel:
 *                       type: string
 *                       description: Vehicle model.
 *                       example: "Toyota Camry"
 *                     vehicleBrand:
 *                       type: string
 *                       description: Vehicle brand.
 *                       example: "Toyota"
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
 * /api/v1/taxies:
 *   get:
 *     summary: Get all taxis
 *     description: Retrieve a list of all available taxis with optional pagination.
 *     tags:
 *       - Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *         description: The number of records to skip for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 50
 *         description: The maximum number of records to return for pagination.
 *     responses:
 *       200:
 *         description: Successfully fetched all vehicles.
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
 *                   example: "Vehicles fetched successfully"
 *                 vehicles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Vehicle ID.
 *                         example: "63d2fcd0c90a5300188b4567"
 *                       vehicleModel:
 *                         type: string
 *                         description: Vehicle model.
 *                         example: "Toyota Camry"
 *                       vehicleBrand:
 *                         type: string
 *                         description: Vehicle brand.
 *                         example: "Toyota"
 *                       passengerMin:
 *                         type: integer
 *                         description: Minimum passengers.
 *                         example: 2
 *                       passengerMax:
 *                         type: integer
 *                         description: Maximum passengers.
 *                         example: 5
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
 * /api/v1/taxies/{id}:
 *   get:
 *     summary: Get taxi by ID
 *     description: Retrieve a specific taxi by its ID.
 *     tags:
 *       - Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the vehicle to fetch.
 *     responses:
 *       200:
 *         description: Successfully fetched vehicle.
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
 *                   example: "Vehicle fetched successfully"
 *                 vehicle:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Vehicle ID.
 *                       example: "63d2fcd0c90a5300188b4567"
 *                     vehicleModel:
 *                       type: string
 *                       description: Vehicle model.
 *                       example: "Toyota Camry"
 *                     vehicleBrand:
 *                       type: string
 *                       description: Vehicle brand.
 *                       example: "Toyota"
 *       404:
 *         description: Vehicle not found.
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
 *                   example: "Vehicle not found"
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
 * /api/v1/taxies/{id}:
 *   put:
 *     summary: Update a taxi
 *     description: Update the details (such as model, brand, fares) of an existing taxi.
 *     tags:
 *       - Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the vehicle to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleModel:
 *                 type: string
 *                 description: The model of the vehicle.
 *                 example: "Toyota Camry"
 *               vehicleBrand:
 *                 type: string
 *                 description: The brand of the vehicle.
 *                 example: "Toyota"
 *               passengerMin:
 *                 type: integer
 *                 description: The minimum number of passengers.
 *                 example: 2
 *               passengerMax:
 *                 type: integer
 *                 description: The maximum number of passengers.
 *                 example: 5
 *               meteredFare:
 *                 type: number
 *                 description: The metered fare for the vehicle.
 *                 example: 10.5
 *               flatFare:
 *                 type: number
 *                 description: The flat fare for the vehicle.
 *                 example: 15
 *     responses:
 *       200:
 *         description: Vehicle updated successfully.
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
 *                   example: "Vehicle updated successfully"
 *                 updatedVehicle:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Vehicle ID.
 *                       example: "63d2fcd0c90a5300188b4567"
 *                     vehicleModel:
 *                       type: string
 *                       description: Vehicle model.
 *                       example: "Toyota Camry"
 *                     vehicleBrand:
 *                       type: string
 *                       description: Vehicle brand.
 *                       example: "Toyota"
 *       404:
 *         description: Vehicle not found.
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
 *                   example: "Vehicle not found"
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
 * /api/v1/taxies/{id}:
 *   delete:
 *     summary: Delete a taxi
 *     description: Delete an existing taxi from the system by its ID.
 *     tags:
 *       - Taxi
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the vehicle to delete.
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully.
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
 *                   example: "Vehicle deleted successfully"
 *       404:
 *         description: Vehicle not found.
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
 *                   example: "Vehicle not found"
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
