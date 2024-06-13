import express from 'express'
import chatflowsController from '../../controllers/chatflows'
const router = express.Router()

/**
 * @swagger
 * /public-chatbotConfig:
 *   get:
 *     summary: Get a single public chatbot config
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
router.get(['/', '/:id'], chatflowsController.getSinglePublicChatbotConfig)

export default router
