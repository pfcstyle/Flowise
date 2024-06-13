import express from 'express'
import chatflowsController from '../../controllers/chatflows'

const router = express.Router()

/**
 * @swagger
 * /chatflows-streaming/{id}:
 *  get:
 *   summary: Check if chatflow is valid for streaming
 *   tags:
 *    - chatflows
 */
router.get(['/', '/:id'], chatflowsController.checkIfChatflowIsValidForStreaming)

export default router
