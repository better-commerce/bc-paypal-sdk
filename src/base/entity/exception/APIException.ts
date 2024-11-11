import { BaseException } from "./BaseException";

/**
 * Class {APIException} represents an exception that occurs when the PayPal API returns an error.
 *
 * @class APIException
 * @extends {BaseException}
 */
export class APIException extends BaseException {

    /**
     * Creates a new APIException instance.
     * @param {any} httpResponseCode - The HTTP response code.
     * @param {string} status - The status of the API request.
     * @param {string} errorCode - The error code returned by the PayPal API.
     * @param {string} errorMessage - The error message returned by the PayPal API.
     */
    constructor(httpResponseCode: any, status: string, errorCode: string, errorMessage: string) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }
};