// TODO: put in helpers
class Exception extends Error {
    constructor (message, status, code) {
        super(message);

        this.message = message;
        this.name = this.constructor.name;
        this.status = status || 500;
        this.code = code;

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
            return;
        }

        this.stack = (new Error(message)).stack;
    }
}

module.exports = Exception;