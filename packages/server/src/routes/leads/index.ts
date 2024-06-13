import express from 'express'
import leadsController from '../../controllers/leads'
const router = express.Router()

/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Create a lead in chatflow
 *     tags:
 *       - Leads
 *     responses:
 *       200:
 *         description: OK
 */
// CREATE
router.post('/', leadsController.createLeadInChatflow)

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *     summary: Get all leads for chatflow
 *     tags:
 *       - Leads
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
// READ
router.get(['/', '/:id'], leadsController.getAllLeadsForChatflow)

export default router
