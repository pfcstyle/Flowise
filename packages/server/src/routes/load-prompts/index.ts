import express from 'express'
import loadPromptsController from '../../controllers/load-prompts'
const router = express.Router()

/**
 * @swagger
 * /load-prompt:
 *   post:
 *     summary: Create a prompt
 *     tags:
 *       - Load Prompts
 *     responses:
 *       200:
 *         description: OK
 */
// CREATE
router.post('/', loadPromptsController.createPrompt)

export default router
