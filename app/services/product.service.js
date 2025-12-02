const productDB = require('../db/product.db');
const ApiError = require('../utils/apiError.utils');
const { StatusCodes } = require('http-status-codes');
class ProductService {
	/**
	 * @param {Object} productData
	 * @description Save product to In-memory database.
	 * @throws {ApiError} if product creation fails.
	 * @returns {Object} newly created product Object.
	 */
	async create(productData) {
		const newProduct = productDB.push({
			...productData,
			_id: productDB.length + 1,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		});
		if (!newProduct) {
			throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Product creation failed');
		}
		return productDB[productDB.length - 1];
	}
}

module.exports = new ProductService();
