import express from 'express'
import toolsController from '../../controllers/tools'
const router = express.Router()

/**
 * @swagger
 * /tools:
 *   post:
 *     summary: Create a tool
 *     tags:
 *       - Tools
 *     responses:
 *       200:
 *         description: OK
 */
// CREATE
router.post('/', toolsController.createTool)

/**
 * @swagger
 * /tools:
 *   get:
 *     summary: Get all tools
 *     tags:
 *       - Tools
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get('/', toolsController.getAllTools)

/**
 * @swagger
 * /tools/{id}:
 *   get:
 *     summary: Get a tool by id
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get(['/', '/:id'], toolsController.getToolById)

/**
 * @swagger
 * /tools/{id}:
 *   put:
 *     summary: Update a tool
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
// UPDATE
router.put(['/', '/:id'], toolsController.updateTool)

/**
 * @swagger
 * /tools/{id}:
 *   delete:
 *     summary: Delete a tool
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
// DELETE
router.delete(['/', '/:id'], toolsController.deleteTool)

export default router
