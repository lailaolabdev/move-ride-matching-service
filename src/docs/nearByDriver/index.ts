/**
 * @swagger
 * /api/v1/nearby-driver:
 *   get:
 *     summary: Get nearby drivers
 *     description: Retrieve a list of all available nearby drivers based on geographic location, with optional pagination.
 *     tags:
 *       - Nearby Driver
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema:
 *           type: number
 *           example: 100.523186
 *         description: Longitude of the location to search from.
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema:
 *           type: number
 *           example: 13.736717
 *         description: Latitude of the location to search from.
 *     responses:
 *       200:
 *         description: Successfully fetched nearby drivers.
 *       400:
 *         description: Missing or invalid query parameters.
 *       500:
 *         description: Internal server error.
 */