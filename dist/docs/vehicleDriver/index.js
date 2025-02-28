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
 * /api/v1/vehicle-drivers:
 *   post:
 *     summary: Assign a driver to a vehicle
 *     description: Assign a driver to a vehicle by specifying the taxi ID and driver ID.
 *     tags:
 *       - Vehicle Driver
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
 *                 description: The type of taxi.
 *                 example: "67adade798dbaf75e7730709"
 *               vehicleBrand:
 *                 type: string
 *                 description: The ID of the vehicle brand.
 *                 example: "67a1ce3e193fd938219965e3"
 *               vehicleModel:
 *                 type: string
 *                 description: The ID of the vehicle model.
 *                 example: "67a1ce8b193fd938219965f0"
 *               driver:
 *                 type: string
 *                 description: The ID of the driver.
 *                 example: "65abf7d25b2e3c001f7bcd12"
 *               driverFullName:
 *                 type: string
 *                 description: The full name of the driver.
 *                 example: "John Doe"
 *               licensePlate:
 *                 type: string
 *                 description: The license plate of the vehicle.
 *                 example: "ABC123"
 *               frontVehicleImage:
 *                 type: string
 *                 description: The front vehicle image.
 *                 example: "https://example.com/front-vehicle-image.jpg"
 *               backVehicleImage:
 *                 type: string
 *                 description: The back vehicle image.
 *                 example: "https://example.com/back-vehicle-image.jpg"
 *     responses:
 *       201:
 *         description: Vehicle Driver assigned successfully.
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
 *                   example: "Vehicle Driver created successfully"
 *                 vehicleDriver:
 *                   type: object
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/vehicle-drivers:
 *   get:
 *     summary: Get all vehicle-driver assignments
 *     description: Retrieve a list of all vehicle-driver relationships.
 *     tags:
 *       - Vehicle Driver
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: taxiType
 *         schema:
 *           type: string
 *           example: "67adade798dbaf75e7730709"
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Number of records to skip for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 50
 *         description: Maximum number of records to return for pagination.
 *     responses:
 *       200:
 *         description: Successfully fetched all vehicle-driver relationships.
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
 *                   example: "Vehicle Drivers fetched successfully"
 *                 vehicleDrivers:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/vehicle-drivers/{id}:
 *   get:
 *     summary: Get a vehicle-driver relationship by ID
 *     description: Retrieve details of a specific vehicle-driver relationship by ID.
 *     tags:
 *       - Vehicle Driver
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "65abf7d25b2e3c001f7bcd90"
 *         description: The ID of the vehicle-driver relationship.
 *     responses:
 *       200:
 *         description: Successfully fetched vehicle-driver details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Vehicle Driver not found.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/vehicle-drivers/{id}:
 *   put:
 *     summary: Update a vehicle-driver relationship
 *     description: Update the assignment details of a driver to a vehicle.
 *     tags:
 *       - Vehicle Driver
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "65abf7d25b2e3c001f7bcd90"
 *         description: The ID of the vehicle-driver relationship to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taxiType:
 *                 type: string
 *                 description: The type of taxi.
 *                 example: "67adade798dbaf75e7730709"
 *               vehicleBrand:
 *                 type: string
 *                 description: The ID of the vehicle brand.
 *                 example: "67a1ce3e193fd938219965e3"
 *               vehicleModel:
 *                 type: string
 *                 description: The ID of the vehicle model.
 *                 example: "67a1ce8b193fd938219965f0"
 *               taxi:
 *                 type: string
 *                 description: The ID of the vehicle.
 *                 example: "65abf7d25b2e3c001f7bcd90"
 *               driver:
 *                 type: string
 *                 description: The ID of the driver.
 *                 example: "65abf7d25b2e3c001f7bcd12"
 *               driverFullName:
 *                 type: string
 *                 description: The full name of the driver.
 *                 example: "John Doe"
 *               licensePlate:
 *                 type: string
 *                 description: The license plate of the vehicle.
 *                 example: "ABC123"
 *               frontVehicleImage:
 *                 type: string
 *                 description: The front image of the vehicle.
 *                 example: "https://example.com/front_image.jpg"
 *               backVehicleImage:
 *                 type: string
 *                 description: The back image of the vehicle.
 *                 example: "https://example.com/back_image.jpg"
 *     responses:
 *       200:
 *         description: Vehicle Driver updated successfully.
 *       404:
 *         description: Vehicle Driver not found.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/vehicle-drivers/{id}:
 *   delete:
 *     summary: Delete a vehicle-driver relationship
 *     description: Remove a vehicle-driver assignment from the system by its ID.
 *     tags:
 *       - Vehicle Driver
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "65abf7d25b2e3c001f7bcd90"
 *         description: The ID of the vehicle-driver relationship to delete.
 *     responses:
 *       200:
 *         description: Vehicle driver deleted successfully.
 *       404:
 *         description: Vehicle driver not found.
 *       500:
 *         description: Internal server error.
 */
