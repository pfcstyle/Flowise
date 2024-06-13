import express from 'express'
import componentsCredentialsController from '../../controllers/components-credentials'
const router = express.Router()

/**
 * @swagger
 * /components-credentials-icon:
 *  post:
 *   summary: Create a new component credential icon
 *   tags:
 *    - credentials
 */
router.get(['/', '/:name'], componentsCredentialsController.getSingleComponentsCredentialIcon)

export default router
