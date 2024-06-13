import express from 'express'
import multer from 'multer'
import path from 'path'
import predictionsController from '../../controllers/predictions'

const router = express.Router()

const upload = multer({ dest: `${path.join(__dirname, '..', '..', '..', 'uploads')}/` })

/**
 * @swagger
 * /prediction:
 *   post:
 *     summary: Create a prediction
 *     tags:
 *       - Predictions
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
router.post(['/', '/:id'], upload.array('files'), predictionsController.getRateLimiterMiddleware, predictionsController.createPrediction)

export default router
