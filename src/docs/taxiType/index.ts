/**
 * @swagger
 * components:
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
 *     description: Create a new taxi type with specified name and icon.
 *     tags:
 *       - Taxi Type
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the taxi type.
 *                 example: "SUV"
 *               icon:
 *                 type: string
 *                 description: The icon for the taxi type.
 *                 example: "suv_icon.png"
 *     responses:
 *       201:
 *         description: Taxi type created successfully.
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
 *                   example: "Taxi Type created successfully"
 *                 taxiType:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Taxi Type ID.
 *                       example: "63d2fcd0c90a5300188b4567"
 *                     name:
 *                       type: string
 *                       description: Taxi Type name.
 *                       example: "SUV"
 *                     icon:
 *                       type: string
 *                       description: Taxi Type icon.
 *                       example: "suv_icon.png"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "INTERNAL_SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */


/**
 * @swagger
 * /api/v1/taxi-types:
 *   get:
 *     summary: Get all taxi types
 *     description: Retrieve a list of all available taxi types.
 *     tags:
 *       - Taxi Type
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *         description: The number of records to skip for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 50
 *         description: The maximum number of records to return for pagination.
 *     responses:
 *       200:
 *         description: Successfully fetched all taxi types.
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
 *                   example: "Taxi Types fetched successfully"
 *                 taxiTypes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Taxi Type ID.
 *                         example: "63d2fcd0c90a5300188b4567"
 *                       name:
 *                         type: string
 *                         description: Taxi Type name.
 *                         example: "SUV"
 *                       icon:
 *                         type: string
 *                         description: Taxi Type icon.
 *                         example: "suv_icon.png"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "INTERNAL_SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */


/**
 * @swagger
 * /api/v1/taxi-types/{id}:
 *   get:
 *     summary: Get taxi type by ID
 *     description: Retrieve a specific taxi type by its ID.
 *     tags:
 *       - Taxi Type
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the taxi type.
 *     responses:
 *       200:
 *         description: Successfully fetched taxi type.
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
 *                   example: "Taxi Type fetched successfully"
 *                 taxiType:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Taxi Type ID.
 *                       example: "63d2fcd0c90a5300188b4567"
 *                     name:
 *                       type: string
 *                       description: Taxi Type name.
 *                       example: "SUV"
 *                     icon:
 *                       type: string
 *                       description: Taxi Type icon.
 *                       example: "suv_icon.png"
 *       404:
 *         description: Taxi Type not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Taxi Type not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "INTERNAL_SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */


/**
 * @swagger
 * /api/v1/taxi-types/{id}:
 *   put:
 *     summary: Update a taxi type
 *     description: Update the name or icon of an existing taxi type.
 *     tags:
 *       - Taxi Type
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the taxi type to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the taxi type.
 *                 example: "Luxury Sedan"
 *               icon:
 *                 type: string
 *                 description: The icon for the taxi type.
 *                 example: "luxury_sedan_icon.png"
 *     responses:
 *       200:
 *         description: Taxi type updated successfully.
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
 *                   example: "Taxi Type updated successfully"
 *                 updatedTaxiType:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Taxi Type ID.
 *                       example: "63d2fcd0c90a5300188b4567"
 *                     name:
 *                       type: string
 *                       description: Taxi Type name.
 *                       example: "Luxury Sedan"
 *                     icon:
 *                       type: string
 *                       description: Taxi Type icon.
 *                       example: "luxury_sedan_icon.png"
 *       404:
 *         description: Taxi Type not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Taxi Type not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "INTERNAL_SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */


/**
 * @swagger
 * /api/v1/taxi-types/{id}:
 *   delete:
 *     summary: Delete a taxi type
 *     description: Remove a taxi type from the system by its ID.
 *     tags:
 *       - Taxi Type
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the taxi type to delete.
 *     responses:
 *       200:
 *         description: Taxi type deleted successfully.
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
 *                   example: "Taxi Type deleted successfully"
 *       404:
 *         description: Taxi Type not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Taxi Type not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "INTERNAL_SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 detail:
 *                   type: string
 *                   example: "Error details here"
 */
