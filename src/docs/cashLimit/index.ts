/**
 * @swagger
 * components:
 *   schemas:
 *     CashLimit:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f0875c264fa20a3037b18a"
 *         amount:
 *           type: number
 *           example: 1000
 *         country:
 *           type: string
 *           example: "Thailand"
 *         countryCode:
 *           type: string
 *           example: "TH"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-08-07T10:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-08-07T10:30:00.000Z"
 */

/**
 * @swagger
 * /api/v1/cash-limits:
 *   post:
 *     summary: Create a new cash limit
 *     tags:
 *       - CashLimit
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CashLimit'
 *     responses:
 *       201:
 *         description: Cash limit created successfully
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
 *                   example: "Cash limit created successfully"
 *                 cashLimit:
 *                   $ref: '#/components/schemas/CashLimit'
 */

/**
 * @swagger
 * /api/v1/cash-limits:
 *   get:
 *     summary: Get all cash limits
 *     tags:
 *       - CashLimit
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
 *         description: List of cash limits
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
 *                   example: "Cash limits fetched successfully"
 *                 cashLimits:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 2
 *                     records:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/CashLimit'
 */

/**
 * @swagger
 * /api/v1/cash-limits/{id}:
 *   get:
 *     summary: Get a cash limit by ID
 *     tags:
 *       - CashLimit
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cash limit
 *     responses:
 *       200:
 *         description: Cash limit found
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
 *                   example: "Cash limit fetched successfully"
 *                 cashLimit:
 *                   $ref: '#/components/schemas/CashLimit'
 *       404:
 *         description: Cash limit not found
 */

/**
 * @swagger
 * /api/v1/cash-limits/{id}:
 *   put:
 *     summary: Update a cash limit
 *     tags:
 *       - CashLimit
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CashLimit'
 *     responses:
 *       200:
 *         description: Cash limit updated successfully
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
 *                   example: "Cash limit updated successfully"
 *                 updatedCashLimit:
 *                   $ref: '#/components/schemas/CashLimit'
 */

/**
 * @swagger
 * /api/v1/cash-limits/{id}:
 *   delete:
 *     summary: Delete a cash limit
 *     tags:
 *       - CashLimit
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cash limit deleted successfully
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
 *                   example: "Cash limit deleted successfully"
 *                 deletedCashLimit:
 *                   $ref: '#/components/schemas/CashLimit'
 *       404:
 *         description: Cash limit not found
 */
