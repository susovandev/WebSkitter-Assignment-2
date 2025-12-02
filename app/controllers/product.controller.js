const asyncHandler = require('../utils/asyncHandler.utils');
const ApiResponse = require('../utils/apiResponse.utils');
const productService = require('../services/product.service');
const { StatusCodes } = require('http-status-codes');

class ProductController {
	getProductsHandler = asyncHandler(async (req, res) => {
		console.log(`[AuthController] Fetch all products request received`);
		// Delegate core logic to service layer
		const products = await productService.getAll();

		return res
			.status(StatusCodes.OK)
			.json(new ApiResponse(StatusCodes.OK, 'Products retrieved successfully', products));
	});
	getProductByIdHandler = asyncHandler(async (req, res) => {
		console.log(
			`[AuthController] Fetch product by id request received with id: ${req.params.productId}`,
		);
		// Delegate core logic to service layer
		const product = await productService.getById(req.params.productId);

		return res
			.status(StatusCodes.OK)
			.json(new ApiResponse(StatusCodes.OK, 'Product retrieved successfully', product));
	});
	createProductHandler = asyncHandler(async (req, res) => {
		console.log(
			`[AuthController] create product request received with body: ${JSON.stringify(req.body)}`,
		);
		// Delegate core logic to service layer
		const newProduct = await productService.create(req.body);

		return res
			.status(StatusCodes.CREATED)
			.json(new ApiResponse(StatusCodes.CREATED, 'Product created successfully', newProduct));
	});
	updateProductHandler = asyncHandler(async (req, res) => {
		console.log(
			`[AuthController] update product request received with body: ${JSON.stringify(req.body)} and id: ${req.params.productId}`,
		);
		// Delegate core logic to service layer
		const updatedProduct = await productService.update(req.params.productId, req.body);

		return res
			.status(StatusCodes.OK)
			.json(new ApiResponse(StatusCodes.OK, 'Product updated successfully', updatedProduct));
	});
}

module.exports = new ProductController();
