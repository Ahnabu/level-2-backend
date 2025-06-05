

class AppError extends Error{
    public statusCode: number;

    constructor(statusCode: number, message: string,stack='') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
           this.stack = stack; // Assign the provided stack trace if available
        } else {
             Error.captureStackTrace(this, this.constructor);
       }
        // Capture the stack trace for better debugging
    }

}

export default AppError;