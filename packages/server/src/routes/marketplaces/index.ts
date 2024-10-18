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

router.post('/custom', marketplacesController.saveCustomTemplate)

// READ
router.get('/custom', marketplacesController.getAllCustomTemplates)

// DELETE
router.delete(['/', '/custom/:id'], marketplacesController.deleteCustomTemplate)

export default router
