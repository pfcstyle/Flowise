import express from 'express'
import feedbackController from '../../controllers/feedback'
const router = express.Router()

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create a chat message feedback for chatflow
 *     tags:
 *       - Feedback
 *     responses:
 *       200:
 *         description: OK
 */
// CREATE
router.post(['/', '/:id'], feedbackController.createChatMessageFeedbackForChatflow)

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get all chat message feedback
 *     tags:
 *       - Feedback
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get(['/', '/:id'], feedbackController.getAllChatMessageFeedback)

/**
 * @swagger
 * /feedback:
 *   put:
 *     summary: Update a chat message feedback for chatflow
 *     tags:
 *       - Feedback
 *     responses:
 *       200:
 *         description: OK
 */
// UPDATE
router.put(['/', '/:id'], feedbackController.updateChatMessageFeedbackForChatflow)

export default router
