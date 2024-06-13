import express from 'express'
import apikeyController from '../../controllers/apikey'
const router = express.Router()

/**
 * @swagger
 * /verify/apikey:
 *   get:
 *     summary: Verify an API key
 *     tags:
 *       - API Key
 *     parameters:
 *       - in: path
 *         name: apikey
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
// READ
router.get(['/apikey/', '/apikey/:apikey'], apikeyController.verifyApiKey)

export default router
