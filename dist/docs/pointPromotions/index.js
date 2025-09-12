"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     PointPromotion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66556b3412ad2c5e13a1e456"
 *           description: "Auto-generated MongoDB ObjectId"
 *         name:
 *           type: string
 *           example: "Welcome Bonus"
 *           description: "Name of the point promotion"
 *         type:
 *           type: string
 *           enum: [REGISTER, PAYMENT]
 *           example: "REGISTER"
 *           description: "Type of promotion - REGISTER for new user registration, PAYMENT for payment-based rewards"
 *         minAmount:
 *           type: number
 *           example: 50
 *           description: "Minimum amount required (optional, for PAYMENT type promotions)"
 *         pointReward:
 *           type: number
 *           example: 100
 *           description: "Number of points awarded"
 *         status:
 *           type: boolean
 *           example: true
 *           description: "Whether the promotion is active or not"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T00:00:00.000Z"
 *           description: "Start date for the promotion (optional)"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-06-30T23:59:59.000Z"
 *           description: "End date for the promotion (optional)"
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
 *     PointPromotionRequest:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - pointReward
 *         - country
 *       properties:
 *         name:
 *           type: string
 *           example: "Welcome Bonus"
 *           description: "Name of the point promotion"
 *         type:
 *           type: string
 *           enum: [REGISTER, PAYMENT]
 *           example: "REGISTER"
 *           description: "Type of promotion - REGISTER for new user registration, PAYMENT for payment-based rewards"
 *         minAmount:
 *           type: number
 *           example: 50
 *           description: "Minimum amount required (optional, for PAYMENT type promotions)"
 *         pointReward:
 *           type: number
 *           example: 100
 *           description: "Number of points awarded"
 *         status:
 *           type: boolean
 *           example: true
 *           description: "Whether the promotion is active or not (optional, defaults to true)"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T00:00:00.000Z"
 *           description: "Start date for the promotion (optional)"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-06-30T23:59:59.000Z"
 *           description: "End date for the promotion (optional)"
 *         country:
 *           type: string
 *           example: "LA"
 *           description: "Country ID where the promotion is applicable"
 */
/**
 * @swagger
 * /api/v1/point-promotions:
 *   post:
 *     summary: Create a new point promotion
 *     tags:
 *       - Point Promotion
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PointPromotionRequest'
 *     responses:
 *       201:
 *         description: Point promotion created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "CREATE_SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/PointPromotion'
 */
/**
 * @swagger
 * /api/v1/point-promotions:
 *   get:
 *     summary: Get all point promotions
 *     tags:
 *       - Point Promotion
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
 *         name: type
 *         schema:
 *           type: string
 *           enum: [REGISTER, PAYMENT]
 *         description: "Filter by promotion type"
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: "Filter by promotion status (active/inactive)"
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         example: "LA"
 *         description: "Filter by country ID"
 *       - in: query
 *         name: minAmount
 *         schema:
 *           type: number
 *         description: "Filter promotions with minimum amount greater than or equal to this value"
 *       - in: query
 *         name: pointReward
 *         schema:
 *           type: number
 *         description: "Filter promotions with point reward greater than or equal to this value"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter promotions that start after or on this date"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter promotions that end before or on this date"
 *       - in: query
 *         name: createdStartDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter by creation date range (start date)"
 *       - in: query
 *         name: createdEndDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter by creation date range (end date)"
 *     responses:
 *       200:
 *         description: List of point promotions
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
 *                     $ref: '#/components/schemas/PointPromotion'
 */
/**
 * @swagger
 * /api/v1/point-promotions/{id}:
 *   get:
 *     summary: Get a point promotion by ID
 *     tags:
 *       - Point Promotion
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
 *         description: Point promotion found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/PointPromotion'
 */
/**
 * @swagger
 * /api/v1/point-promotions/{id}:
 *   put:
 *     summary: Update a point promotion
 *     tags:
 *       - Point Promotion
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
 *             $ref: '#/components/schemas/PointPromotion'
 *     responses:
 *       200:
 *         description: Point promotion updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "UPDATE_SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/PointPromotion'
 */
/**
 * @swagger
 * /api/v1/point-promotions/{id}:
 *   delete:
 *     summary: Delete a point promotion
 *     tags:
 *       - Point Promotion
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
 *         description: Point promotion deleted successfully
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
 *                   example: "Point promotion deleted successfully"
 */
