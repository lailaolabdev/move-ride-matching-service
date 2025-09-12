/**
 * @swagger
 * components:
 *   schemas:
 *     NewComerPromotion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6655676212ad2c5e13a1e123"
 *           description: "Auto-generated MongoDB ObjectId"
 *         name:
 *           type: string
 *           example: "First Ride Discount"
 *           description: "Name of the newcomer promotion"
 *         discount:
 *           type: number
 *           example: 15
 *           description: "Discount amount for the promotion"
 *         status:
 *           type: boolean
 *           example: true
 *           description: "Whether the promotion is active or not"
 *         country:
 *           type: string
 *           example: "LA"
 *           description: "Country ID where the promotion is applicable"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T00:00:00.000Z"
 *           description: "Timestamp when the promotion was created"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T00:00:00.000Z"
 *           description: "Timestamp when the promotion was last updated"
 *     NewComerPromotionRequest:
 *       type: object
 *       required:
 *         - name
 *         - discount
 *         - country
 *       properties:
 *         name:
 *           type: string
 *           example: "First Ride Discount"
 *           description: "Name of the newcomer promotion"
 *         discount:
 *           type: number
 *           example: 15
 *           description: "Discount amount for the promotion"
 *         status:
 *           type: boolean
 *           example: true
 *           description: "Whether the promotion is active or not (optional)"
 *         country:
 *           type: string
 *           example: "LA"
 *           description: "Country ID where the promotion is applicable"
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
 *             $ref: '#/components/schemas/NewComerPromotionRequest'
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
 *         description: "Number of records to skip for pagination"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *         description: "Maximum number of records to return"
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: "Filter by promotion name (case-insensitive partial match)"
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: "Filter by promotion status (active/inactive)"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter by creation date range (start date)"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter by creation date range (end date)"
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: "Filter by country ID"
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
 *             $ref: '#/components/schemas/NewComerPromotionRequest'
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

/**
 * @swagger
 * /api/v1/new-comer-promotions/usage/check/{userId}:
 *   get:
 *     summary: Check if user has already used newcomer promotion
 *     tags:
 *       - NewComer Promotion Usage
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to check
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         example: "LA"
 *         description: Country ID to check usage for
 *     responses:
 *       200:
 *         description: Usage check completed successfully
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
 *                   example: "Usage check completed successfully"
 *                 hasUsed:
 *                   type: boolean
 *                   example: false
 *                   description: "Whether the user has already used newcomer promotion"
 *                 usageDetails:
 *                   type: object
 *                   nullable: true
 *                   description: "Usage details if promotion was already used"
 */

/**
 * @swagger
 * /api/v1/new-comer-promotions/usage/record:
 *   post:
 *     summary: Record newcomer promotion usage
 *     tags:
 *       - NewComer Promotion Usage
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - newComerPromotionId
 *               - country
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "66556b3412ad2c5e13a1e888"
 *                 description: "User ID who is using the promotion"
 *               newComerPromotionId:
 *                 type: string
 *                 example: "66556b3412ad2c5e13a1e777"
 *                 description: "NewComer promotion ID being used"
 *               country:
 *                 type: string
 *                 example: "LA"
 *                 description: "Country ID where the promotion is being used"
 *     responses:
 *       201:
 *         description: Usage recorded successfully
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
 *                   example: "Newcomer promotion usage recorded successfully"
 *       409:
 *         description: User has already used newcomer promotion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "ALREADY_USED"
 *                 message:
 *                   type: string
 *                   example: "User has already used newcomer promotion in this country"
 */

/**
 * @swagger
 * /api/v1/new-comer-promotions/usage/all:
 *   get:
 *     summary: Get all newcomer promotion usage records (Admin only)
 *     tags:
 *       - NewComer Promotion Usage
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         example: 0
 *         description: "Number of records to skip for pagination"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *         description: "Maximum number of records to return"
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: "Filter by user ID"
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: "Filter by country ID"
 *       - in: query
 *         name: newComerPromotionId
 *         schema:
 *           type: string
 *         description: "Filter by newcomer promotion ID"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter by usage date range (start date)"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter by usage date range (end date)"
 *     responses:
 *       200:
 *         description: Usage records fetched successfully
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
 *                   example: "Usage records fetched successfully"
 */
