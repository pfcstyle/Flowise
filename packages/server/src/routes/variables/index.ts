import express from 'express'
import variablesController from '../../controllers/variables'
const router = express.Router()

/**
 * @swagger
 * /variables:
 *   post:
 *     summary: Create a variable
 *     tags:
 *       - Variables
 *     responses:
 *       200:
 *         description: OK
 */
// CREATE
router.post('/', variablesController.createVariable)

/**
 * @swagger
 * /variables:
 *   get:
 *     summary: Get all variables
 *     tags:
 *       - Variables
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get('/', variablesController.getAllVariables)

/**
 * @swagger
 * /variables/{id}:
 *   put:
 *     summary: Update a variable
 *     tags:
 *       - Variables
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
router.put(['/', '/:id'], variablesController.updateVariable)

/**
 * @swagger
 * /variables/{id}:
 *   delete:
 *     summary: Delete a variable
 *     tags:
 *       - Variables
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
router.delete(['/', '/:id'], variablesController.deleteVariable)

export default router
