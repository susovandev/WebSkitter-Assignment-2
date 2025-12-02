const productDB = require('../db/product.db');
const ApiError = require('../utils/apiError.utils');
const { StatusCodes } = require('http-status-codes');
class ProductService {
	/**
	 * @description Retrieve all products from In-memory database.
	 * @throws {ApiError} if products is not found.
	 * @returns {Array} list of products.
	 */
	async getAll() {
		const productList = productDB;
		if (!productList.length) {
			throw new ApiError(StatusCodes.NOT_FOUND, 'Products not found');
		}

		return productList;
	}
	/**
	 * @param {String} productId
	 * @description Get a product by its ID.
	 * @throws {ApiError} if product is not found.
	 * @returns {Object} product object.
	 */
	async getById(productId) {
		const product = productDB.find((product) => product._id === Number(productId));
		if (!product) {
			throw new ApiError(StatusCodes.NOT_FOUND, 'Products not found');
		}

		return product;
	}
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
	/**
	 * @param {String} productId
	 * @param {Object} productData
	 * @description Update an existing product by its ID in In-memory database.
	 * @throws {ApiError} if product not found.
	 * @returns {Object} updated product 	Object.
	 */
	async update(productId, productData) {
		const product = productDB.find((product) => product._id === Number(productId));
		console.log(`TESTING COMMAND`, product);
		if (!product) {
			throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
		}

		product.name = productData.name || product.name;
		product.description = productData.description || product.description;
		product.price = productData.price || product.price;
		product.category = productData.category || product.category;
		product.inStock = productData.inStock || product.inStock;
		product.updatedAt = Date.now();
		return product;
	}
	/**
	 * @param {String} productId
	 * @description Remove a product by ID.
	 * @throws {ApiError} if product not found.
	 * @returns {Object} deleted product Object.
	 */
	async delete(productId) {
		const product = productDB.findIndex((product) => product._id === Number(productId));
		if (product === -1) {
			throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
		}
		productDB.splice(product, 1);
		return true;
	}
}

module.exports = new ProductService();
