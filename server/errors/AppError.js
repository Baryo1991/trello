class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode;

        this.status = `${statusCode}`.startsWith(4) ? 'fail': 'error';

        Error.captureStackTrace(this, constructor);
    }
}

export default AppError;