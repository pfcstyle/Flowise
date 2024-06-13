import express from 'express'
import marketplacesController from '../../controllers/marketplaces'
const router = express.Router()

/**
 * @swagger
 * /marketplaces/templates:
 *   get:
 *     summary: Get all templates
 *     tags:
 *       - Marketplaces
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get('/templates', marketplacesController.getAllTemplates)

export default router
