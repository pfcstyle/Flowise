import express from 'express'
import promptsListController from '../../controllers/prompts-lists'
const router = express.Router()

/**
 * @swagger
 * /prompts-list:
 *   post:
 *     summary: Create a prompts list
 *     tags:
 *       - Prompts Lists
 *     responses:
 *       200:
 *         description: OK
 */
// CREATE
router.post('/', promptsListController.createPromptsList)

export default router
