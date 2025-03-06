/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /v1/api/driving-license-type:
 *     get:
 *       summary: Get all driving license types
 *       description: Retrieve all driving license type with optional pagination and filtering.
 *       tags:
 *         - Driving License Types
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: query
 *           name: country
 *           schema:
 *             type: string
 *           description: "Query driving license type base on country"
 *       responses:
 *         500:
 *           description: Internal server error.
 */

/**
 * @swagger
 * /v1/api/driving-license-type/{id}:
 *   get:
 *     summary: Get driving license type by ID
 *     description: Retrieve a driving license type member by their unique ID.
 *     tags:
 *       - Driving License Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the driving license type member to retrieve.
 *     responses:
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /v1/api/driving-license-type:
 *     post:
 *       summary: Create a new driving license type
 *       description: Create a new driving license type member with the provided details.
 *       tags:
 *         - Driving License Types
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: name
 *                 country:
 *                   type: string
 *                   example: TH
 *       responses:
 *         404:
 *           description: Driving license type with these name and country already exists.
 *         500:
 *           description: Internal server error.
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /v1/api/driving-license-type/{id}:
 *     put:
 *       summary: Update a driving license type
 *       description: Update an existing driving license type member by their unique ID.
 *       tags:
 *         - Driving License Types
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the driving license type member to update.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: name
 *                 country:
 *                   type: string
 *                   example: TH
 *       responses:
 *         500:
 *           description: Internal server error.
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /v1/api/driving-license-type/{id}:
 *     delete:
 *       summary: Delete a driving license type
 *       description: Delete a driving license type member by their unique ID.
 *       tags:
 *         - Driving License Types
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the driving license type member to delete.
 *       responses:
 *         500:
 *           description: Internal server error.
 */
