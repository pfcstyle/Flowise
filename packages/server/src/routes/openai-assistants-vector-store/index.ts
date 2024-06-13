import express from 'express'
import multer from 'multer'
import path from 'path'
import openaiAssistantsVectorStoreController from '../../controllers/openai-assistants-vector-store'

const router = express.Router()
const upload = multer({ dest: `${path.join(__dirname, '..', '..', '..', 'uploads')}/` })

/**
 * @swagger
 * /openai-assistants-vector-store:
 *   post:
 *     summary: Create an assistant vector store
 *     tags:
 *       - OpenAI Assistants Vector Store
 *     responses:
 *       200:
 *         description: OK
 */
// CREATE
router.post('/', openaiAssistantsVectorStoreController.createAssistantVectorStore)

/**
 * @swagger
 * /openai-assistants-vector-store/{id}:
 *   get:
 *     summary: Get an assistant vector store
 *     tags:
 *       - OpenAI Assistants Vector Store
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
// READ
router.get('/:id', openaiAssistantsVectorStoreController.getAssistantVectorStore)

/**
 * @swagger
 * /openai-assistants-vector-store:
 *   get:
 *     summary: List assistant vector stores
 *     tags:
 *       - OpenAI Assistants Vector Store
 *     responses:
 *       200:
 *         description: OK
 */
// LIST
router.get('/', openaiAssistantsVectorStoreController.listAssistantVectorStore)

/**
 * @swagger
 * /openai-assistants-vector-store/{id}:
 *   put:
 *     summary: Update an assistant vector store
 *     tags:
 *       - OpenAI Assistants Vector Store
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
// UPDATE
router.put(['/', '/:id'], openaiAssistantsVectorStoreController.updateAssistantVectorStore)

/**
 * @swagger
 * /openai-assistants-vector-store/{id}:
 *   delete:
 *     summary: Delete an assistant vector store
 *     tags:
 *       - OpenAI Assistants Vector Store
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
// DELETE
router.delete(['/', '/:id'], openaiAssistantsVectorStoreController.deleteAssistantVectorStore)

/**
 * @swagger
 * /openai-assistants-vector-store/{id}:
 *   post:
 *     summary: Upload files to an assistant vector store
 *     tags:
 *       - OpenAI Assistants Vector Store
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
// POST
router.post('/:id', upload.array('files'), openaiAssistantsVectorStoreController.uploadFilesToAssistantVectorStore)

export default router
