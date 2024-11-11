import { BaseException } from "./BaseException";

/**
 * Class {APIConnectionException} representing an API connection exception.
 * Extends from BaseException to provide additional context
 * for errors related to API connectivity issues.
 */
export class APIConnectionException extends BaseException {

    /**
     * @param {any} httpResponseCode - The HTTP response code.
     * @param {string} status - The status of the exception.
     * @param {string} errorCode - The error code of the exception.
     * @param {string} errorMessage - The error message.
     */
    constructor(httpResponseCode: any, status: string, errorCode: string, errorMessage: string) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }

};