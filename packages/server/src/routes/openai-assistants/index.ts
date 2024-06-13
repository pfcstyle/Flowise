import express from 'express'
import openaiAssistantsController from '../../controllers/openai-assistants'
const router = express.Router()

/**
 * @swagger
 * /openai-assistants:
 *   get:
 *     summary: Get all OpenAI assistants
 *     tags:
 *       - OpenAI Assistants
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get('/', openaiAssistantsController.getAllOpenaiAssistants)

/**
 * @swagger
 * /openai-assistants/{id}:
 *   get:
 *     summary: Get a single OpenAI assistant
 *     tags:
 *       - OpenAI Assistants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get(['/', '/:id'], openaiAssistantsController.getSingleOpenaiAssistant)

export default router
