import express from 'express'
import apikeyController from '../../controllers/apikey'
const router = express.Router()

/** @swagger
 * /apikey:
 *  post:
 *   summary: Create a new API key
 *   tags:
 *    - API Keys
 */
router.post('/', apikeyController.createApiKey)
router.post('/import', apikeyController.importKeys)

/**
 * @swagger
 * /apikey:
 *  get:
 *   summary: Get all API keys
 *   tags:
 *    - API Keys
 */
router.get('/', apikeyController.getAllApiKeys)

/** @swagger
 * /apikey/{id}:
 *  put:
 *   summary: Update an API key
 *   tags:
 *    - API Keys
 */
router.put(['/', '/:id'], apikeyController.updateApiKey)

/** @swagger
 * /apikey/{id}:
 *  delete:
 *   summary: Delete an API key
 *   tags:
 *    - API Keys
 */
router.delete(['/', '/:id'], apikeyController.deleteApiKey)

export default router
