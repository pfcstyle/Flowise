import express from 'express'
import chatMessageController from '../../controllers/chat-messages'
const router = express.Router()

/**
 * @swagger
 * /chatmessage/abort/{chatflowid}/{chatid}:
 *   put:
 *     summary: Abort a chat message
 *     tags:
 *       - Chat Messages
 *     parameters:
 *       - in: path
 *         name: chatflowid
 *         description: The ID of the chat flow
 *         required: true
 *         type: string
 *       - in: path
 *         name: chatid
 *         description: The ID of the chat message
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put(['/abort/', '/abort/:chatflowid/:chatid'], chatMessageController.abortChatMessage)

/**
 * @swagger
 * /chatmessage/{id}:
 *   delete:
 *     summary: Remove all chat messages or a specific chat message by ID
 *     tags:
 *       - Chat Messages
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the chat message to delete
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete(['/', '/:id'], chatMessageController.removeAllChatMessages)

export default router
