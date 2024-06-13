import express from 'express'
import chatflowsController from '../../controllers/chatflows'
const router = express.Router()

/**
 * @swagger
 * /public-chatflows:
 *   get:
 *     summary: Get a single public chatflow
 *     tags:
 *       - Chatflows
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
router.get(['/', '/:id'], chatflowsController.getSinglePublicChatflow)

export default router
