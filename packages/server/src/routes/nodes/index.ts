import express from 'express'
import nodesController from '../../controllers/nodes'
const router = express.Router()

/**
 * @swagger
 * /nodes:
 *   get:
 *     summary: Get all nodes
 *     tags:
 *       - Nodes
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get('/', nodesController.getAllNodes)

/**
 * @swagger
 * /nodes/{name}:
 *   get:
 *     summary: Get a node by name
 *     tags:
 *       - Nodes
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/:name', nodesController.getNodeByName)

/**
 * @swagger
 * /nodes/category/{name}:
 *   get:
 *     summary: Get nodes by category
 *     tags:
 *       - Nodes
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/category/:name', nodesController.getNodesByCategory)

export default router
