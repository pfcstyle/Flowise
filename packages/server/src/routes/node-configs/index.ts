import express from 'express'
import nodeConfigsController from '../../controllers/node-configs'
const router = express.Router()

/**
 * @swagger
 * /node-config:
 *   post:
 *     summary: Get all node configs
 *     tags:
 *       - Nodes
 *     responses:
 *       200:
 *         description: OK
 */
// CREATE
router.post('/', nodeConfigsController.getAllNodeConfigs)

export default router
