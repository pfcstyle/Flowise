import express from 'express'
import flowConfigsController from '../../controllers/flow-configs'
const router = express.Router()

/**
 * @swagger
 * /flow-config:
 *   get:
 *     summary: Get a single flow config
 *     tags:
 *       - chatflows
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
router.get(['/', '/:id'], flowConfigsController.getSingleFlowConfig)

export default router
