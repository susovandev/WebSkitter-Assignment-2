const app = require('./app/app');
const config = require('./app/config/config');

const NODE_ENV = config.NODE_ENV;
const PORT = config.PORT;

app.listen(PORT, () => {
	console.log(`Server is running in ${NODE_ENV} mode on http://localhost:${PORT}`);
	console.log(`API Documentation available at http://localhost:${config.PORT}/api-docs`);
});
