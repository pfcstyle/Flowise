import express from 'express'
import multer from 'multer'
import path from 'path'
import openaiAssistantsController from '../../controllers/openai-assistants'

const router = express.Router()
const upload = multer({ dest: `${path.join(__dirname, '..', '..', '..', 'uploads')}/` })

/**
 * @swagger
 * /openai-assistants-file/download/:
 *   post:
 *     summary: Download a file from an assistant
 *     tags:
 *       - OpenAI Assistants
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/download/', openaiAssistantsController.getFileFromAssistant)

/**
 * @swagger
 * /openai-assistants-file/upload/:
 *   post:
 *     summary: Upload files to an assistant
 *     tags:
 *       - OpenAI Assistants
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/upload/', upload.array('files'), openaiAssistantsController.uploadAssistantFiles)

export default router
