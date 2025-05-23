"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     FestivalPromotion:
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
 *             $ref: '#/components/schemas/FestivalPromotion'
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
 *             $ref: '#/components/schemas/FestivalPromotion'
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
