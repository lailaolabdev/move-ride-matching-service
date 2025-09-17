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
 * /api/v1/loyalty:
 *   post:
 *     summary: Create a loyalty
 *     description: Create a loyalty with specified attributes.
 *     tags:
 *       - Loyalty
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: image
 *                 example: https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-handdrawing-school-backpack-png-image_6136819.png
 *               name:
 *                 type: string
 *                 description: name
 *                 example: name
 *               quantity:
 *                 type: number
 *                 description: quantity
 *                 example: 1
 *               price:
 *                 type: number
 *                 description: price
 *                 example: 1000
 *               country:
 *                 type: string
 *                 description: country ID
 *                 example: 67c6c05bd9ba8fe6164eac3f
 *     responses:
 *       201:
 *         description: Vehicle created successfully.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/loyalty:
 *   get:
 *     summary: Get all loyalty
 *     description: Retrieve a list of all available loyalty with optional pagination.
 *     tags:
 *       - Loyalty
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
 *         name: country
 *         schema:
 *           type: string
 *           example: 67c6c05bd9ba8fe6164eac3f
 *         description: Filter by country ID.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: VIP Membership
 *         description: Filter by loyalty name (case-insensitive search).
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2025-09-01
 *         description: Filter records created after this date (ISO format).
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2025-09-30
 *         description: Filter records created before this date (ISO format).
 *     responses:
 *       200:
 *         description: Successfully fetched all vehicles.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/loyalty/{id}:
 *   get:
 *     summary: Get loyalty by ID
 *     description: Retrieve a specific loyalty by its ID.
 *     tags:
 *       - Loyalty
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
 * /api/v1/loyalty/{id}:
 *   put:
 *     summary: Update a loyalty
 *     description: Update the details (such as model, brand, fares) of an existing loyalty.
 *     tags:
 *       - Loyalty
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d2fcd0c90a5300188b4567"
 *         description: The ID of the loyalty to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: image
 *                 example: https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-handdrawing-school-backpack-png-image_6136819.png
 *               name:
 *                 type: string
 *                 description: name
 *                 example: name
 *               quantity:
 *                 type: number
 *                 description: quantity
 *                 example: 1
 *               price:
 *                 type: number
 *                 description: price
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Vehicle updated successfully.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/loyalty/{id}:
 *   delete:
 *     summary: Delete a loyalty
 *     description: Delete an existing loyalty from the system by its ID.
 *     tags:
 *       - Loyalty
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
