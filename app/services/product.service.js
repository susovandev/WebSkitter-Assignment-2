const productDB = require('../db/product.db');
const ApiError = require('../utils/apiError.utils');
const { StatusCodes } = require('http-status-codes');
const { v4: uuid } = require('uuid');
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
		const product = productDB.find((product) => product._id === productId);
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
			_id: uuid(),
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
		const productIndex = productDB.findIndex((product) => product._id === productId);
		if (productIndex === -1) {
			throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
		}
		productDB[productIndex] = {
			...productDB[productIndex],
			...productData,
			updatedAt: Date.now(),
		};

		return productDB[productIndex];
	}
	/**
	 * @param {String} productId
	 * @description Remove a product by ID.
	 * @throws {ApiError} if product not found.
	 * @returns {Object} deleted product Object.
	 */
	async delete(productId) {
		const product = productDB.findIndex((product) => product._id === productId);
		if (product === -1) {
			throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
		}
		productDB.splice(product, 1);
		return true;
	}
}

module.exports = new ProductService();
