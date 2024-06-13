import express from 'express'
import multer from 'multer'
import path from 'path'
import vectorsController from '../../controllers/vectors'

const router = express.Router()

const upload = multer({ dest: `${path.join(__dirname, '..', '..', '..', 'uploads')}/` })

/**
 * @swagger
 * /vector/upsert:
 *   post:
 *     summary: Upsert a vector
 *     tags:
 *       - Vectors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
// CREATE
router.post(
    ['/upsert/', '/upsert/:id'],
    upload.array('files'),
    vectorsController.getRateLimiterMiddleware,
    vectorsController.upsertVectorMiddleware
)

/**
 * @swagger
 * /vector/internal-upsert:
 *   post:
 *     summary: Create an internal upsert
 *     tags:
 *       - Vectors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post(['/internal-upsert/', '/internal-upsert/:id'], vectorsController.createInternalUpsert)

export default router
