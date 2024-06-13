import express from 'express'
import componentsCredentialsController from '../../controllers/components-credentials'
const router = express.Router()

/**
 * @swagger
 * /components-credentials:
 *  post:
 *   summary: Create a new component credential
 *   tags:
 *    - credentials
 */
router.get('/', componentsCredentialsController.getAllComponentsCredentials)

/**
 * @swagger
 * /components-credentials:
 *  get:
 *   summary: Get all component credentials
 *   tags:
 *    - credentials
 */
router.get(['/', '/:name'], componentsCredentialsController.getComponentByName)

export default router
