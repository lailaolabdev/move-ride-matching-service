"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     DriverRate:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6811c9fa4075cef8167dba86"
 *         taxiType:
 *           type: string
 *           example: "60f8f3f995d3d344dcf8a123"
 *         minDistance:
 *           type: number
 *           example: 0
 *         maxDistance:
 *           type: number
 *           example: 10
 *         percentage:
 *           type: number
 *           example: 7
 *         createdBy:
 *           type: string
 *           example: "admin123"
 *         createdByFullName:
 *           type: string
 *           example: "Admin User"
 *         updatedBy:
 *           type: string
 *           example: "admin123"
 *         updatedByFullName:
 *           type: string
 *           example: "Admin User"
 *         country:
 *           type: string
 *           example: "LA"
 *         countryCode:
 *           type: string
 *           example: "67c6c05bd9ba8fe6164eac3f"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-30T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-30T12:00:00.000Z"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /api/v1/driver-rate:
 *   post:
 *     summary: Create a new driver rate
 *     tags:
 *       - DriverRate
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverRate'
 *     responses:
 *       201:
 *         description: Driver rate created successfully
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
 *                   example: "Driver rate created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/DriverRate'
 */
/**
 * @swagger
 * /api/v1/driver-rate:
 *   get:
 *     summary: Get all driver rates
 *     tags:
 *       - DriverRate
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: List of driver rates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DriverRate'
 */
/**
 * @swagger
 * /api/v1/driver-rate/{id}:
 *   get:
 *     summary: Get a driver rate by ID
 *     tags:
 *       - DriverRate
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Driver rate found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/DriverRate'
 */
/**
 * @swagger
 * /api/v1/driver-rate:
 *   put:
 *     summary: Update a driver rate
 *     tags:
 *       - DriverRate
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverRate'
 *     responses:
 *       200:
 *         description: Driver rate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "UPDATE_SUCCESSFUL"
 *                 message:
 *                   type: string
 *                   example: "Driver rate updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/DriverRate'
 */
/**
 * @swagger
 * /api/v1/driver-rate/{id}:
 *   delete:
 *     summary: Delete a driver rate
 *     tags:
 *       - DriverRate
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Driver rate deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "DELETE_SUCCESSFUL"
 *                 message:
 *                   type: string
 *                   example: "Driver rate deleted successfully"
 */
