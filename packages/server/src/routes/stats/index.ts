import express from 'express'
import statsController from '../../controllers/stats'

const router = express.Router()

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get chatflow stats
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get(['/', '/:id'], statsController.getChatflowStats)

export default router
