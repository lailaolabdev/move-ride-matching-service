/**
 * @swagger
 * components:
 *   schemas:
 *     NewComerPromotion:
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
 * /api/v1/new-comer-promotions:
 *   post:
 *     summary: Create a new newcomer promotion
 *     tags:
 *       - NewComer Promotion
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewComerPromotion'
 *     responses:
 *       201:
 *         description: Newcomer promotion created successfully
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
 *                   example: "Newcomer promotion created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/NewComerPromotion'
 */

/**
 * @swagger
 * /api/v1/new-comer-promotions:
 *   get:
 *     summary: Get all newcomer promotions
 *     tags:
 *       - NewComer Promotion
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
 *         description: List of newcomer promotions
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
 *                     $ref: '#/components/schemas/NewComerPromotion'
 */

/**
 * @swagger
 * /api/v1/new-comer-promotions/{id}:
 *   get:
 *     summary: Get newcomer promotion by ID
 *     tags:
 *       - NewComer Promotion
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
 *         description: Newcomer promotion record found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/NewComerPromotion'
 */

/**
 * @swagger
 * /api/v1/new-comer-promotions/{id}:
 *   put:
 *     summary: Update a newcomer promotion
 *     tags:
 *       - NewComer Promotion
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
 *             $ref: '#/components/schemas/NewComerPromotion'
 *     responses:
 *       200:
 *         description: Newcomer promotion updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/NewComerPromotion'
 */

/**
 * @swagger
 * /api/v1/new-comer-promotions/{id}:
 *   delete:
 *     summary: Delete a newcomer promotion
 *     tags:
 *       - NewComer Promotion
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
 *         description: Newcomer promotion deleted successfully
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
 *                   example: "Newcomer promotion deleted successfully"
 */
