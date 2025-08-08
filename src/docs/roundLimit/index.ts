/**
 * @swagger
 * components:
 *   schemas:
 *     RoundLimit:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f0875c264fa20a3037b18a"
 *         round:
 *           type: number
 *           example: 1000
 *         country:
 *           type: string
 *           example: "67c6c05bd9ba8fe6164eac3f"
 *         countryCode:
 *           type: string
 *           example: "LA"
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
 * /api/v1/round-limits:
 *   post:
 *     summary: Create a new round limit
 *     tags:
 *       - RoundLimit
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoundLimit'
 *     responses:
 *       201:
 *         description: Round limit created successfully
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
 *                   example: "Round limit created successfully"
 *                 roundLimit:
 *                   $ref: '#/components/schemas/RoundLimit'
 */

/**
 * @swagger
 * /api/v1/round-limits:
 *   get:
 *     summary: Get all round limits
 *     tags:
 *       - RoundLimit
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
 *         description: List of round limits
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
 *                   example: "Round limits fetched successfully"
 *                 roundLimits:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 2
 *                     records:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/RoundLimit'
 */

/**
 * @swagger
 * /api/v1/round-limits/{id}:
 *   get:
 *     summary: Get a round limit by ID
 *     tags:
 *       - RoundLimit
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the round limit
 *     responses:
 *       200:
 *         description: Round limit found
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
 *                   example: "Round limit fetched successfully"
 *                 roundLimit:
 *                   $ref: '#/components/schemas/RoundLimit'
 *       404:
 *         description: Round limit not found
 */

/**
 * @swagger
 * /api/v1/round-limits/{id}:
 *   put:
 *     summary: Update a round limit
 *     tags:
 *       - RoundLimit
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
 *             $ref: '#/components/schemas/RoundLimit'
 *     responses:
 *       200:
 *         description: Round limit updated successfully
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
 *                   example: "Round limit updated successfully"
 *                 updatedRoundLimit:
 *                   $ref: '#/components/schemas/RoundLimit'
 */

/**
 * @swagger
 * /api/v1/round-limits/{id}:
 *   delete:
 *     summary: Delete a round limit
 *     tags:
 *       - RoundLimit
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
 *         description: Round limit deleted successfully
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
 *                   example: "Round limit deleted successfully"
 *                 deletedRoundLimit:
 *                   $ref: '#/components/schemas/RoundLimit'
 *       404:
 *         description: Round limit not found
 */
