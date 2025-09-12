"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     FestivalPromotion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "67c6c05bd9ba8fe6164eac3f"
 *           description: "Unique identifier for the festival promotion"
 *         name:
 *           type: string
 *           example: "First Ride Discount"
 *           description: "Name of the festival promotion"
 *         discount:
 *           type: number
 *           example: 15
 *           description: "Discount percentage (0-100)"
 *         usingType:
 *           type: string
 *           enum: [ONCE_TIME_TYPE, PERIOD_TYPE]
 *           example: "ONCE_TIME_TYPE"
 *           description: "Type of promotion usage - ONCE_TIME_TYPE for single use, PERIOD_TYPE for period-based"
 *         periodStartTime:
 *           type: string
 *           format: date-time
 *           example: "2025-09-11T00:00:00.000Z"
 *           description: "Start date and time for the promotion period (Date type as ISO string)"
 *         periodEndTime:
 *           type: string
 *           format: date-time
 *           example: "2025-09-15T23:59:59.000Z"
 *           description: "End date and time for the promotion period (Date type as ISO string)"
 *         status:
 *           type: boolean
 *           example: true
 *           description: "Status of the promotion (active/inactive)"
 *         country:
 *           type: string
 *           example: "67c6c05bd9ba8fe6164eac3f"
 *           description: "Country ID where the promotion is applicable"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the promotion was created"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the promotion was last updated"
 *     FestivalPromotionRequest:
 *       type: object
 *       required:
 *         - name
 *         - discount
 *         - usingType
 *         - country
 *       properties:
 *         name:
 *           type: string
 *           example: "First Ride Discount"
 *           description: "Name of the festival promotion"
 *         discount:
 *           type: number
 *           example: 15
 *           description: "Discount percentage (0-100)"
 *         usingType:
 *           type: string
 *           enum: [ONCE_TIME_TYPE, PERIOD_TYPE]
 *           example: "ONCE_TIME_TYPE"
 *           description: "Type of promotion usage"
 *         periodStartTime:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T00:00:00.000Z"
 *           description: "Start date and time for the promotion period (Date type as ISO string)"
 *         periodEndTime:
 *           type: string
 *           format: date-time
 *           example: "2025-06-30T23:59:59.000Z"
 *           description: "End date and time for the promotion period (Date type as ISO string)"
 *         country:
 *           type: string
 *           example: "67c6c05bd9ba8fe6164eac3f"
 *           description: "Country ID where promotion is valid"
 *       description: "Request body for creating/updating festival promotions. Note: _id and status fields are auto-generated and not accepted in client requests."
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /api/v1/festival-promotions:
 *   post:
 *     summary: Create a new festival promotion
 *     tags:
 *       - Festival Promotion
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FestivalPromotionRequest'
 *     responses:
 *       201:
 *         description: Festival promotion created successfully
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
 *                   example: "Festival promotion created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/FestivalPromotion'
 */
/**
 * @swagger
 * /api/v1/festival-promotions:
 *   get:
 *     summary: Get all festival promotions
 *     tags:
 *       - Festival Promotion
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
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by promotion name (case-insensitive partial match)
 *       - in: query
 *         name: usingType
 *         schema:
 *           type: string
 *           enum: [ONCE_TIME_TYPE, PERIOD_TYPE]
 *         description: Filter by promotion usage type
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by creation date range (start date)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by creation date range (end date)
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: Filter by promotion status (active/inactive)
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country ID
 *       - in: query
 *         name: periodStartTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter active promotions (promotions with periodEndTime >= this date)
 *       - in: query
 *         name: periodEndTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter promotions that expire before or on this date (periodEndTime <= this date)
 *     responses:
 *       200:
 *         description: List of festival promotions
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
 *                     $ref: '#/components/schemas/FestivalPromotion'
 */
/**
 * @swagger
 * /api/v1/festival-promotions/{id}:
 *   get:
 *     summary: Get festival promotion by ID
 *     tags:
 *       - Festival Promotion
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
 *         description: Festival promotion record found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/FestivalPromotion'
 */
/**
 * @swagger
 * /api/v1/festival-promotions/{id}:
 *   put:
 *     summary: Update a festival promotion
 *     tags:
 *       - Festival Promotion
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
 *             $ref: '#/components/schemas/FestivalPromotionRequest'
 *     responses:
 *       200:
 *         description: Festival promotion updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/FestivalPromotion'
 */
/**
 * @swagger
 * /api/v1/festival-promotions/{id}:
 *   delete:
 *     summary: Delete a festival promotion
 *     tags:
 *       - Festival Promotion
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
 *         description: Festival promotion deleted successfully
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
 *                   example: "Festival promotion deleted successfully"
 */
