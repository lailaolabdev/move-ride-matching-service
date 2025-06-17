/**
 * @swagger
 * components:
 *   schemas:
 *     TaxiType:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *         - seats
 *         - country
 *       properties:
 *         id:
 *           type: string
 *           example: "663e9e2012ad2c5e13a1e34f"
 *         name:
 *           type: string
 *           example: "Standard"
 *         icon:
 *           type: string
 *           example: "https://example.com/icons/standard.png"
 *         seats:
 *           type: number
 *           example: 4
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
 * /api/v1/taxi-types:
 *   post:
 *     summary: Create a new taxi type 
 *     tags:
 *       - Taxi Type 
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaxiType'
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
 *                   example: "Taxi type  created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/TaxiType'
 */

/**
 * @swagger
 * /api/v1/taxi-types:
 *   get:
 *     summary: Get all taxi type  records
 *     tags:
 *       - Taxi Type 
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
 *         example: "Standard"
 *     responses:
 *       200:
 *         description: List of taxi type  records
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
 *                     $ref: '#/components/schemas/TaxiType'
 */

/**
 * @swagger
 * /api/v1/taxi-types/{id}:
 *   get:
 *     summary: Get taxi type  by ID
 *     tags:
 *       - Taxi Type 
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
 *         description:  record found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/TaxiType'
 */

/**
 * @swagger
 * /api/v1/taxi-types/{id}:
 *   put:
 *     summary: Update a taxi type  record
 *     tags:
 *       - Taxi Type 
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
 *             $ref: '#/components/schemas/TaxiType'
 *     responses:
 *       200:
 *         description:  record updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "SUCCESSFUL"
 *                 data:
 *                   $ref: '#/components/schemas/TaxiType'
 */

/**
 * @swagger
 * /api/v1/taxi-types/{id}:
 *   delete:
 *     summary: Delete a taxi type  record
 *     tags:
 *       - Taxi Type 
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
