import { BaseException } from "./BaseException";

/**
 * Class {AuthenticationException} representing an authentication error.
 * Extends from BaseException to provide additional context
 * for errors related to authentication.
 *
 * @extends {BaseException}
 */
export class AuthenticationException extends BaseException {

    /**
     * Constructor for the AuthenticationException.
     * @param {any} httpResponseCode - The HTTP status code for the exception.
     * @param {string} status - The status for the exception.
     * @param {string} errorCode - The error code for the exception.
     * @param {string} errorMessage - The error message for the exception.
     */
    constructor(httpResponseCode: any, status: string, errorCode: string, errorMessage: string) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }

};

