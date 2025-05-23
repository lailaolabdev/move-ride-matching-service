"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     PointPromotion:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "66556b3412ad2c5e13a1e456"
 *         name:
 *           type: string
 *           example: "Welcome Bonus"
 *         type:
 *           type: string
 *           enum: [register, payment]
 *           example: "register"
 *         minAmount:
 *           type: number
 *           nullable: true
 *           example: 50
 *         pointReward:
 *           type: number
 *           example: 100
 *         status:
 *           type: boolean
 *           example: true
 *         startDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-06-01T00:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-06-30T23:59:59.000Z"
 *         country:
 *           type: string
 *           example: "LA"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 *             $ref: '#/components/schemas/PointPromotion'
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
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         example: "LA"
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
