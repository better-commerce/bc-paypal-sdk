import { BaseException } from "./BaseException";

/**
 * Class {InvalidRequestException} representing an invalid request error.
 * Extends from BaseException to provide additional context 
 * for errors related to invalid requests.
 */
export class InvalidRequestException extends BaseException {
    
    /**
     * Constructor for the InvalidRequestException.
     * If the parameters are not provided, the default values are:
     * - httpResponseCode: 400
     * - status: "invalid_request"
     * - errorCode: "invalid_request"
     * - errorMessage: "Please pass valid arguments."
     * @param {number} [httpResponseCode] - The HTTP status code for the exception.
     * @param {string} [status] - The status for the exception.
     * @param {string} [errorCode] - The error code for the exception.
     * @param {string} [errorMessage] - The error message for the exception.
     */
    constructor(httpResponseCode = undefined, status = undefined, errorCode = undefined, errorMessage = undefined) {
        if (httpResponseCode == undefined) {
            super(400, "invalid_request", "invalid_request", "Please pass valid arguments.");
        } else {
            super(httpResponseCode, status, errorCode, errorMessage);
        }
    }

};

