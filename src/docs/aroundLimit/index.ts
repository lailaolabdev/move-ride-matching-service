/**
 * @swagger
 * components:
 *   schemas:
 *     AroundLimit:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f0875c264fa20a3037b18a"
 *         around:
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
 * /api/v1/around-limits:
 *   post:
 *     summary: Create a new around limit
 *     tags:
 *       - AroundLimit
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AroundLimit'
 *     responses:
 *       201:
 *         description: Around limit created successfully
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
 *                   example: "Around limit created successfully"
 *                 aroundLimit:
 *                   $ref: '#/components/schemas/AroundLimit'
 */

/**
 * @swagger
 * /api/v1/around-limits:
 *   get:
 *     summary: Get all around limits
 *     tags:
 *       - AroundLimit
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
 *         description: List of around limits
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
 *                   example: "Around limits fetched successfully"
 *                 aroundLimits:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 2
 *                     records:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/AroundLimit'
 */

/**
 * @swagger
 * /api/v1/around-limits/{id}:
 *   get:
 *     summary: Get a around limit by ID
 *     tags:
 *       - AroundLimit
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the around limit
 *     responses:
 *       200:
 *         description: Around limit found
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
 *                   example: "Around limit fetched successfully"
 *                 cashLimit:
 *                   $ref: '#/components/schemas/AroundLimit'
 *       404:
 *         description: Around limit not found
 */

/**
 * @swagger
 * /api/v1/around-limits/{id}:
 *   put:
 *     summary: Update a around limit
 *     tags:
 *       - AroundLimit
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
 *             $ref: '#/components/schemas/AroundLimit'
 *     responses:
 *       200:
 *         description: Around limit updated successfully
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
 *                   example: "Around limit updated successfully"
 *                 updatedCashLimit:
 *                   $ref: '#/components/schemas/AroundLimit'
 */

/**
 * @swagger
 * /api/v1/around-limits/{id}:
 *   delete:
 *     summary: Delete a around limit
 *     tags:
 *       - AroundLimit
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
 *         description: Around limit deleted successfully
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
 *                   example: "Around limit deleted successfully"
 *                 deletedCashLimit:
 *                   $ref: '#/components/schemas/AroundLimit'
 *       404:
 *         description: Around limit not found
 */
