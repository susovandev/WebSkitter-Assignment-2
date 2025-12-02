const asyncHandler = require('../utils/asyncHandler.utils');
const ApiResponse = require('../utils/apiResponse.utils');
const productService = require('../services/product.service');
const { StatusCodes } = require('http-status-codes');

class ProductController {
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
}

module.exports = new ProductController();
