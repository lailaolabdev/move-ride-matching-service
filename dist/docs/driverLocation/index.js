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
 * /api/v1/driver-location:
 *   post:
 *     summary: Create a driver location
 *     description: Create a driver location with specified attributes.
 *     tags:
 *       - Driver location
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: string
 *                 description: latitude
 *                 example:
 *               longitude:
 *                 type: string
 *                 description: longitude
 *                 example:
 *               area:
 *                 type: number
 *                 description: area
 *                 example: area
 *     responses:
 *       201:
 *         description: Vehicle created successfully.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/driver-location:
 *   get:
 *     summary: Get all driver location
 *     description: Retrieve a list of all available driver location with optional pagination.
 *     tags:
 *       - Driver location
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
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/driver-location/{id}:
 *   get:
 *     summary: Get driver location by ID
 *     description: Retrieve a specific driver location by its ID.
 *     tags:
 *       - Driver location
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
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/driver-location:
 *   put:
 *     summary: Update a driver location
 *     description: Update the details (such as model, brand, fares) of an existing driver location.
 *     tags:
 *       - Driver location
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: string
 *                 description: latitude
 *                 example: "17.974855"
 *               longitude:
 *                 type: string
 *                 description: longitude
 *                 example: "102.630867"
 *               area:
 *                 type: number
 *                 description: area
 *                 example: area
 *               isOnline:
 *                 type: boolean
 *                 description: is driver online or not
 *                 example: true
 *     responses:
 *       200:
 *         description: Vehicle updated successfully.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/driver-location/{id}:
 *   delete:
 *     summary: Delete a driver location
 *     description: Delete an existing driver location from the system by its ID.
 *     tags:
 *       - Driver location
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
 *       500:
 *         description: Internal server error.
 */
