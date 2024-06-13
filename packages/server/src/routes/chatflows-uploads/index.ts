import express from 'express'
import chatflowsController from '../../controllers/chatflows'

const router = express.Router()

/**
 * @swagger
 * /chatflows-uploads/{id}:
 *  get:
 *   summary: upload for chatflow
 *   tags:
 *    - chatflows
 */
router.get(['/', '/:id'], chatflowsController.checkIfChatflowIsValidForUploads)

export default router
