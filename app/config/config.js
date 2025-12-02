const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const config = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 3000,
};

module.exports = Object.freeze(config);
