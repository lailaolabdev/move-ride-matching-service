/**
 * @swagger
 * components:
 *   schemas:
 *     DelayPrice:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *         price:
 *           type: number
 *           example: 5000
 *         createdBy:
 *           type: string
 *           example: "user123"
 *         createdByFullName:
 *           type: string
 *           example: "John Doe"
 *         updatedBy:
 *           type: string
 *           example: "admin456"
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
 *           example: "2025-06-30T13:00:00.000Z"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/delay-price:
 *   post:
 *     summary: Create a new delay price
 *     tags:
 *       - DelayPrice
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DelayPrice'
 *     responses:
 *       201:
 *         description: Delay price created successfully
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
 *                   example: "Delay price created successfully"
 *                 delayPrice:
 *                   $ref: '#/components/schemas/DelayPrice'
 */

/**
 * @swagger
 * /api/v1/delay-price:
 *   get:
 *     summary: Get all delay prices
 *     tags:
 *       - DelayPrice
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
 *         name: country
 *         schema:
 *           type: string
 *           example: "Laos"
 *       - in: query
 *         name: countryCode
 *         schema:
 *           type: string
 *           example: "LA"
 *     responses:
 *       200:
 *         description: List of delay prices
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
 *                   example: "Delay prices fetched successfully"
 *                 delayPrices:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 1
 *                     prices:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/DelayPrice'
 */

/**
 * @swagger
 * /api/v1/delay-price/{id}:
 *   get:
 *     summary: Get a delay price by ID
 *     tags:
 *       - DelayPrice
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the delay price to retrieve
 *     responses:
 *       200:
 *         description: Delay price found
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
 *                   example: "Delay price fetched successfully"
 *                 delayPrice:
 *                   $ref: '#/components/schemas/DelayPrice'
 *       404:
 *         description: Delay price not found
 */

/**
 * @swagger
 * /api/v1/delay-price/{id}:
 *   put:
 *     summary: Update a delay price
 *     tags:
 *       - DelayPrice
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
 *             $ref: '#/components/schemas/DelayPrice'
 *     responses:
 *       200:
 *         description: Delay price updated successfully
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
 *                   example: "Delay price updated successfully"
 *                 updatedDelayPrice:
 *                   $ref: '#/components/schemas/DelayPrice'
 */

/**
 * @swagger
 * /api/v1/delay-price/{id}:
 *   delete:
 *     summary: Delete a delay price
 *     tags:
 *       - DelayPrice
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
 *         description: Delay price deleted successfully
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
 *                   example: "Delay price deleted successfully"
 *                 deletedDelayPrice:
 *                   $ref: '#/components/schemas/DelayPrice'
 *       404:
 *         description: Delay price not found
 */
