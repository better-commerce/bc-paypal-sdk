/**
 * Class {BaseException} represents the base exception class from which all other exceptions are derived.
 *
 * @class BaseException
 * @extends {Error}
 */
export class BaseException extends Error {
    
    /**
     * Constructs a new BaseException instance.
     * 
     * @param {any} httpResponseCode - The HTTP response code associated with the exception.
     * @param {any} status - The status of the exception.
     * @param {string} errorCode - A string representing the error code.
     * @param {string} errorMessage - A descriptive message explaining the error.
     */
    constructor(public httpResponseCode: any, public status: any, public errorCode: string, public errorMessage: string) {
        super(errorMessage);
        this.httpResponseCode = httpResponseCode;
        this.status = status;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    /**
     * Returns the HTTP response code associated with the exception.
     * @returns {any} The HTTP response code.
     */
    getHttpResponseCode() {
        return this.httpResponseCode;
    }

    /**
     * Returns the status associated with the exception.
     * @returns {any} The status associated with the exception.
     */
    getStatus() {
        return this.status;
    }

    /**
     * Returns the error code associated with the exception.
     * @returns {string} The error code associated with the exception.
     */
    getErrorCode() {
        return this.errorCode;
    }

    /**
     * Returns the error message associated with the exception.
     * @returns {string} The error message.
     */
    getErrorMessage() {
        return this.errorMessage;
    }

};