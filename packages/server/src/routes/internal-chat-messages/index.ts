import express from 'express'
import chatMessagesController from '../../controllers/chat-messages'
const router = express.Router()

/**
 * @swagger
 * /internal-chatmessage:
 *   get:
 *     summary: Get all internal chat messages
 *     tags:
 *       - Chat Messages
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
router.get(['/', '/:id'], chatMessagesController.getAllInternalChatMessages)

export default router
