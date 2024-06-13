import express from 'express'
import fetchLinksController from '../../controllers/fetch-links'
const router = express.Router()

/**
 * @swagger
 * /fetch-links:
 *   get:
 *     summary: Get all links
 *     tags:
 *       - Fetch Links
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get('/', fetchLinksController.getAllLinks)

export default router
