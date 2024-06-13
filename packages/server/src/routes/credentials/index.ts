import express from 'express'
import credentialsController from '../../controllers/credentials'
const router = express.Router()

/**
 * @swagger
 * /credentials:
 *  post:
 *   summary: Create a new credential
 *   tags:
 *    - credentials
 */
router.post('/', credentialsController.createCredential)

/**
 * @swagger
 * /credentials:
 *  get:
 *   summary: Get all credentials
 *   tags:
 *    - credentials
 */
router.get('/', credentialsController.getAllCredentials)

/**
 * @swagger
 * /credentials/{id}:
 *  get:
 *   summary: Get a credential by ID
 *   tags:
 *    - credentials
 */
router.get(['/', '/:id'], credentialsController.getCredentialById)

/**
 * @swagger
 * /credentials/{id}:
 *  put:
 *   summary: Update a credential
 *   tags:
 *    - credentials
 */
router.put(['/', '/:id'], credentialsController.updateCredential)

/**
 * @swagger
 * /credentials/{id}:
 *  delete:
 *   summary: Delete a credential
 *   tags:
 *    - credentials
 */
router.delete(['/', '/:id'], credentialsController.deleteCredentials)

export default router
