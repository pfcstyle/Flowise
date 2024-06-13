import express from 'express'
import upsertHistoryController from '../../controllers/upsert-history'
const router = express.Router()

/**
 * @swagger
 * /upsert-history:
 *   get:
 *     summary: Get all upsert history
 *     tags:
 *       - Upsert History
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
// READ
router.get(['/', '/:id'], upsertHistoryController.getAllUpsertHistory)

/**
 * @swagger
 * /upsert-history:
 *   patch:
 *     summary: Patch delete upsert history
 *     tags:
 *       - Upsert History
 *     responses:
 *       200:
 *         description: OK
 */
// PATCH
router.patch('/', upsertHistoryController.patchDeleteUpsertHistory)

export default router
