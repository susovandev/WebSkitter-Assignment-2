class ApiResponse {
	constructor(statusCode, message = 'OK', data = null) {
		this.statusCode = statusCode;
		this.status = true;
		this.message = message;
		this.data = data;
	}
}

module.exports = ApiResponse;
