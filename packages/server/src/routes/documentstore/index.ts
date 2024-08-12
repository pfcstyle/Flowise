import express from 'express'
import documentStoreController from '../../controllers/documentstore'
const router = express.Router()

/** Document Store Routes */

/**
 * @swagger
 * /document-store/store:
 *   post:
 *     summary: Create a new document store
 *     tags:
 *       - Document Store
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocumentStore'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentStore'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/store', documentStoreController.createDocumentStore)

/**
 * @swagger
 * /document-store/stores:
 *   post:
 *     summary: Get all document stores
 *     tags:
 *       - Document Store
 */
router.get('/stores', documentStoreController.getAllDocumentStores)

/**
 * @swagger
 * /document-store/store/{id}:
 *   post:
 *     summary: Get a document store by ID
 *     tags:
 *       - Document Store
 */
router.get('/store/:id', documentStoreController.getDocumentStoreById)

/**
 * @swagger
 * /document-store/store/{id}:
 *   put:
 *     summary: Update a document store
 *     tags:
 *       - Document Store
 */
router.put('/store/:id', documentStoreController.updateDocumentStore)

/**
 * @swagger
 * /document-store/store/{id}:
 *   delete:
 *     summary: Delete a document store
 *     tags:
 *       - Document Store
 */
router.delete('/store/:id', documentStoreController.deleteDocumentStore)

/** Component Nodes = Document Store - Loaders */
/**
 * @swagger
 * /document-store/loaders:
 *   get:
 *     summary: Get document loaders
 *     tags:
 *       - Document Store
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/components/loaders', documentStoreController.getDocumentLoaders)
/**
 * @swagger
 * /document-store/loader/{id}/{loaderId}:
 *   delete:
 *     summary: Delete a loader from a document store
 *     tags:
 *       - Document Store
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: loaderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/loader/:id/:loaderId', documentStoreController.deleteLoaderFromDocumentStore)
/**
 * @swagger
 * /document-store/loader/preview:
 *   post:
 *     summary: Preview file chunks
 *     tags:
 *       - Document Store
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/loader/preview', documentStoreController.previewFileChunks)
/**
 * @swagger
 * /document-store/loader/process:
 *   post:
 *     summary: Process file chunks
 *     tags:
 *       - Document Store
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/loader/process', documentStoreController.processFileChunks)

/** Document Store - Loaders - Chunks */
/**
 * @swagger
 * /document-store/chunks/{storeId}/{loaderId}/{chunkId}:
 *   delete:
 *     summary: Delete a file chunk from a document store
 *     tags:
 *       - Document Store
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: loaderId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: chunkId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
/**
 * @swagger
 * /document-store/chunks/{storeId}/{loaderId}/{chunkId}:
 *   put:
 *     summary: Edit a file chunk in a document store
 *     tags:
 *       - Document Store
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: loaderId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: chunkId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/chunks/:storeId/:loaderId/:chunkId', documentStoreController.editDocumentStoreFileChunk)

/**
 * @swagger
 * /document-store/chunks/{storeId}/{fileId}/{pageNo}:
 *   get:
 *     summary: Get file chunks from a document store
 *     tags:
 *       - Document Store
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pageNo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/chunks/:storeId/:fileId/:pageNo', documentStoreController.getDocumentStoreFileChunks)

// add chunks to the selected vector store
router.post('/vectorstore/insert', documentStoreController.insertIntoVectorStore)
// save the selected vector store
router.post('/vectorstore/save', documentStoreController.saveVectorStoreConfig)
// delete data from the selected vector store
router.delete('/vectorstore/:storeId', documentStoreController.deleteVectorStoreFromStore)
// query the vector store
router.post('/vectorstore/query', documentStoreController.queryVectorStore)
// Get all embedding providers
router.get('/components/embeddings', documentStoreController.getEmbeddingProviders)
// Get all vector store providers
router.get('/components/vectorstore', documentStoreController.getVectorStoreProviders)
// Get all Record Manager providers
router.get('/components/recordmanager', documentStoreController.getRecordManagerProviders)

// update the selected vector store from the playground
router.post('/vectorstore/update', documentStoreController.updateVectorStoreConfigOnly)

export default router
