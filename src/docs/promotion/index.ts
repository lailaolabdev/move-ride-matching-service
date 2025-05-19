/**
 * @swagger
 * components:
 *   schemas:
 *     Promotion:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6655676212ad2c5e13a1e123"
 *         name:
 *           type: string
 *           example: "First Ride Discount"
 *         discount:
 *           type: number
 *           example: 15
 *         usingType:
 *           type: string
 *           enum: [ONCE_TIME_TYPE, PERIOD_TYPE]
 *           example: "ONCE_TIME_TYPE"
 *         period:
 *           type: object
 *           properties:
 *             startDate:
 *               type: string
 *               format: date-time
 *               example: "2025-06-01T00:00:00.000Z"
 *             endDate:
 *               type: string
 *               format: date-time
 *               example: "2025-06-30T23:59:59.000Z"
 *         status:
 *           type: boolean
 *           example: true
 *         country:
 *           type: string
 *           example: "LA"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * /api/v1/promotions:
 *   post:
 *     summary: Create a new promotion
 *     tags:
 *       - Promotion
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promotion'
 *     responses:
 *       201:
 *         description: Promotion created successfully
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
 *                   example: "Promotion created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Promotion'
 */

/**
 * @swagger
 * /api/v1/promotions:
 *   get:
 *     summary: Get all promotions
 *     tags:
 *       - Promotion
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         example: 0
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: List of promotions
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
 *                     $ref: '#/components/schemas/Promotion'
 */

/**
 * @swagger
 * /api/v1/promotions/{id}:
 *   get:
 *     summary: Get promotion by ID
 *     tags:
 *       - Promotion
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
 *         description: Promotion record found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/Promotion'
 */

/**
 * @swagger
 * /api/v1/promotions/{id}:
 *   put:
 *     summary: Update a promotion
 *     tags:
 *       - Promotion
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
 *             $ref: '#/components/schemas/Promotion'
 *     responses:
 *       200:
 *         description: Promotion updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/Promotion'
 */

/**
 * @swagger
 * /api/v1/promotions/{id}:
 *   delete:
 *     summary: Delete a promotion
 *     tags:
 *       - Promotion
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
 *         description: Deleted successfully
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
 *                   example: "Promotion deleted successfully"
 */

