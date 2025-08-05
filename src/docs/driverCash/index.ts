/**
 * @swagger
 * components:
 *   schemas:
 *     DriverCash:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64d28cfc9ec73e001e9f9e12"
 *         driver:
 *           type: string
 *           example: "driver123"
 *         amount:
 *           type: number
 *           example: 1000
 *         limit:
 *           type: number
 *           example: 5000
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-08-05T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-08-05T12:00:00.000Z"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/driver-cash:
 *   post:
 *     summary: Create a new driver cash record
 *     tags:
 *       - DriverCash
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverCash'
 *     responses:
 *       201:
 *         description: Driver cash created successfully
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
 *                   example: "Driver cash created successfully"
 *                 driverCash:
 *                   $ref: '#/components/schemas/DriverCash'
 */

/**
 * @swagger
 * /api/v1/driver-cash:
 *   get:
 *     summary: Get all driver cash records
 *     tags:
 *       - DriverCash
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
 *       - in: query
 *         name: driver
 *         schema:
 *           type: string
 *           example: "driver123"
 *     responses:
 *       200:
 *         description: List of driver cash records
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
 *                   example: "Driver cash records fetched successfully"
 *                 driverCash:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 1
 *                     records:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/DriverCash'
 */

/**
 * @swagger
 * /api/v1/driver-cash/{id}:
 *   get:
 *     summary: Get a driver cash record by ID
 *     tags:
 *       - DriverCash
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the driver cash to retrieve
 *     responses:
 *       200:
 *         description: Driver cash record found
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
 *                   example: "Driver cash fetched successfully"
 *                 driverCash:
 *                   $ref: '#/components/schemas/DriverCash'
 *       404:
 *         description: Driver cash not found
 */

/**
 * @swagger
 * /api/v1/driver-cash/{id}:
 *   put:
 *     summary: Update a driver cash record
 *     tags:
 *       - DriverCash
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverCash'
 *     responses:
 *       200:
 *         description: Driver cash record updated successfully
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
 *                   example: "Driver cash updated successfully"
 *                 updatedDriverCash:
 *                   $ref: '#/components/schemas/DriverCash'
 */

/**
 * @swagger
 * /api/v1/driver-cash/{id}:
 *   delete:
 *     summary: Delete a driver cash record
 *     tags:
 *       - DriverCash
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
 *         description: Driver cash deleted successfully
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
 *                   example: "Driver cash deleted successfully"
 *                 deletedDriverCash:
 *                   $ref: '#/components/schemas/DriverCash'
 *       404:
 *         description: Driver cash not found
 */

