import express from 'express'
import chatflowsController from '../../controllers/chatflows'
const router = express.Router()

/**
 * @swagger
 * /chatflows:
 *  post:
 *   summary: Create a new chatflow
 *   tags:
 *    - chatflows
 */
router.post('/', chatflowsController.saveChatflow)
router.post('/importchatflows', chatflowsController.importChatflows)

/**
 * @swagger
 * /chatflows:
 *  get:
 *   summary: Get all chatflows
 *   tags:
 *    - chatflows
 */
router.get('/', chatflowsController.getAllChatflows)

/**
 * @swagger
 * /chatflows/{id}:
 *  get:
 *   summary: Get a chatflow by ID
 *   tags:
 *    - chatflows
 */
router.get(['/', '/:id'], chatflowsController.getChatflowById)

/**
 * @swagger
 * /chatflows/apikey/{apikey}:
 *  get:
 *   summary: Get a chatflow by API key
 *   tags:
 *    - chatflows
 */
router.get(['/apikey/', '/apikey/:apikey'], chatflowsController.getChatflowByApiKey)

/**
 * @swagger
 * /chatflows/{id}:
 *  put:
 *   summary: Update a chatflow
 *   tags:
 *    - chatflows
 */
router.put(['/', '/:id'], chatflowsController.updateChatflow)

/**
 * @swagger
 * /chatflows/{id}:
 *  delete:
 *   parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the chatflow to delete
 *         required: false
 *         schema:
 *           type: string
 *   summary: Delete a chatflow
 *   tags:
 *    - chatflows
 */
router.delete(['/', '/:id'], chatflowsController.deleteChatflow)

export default router
