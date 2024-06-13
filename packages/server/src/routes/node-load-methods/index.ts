import express from 'express'
import nodesRouter from '../../controllers/nodes'
const router = express.Router()

/**
 * @swagger
 * /node-load-method:
 *   post:
 *     summary: Get a single node async options
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
router.post(['/', '/:name'], nodesRouter.getSingleNodeAsyncOptions)

export default router
