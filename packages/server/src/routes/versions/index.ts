import express from 'express'
import versionsController from '../../controllers/versions'
const router = express.Router()

/**
 * @swagger
 * /versions:
 *   get:
 *     summary: Get the version
 *     tags:
 *       - Versions
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get('/', versionsController.getVersion)

export default router
