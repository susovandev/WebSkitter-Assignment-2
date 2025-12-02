const Joi = require('joi');

const productValidation = {
	createProductSchema: Joi.object({
		name: Joi.string().min(3).max(100).required(),
		description: Joi.string().min(10).max(500).required(),
		price: Joi.number().precision(2).greater(0).required(),
		category: Joi.string().required(),
		inStock: Joi.boolean().default(true).required(),
	}),
	getProductByIdSchema: Joi.object({
		productId: Joi.number().integer().required(),
	}),
};

module.exports = productValidation;
