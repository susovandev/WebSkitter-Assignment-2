const productDatabase = [
	{
		_id: 1,
		name: 'Product 1',
		description: 'Product 1 description',
		price: 100,
		category: 'Men',
		inStock: true,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	},
	{
		_id: 2,
		name: 'Product 2',
		description: 'Product 2 description',
		price: 200,
		category: 'Female',
		inStock: false,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	},
	{
		_id: 3,
		name: 'Product 3',
		description: 'Product 3 description',
		price: 300,
		category: 'Men',
		inStock: true,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	},
];

module.exports = productDatabase;
