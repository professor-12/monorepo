export class AppError extends Error {
    status;
    message;
    constructor(message, status = 500) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}
