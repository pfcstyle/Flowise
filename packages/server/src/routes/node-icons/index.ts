import express from 'express'
import nodesController from '../../controllers/nodes'
const router = express.Router()

/**
 * @swagger
 * /node-icon/{name}:
 *   get:
 *     summary: Get a single node icon
 *     tags:
 *       - Nodes
 *     parameters:
 *       - in: path
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get(['/', '/:name'], nodesController.getSingleNodeIcon)

export default router
