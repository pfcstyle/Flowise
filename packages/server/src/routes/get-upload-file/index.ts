import express from 'express'
import getUploadFileController from '../../controllers/get-upload-file'
const router = express.Router()

/**
 * @swagger
 * /get-upload-file:
 *   get:
 *     summary: Stream the uploaded file
 *     tags:
 *       - chatflows
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get('/', getUploadFileController.streamUploadedFile)

export default router
