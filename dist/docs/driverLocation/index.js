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
 *               location:
 *                 type: object
 *                 description: GeoJSON location object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [Point]
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     minItems: 2
 *                     maxItems: 2
 *                     example: [102.5712961, 17.9935451]
 *     responses:
 *       201:
 *         description: Driver location created successfully.
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
 *         description: Successfully fetched all driver locations.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/driver-location/{id}:
 *   get:
 *     summary: Get driver location by token
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
 *           example: "6811c9fa4075cef8167dba86"
 *         description: The ID of the driver location to get.
 *     responses:
 *       200:
 *         description: Successfully fetched driver location.
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
 *               location:
 *                 type: object
 *                 description: GeoJSON location object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [Point]
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     minItems: 2
 *                     maxItems: 2
 *                     example: [102.5712961, 17.9935451]
 *     responses:
 *       200:
 *         description: Driver location updated successfully.
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
 *         description: The ID of the driver location to delete.
 *     responses:
 *       200:
 *         description: driver location deleted successfully.
 *       500:
 *         description: Internal server error.
 */
