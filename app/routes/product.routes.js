const express = require('express');
const validateSchema = require('../middlewares/validation.middleware');
const productValidation = require('../validations/product.validation');
const productController = require('../controllers/product.controller');

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       404:
 *         description: Products not found
 *       500:
 *         description: Server Error
 */
router.route('/').get(productController.getProductsHandler);

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server Error
 */
router
	.route('/:productId')
	.get(
		validateSchema(productValidation.getProductByIdSchema, 'params'),
		productController.getProductByIdHandler,
	);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: create Product
 *     tags:
 *       - Product
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: Add Product
 *        description: Add Product in In-memory database.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - description
 *            - category
 *            - price
 *            - inStock
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *            category:
 *              type: string
 *            price:
 *              type: integer
 *            inStock:
 *              type: boolean
 *     responses:
 *        201:
 *          description: Product created successfully
 *        400:
 *          description: Invalid request body
 *        500:
 *          description: Server Error
 */
router
	.route('/')
	.post(
		validateSchema(productValidation.createProductSchema, 'body'),
		productController.createProductHandler,
	);

/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Update a Product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: Update student
 *         description: Update Product in In-memory database.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - description
 *             - price
 *             - category
 *             - inStock
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: integer
 *             category:
 *               type: string
 *             inStock:
 *               type: boolean
 *     responses:
 *        200:
 *          description: Product updated successfully
 *        400:
 *          description: Invalid 	product ID
 *        404:
 *          description: Product not found
 *        500:
 *          description: Server Error
 *
 */
router
	.route('/:productId')
	.put(
		validateSchema(productValidation.getProductByIdSchema, 'params'),
		validateSchema(productValidation.updateProductSchema, 'body'),
		productController.updateProductHandler,
	);
/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server Error
 */
router
	.route('/:productId')
	.delete(
		validateSchema(productValidation.getProductByIdSchema, 'params'),
		productController.deleteProductHandler,
	);

module.exports = router;
