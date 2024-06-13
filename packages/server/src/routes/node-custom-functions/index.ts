import express from 'express'
import nodesRouter from '../../controllers/nodes'
const router = express.Router()

/**
 * @swagger
 * /node-custom-function:
 *   post:
 *     summary: Execute a custom function
 *     tags:
 *       - Nodes
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.post('/', nodesRouter.executeCustomFunction)

export default router
