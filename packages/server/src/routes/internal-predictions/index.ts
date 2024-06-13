import express from 'express'
import internalPredictionsController from '../../controllers/internal-predictions'
const router = express.Router()

/**
 * @swagger
 * /internal-predictions:
 *   post:
 *     summary: Create an internal prediction
 *     tags:
 *       - Internal Predictions
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
router.post(['/', '/:id'], internalPredictionsController.createInternalPrediction)

export default router
