import express from 'express'
import assistantsController from '../../controllers/assistants'

const router = express.Router()

/** @swagger
 * /assistants:
 *  post:
 *   summary: Create a new assistant
 *   tags:
 *    - Assistants
 */
router.post('/', assistantsController.createAssistant)

/** @swagger
 * /assistants:
 *  get:
 *   summary: Get all assistants
 *   tags:
 *    - Assistants
 */
router.get('/', assistantsController.getAllAssistants)

/** @swagger
 * /assistants/{id}:
 *  get:
 *   summary: Get an assistant by id
 *   tags:
 *    - Assistants
 */
router.get(['/', '/:id'], assistantsController.getAssistantById)

/** @swagger
 * /assistants/{id}:
 *  put:
 *   summary: Update an assistant
 *   tags:
 *    - Assistants
 */
router.put(['/', '/:id'], assistantsController.updateAssistant)

/** @swagger
 * /assistants/{id}:
 *  delete:
 *   summary: Delete an assistant
 *   tags:
 *    - Assistants
 */
router.delete(['/', '/:id'], assistantsController.deleteAssistant)

export default router
