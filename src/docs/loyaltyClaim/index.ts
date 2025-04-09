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
 * /api/v1/loyalty-claim:
 *   post:
 *     summary: Create a loyalty claim
 *     description: Create a loyalty claim with specified attributes.
 *     tags:
 *       - Loyalty claim
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loyaltyId:
 *                 type: string
 *                 description: loyalty id 
 *                 example: 67ebba7844ba7e77b4e2ad96
 *               acceptedType:
 *                 type: string
 *                 description: accepted type
 *                 example: pick_up
 *               address:
 *                 type: string
 *                 description: address
 *                 example: Nonkhortai village, Saysetta district, Vientiane
 *               countryId:
 *                 type: string
 *                 description: country id
 *                 example: 67c6c05bd9ba8fe6164eac3f
 *               countryCode:
 *                 type: string
 *                 description: country code
 *                 example: LA
 *     responses:
 *       201:
 *         description: Vehicle created successfully.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/loyalty-claim:
 *   get:
 *     summary: Get all loyalty claim
 *     description: Retrieve a list of all available loyalty claim with optional pagination.
 *     tags:
 *       - Loyalty claim
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
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, canceled, delivered]
 *         description: The status of records to skip for pagination.
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *           example: 67c6c05bd9ba8fe6164eac3f
 *         description: The country id of records to return for pagination.
 *       - in: countryCode
 *         name: skip
 *         schema:
 *           type: string
 *           example: LA
 *         description: The country code of records to skip for pagination.
 *     responses:
 *       200:
 *         description: Successfully fetched all vehicles.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/loyalty-claim/{id}:
 *   get:
 *     summary: Get loyalty claim by ID
 *     description: Retrieve a specific loyalty claim by its ID.
 *     tags:
 *       - Loyalty claim
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the vehicle to fetch.
 *     responses:
 *       200:
 *         description: Successfully fetched vehicle.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/loyalty-claim/{id}:
 *   put:
 *     summary: Update a loyalty claim
 *     description: Update the details (such as model, brand, fares) of an existing loyalty claim.
 *     tags:
 *       - Loyalty claim
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the loyalty claim to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: image
 *                 example: accepted
 *     responses:
 *       200:
 *         description: Vehicle updated successfully.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/loyalty-claim/{id}:
 *   delete:
 *     summary: Delete a loyalty claim 
 *     description: Delete an existing loyalty claim from the system by its ID.
 *     tags:
 *       - Loyalty claim
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the vehicle to delete.
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully.
 *       500:
 *         description: Internal server error.
 */
