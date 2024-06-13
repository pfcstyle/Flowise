import express from 'express'
import getUploadPathController from '../../controllers/get-upload-path'
const router = express.Router()

/**
 * @swagger
 * /get-upload-path:
 *   get:
 *     summary: Get the path for uploads
 *     tags:
 *       - Upload Path
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get('/', getUploadPathController.getPathForUploads)

export default router
