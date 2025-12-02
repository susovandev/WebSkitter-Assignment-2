const express = require('express');
const validateSchema = require('../middlewares/validation.middleware');
const productValidation = require('../validations/product.validation');
const productController = require('../controllers/product.controller');

const router = express.Router();

/**
 * @route POST http://localhost:5000/api/products
 * @description Save product to In-memory database.
 */
router
	.route('/')
	.post(
		validateSchema(productValidation.createProductSchema, 'body'),
		productController.createProductHandler,
	);

module.exports = router;
