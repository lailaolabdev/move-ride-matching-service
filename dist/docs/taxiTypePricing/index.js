"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     TaxiTypePricing:
 *       type: object
 *       properties:
  *         id:
  *           type: string
  *           example: "663e9e2012ad2c5e13a1e34f"
 *         taxiTypeId:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         minDistance:
 *           type: number
 *           example: 0
 *         maxDistance:
 *           type: number
 *           example: 10
 *         price:
 *           type: number
 *           example: 25.5
 *         rideMatchingType:
 *           type: string
 *           example: "meter"
 *         status:
 *           type: boolean
 *           example: true
 *         country:
 *           type: string
 *           example: LA
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /api/v1/taxi-type-pricing:
 *   post:
 *     summary: Create a new taxi type pricing
 *     tags:
 *       - Taxi Type Pricing
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaxiTypePricing'
 *     responses:
 *       201:
 *         description: Created successfully
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
 *                   example: "Taxi type pricing created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/TaxiTypePricing'
 */
/**
 * @swagger
 * /api/v1/taxi-type-pricing:
 *   get:
 *     summary: Get all taxi type pricing records
 *     tags:
 *       - Taxi Type Pricing
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
 *         description: List of taxi type pricing records
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
 *                     $ref: '#/components/schemas/TaxiTypePricing'
 */
/**
 * @swagger
 * /api/v1/taxi-type-pricing/{id}:
 *   get:
 *     summary: Get taxi type pricing by ID
 *     tags:
 *       - Taxi Type Pricing
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
 *         description: Pricing record found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/TaxiTypePricing'
 */
/**
 * @swagger
 * /api/v1/taxi-type-pricing/{id}:
 *   put:
 *     summary: Update a taxi type pricing record
 *     tags:
 *       - Taxi Type Pricing
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
 *             $ref: '#/components/schemas/TaxiTypePricing'
 *     responses:
 *       200:
 *         description: Pricing record updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/TaxiTypePricing'
 */
/**
 * @swagger
 * /api/v1/taxi-type-pricing/{id}:
 *   delete:
 *     summary: Delete a taxi type pricing record
 *     tags:
 *       - Taxi Type Pricing
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
 *                   example: "Deleted successfully"
 */ 
