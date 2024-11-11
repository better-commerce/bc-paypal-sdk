import { PayPalEnvironment } from "../base/config/PayPalEnvironment";
import { RequestMethod } from "../constants/enums/RequestMethod";
import fetcher from "./util/fetcher";

/**
 * Class {BetterCommerce} provides a simple way to make HTTP requests to the PayPal API.
 * Handles the details of constructing the request and parsing the response.
 */
export class Api {

/**
 * Sends an HTTP request to the specified URL using the provided method.
 * Constructs the request options with optional parameters and cookies.
 * If the method is GET, parameters are added as URL params.
 * If the method is POST, parameters are added to the request body.
 *
 * @param url - The endpoint URL to send the request to.
 * @param method - The HTTP method to use for the request (e.g., GET, POST).
 * @param params - Optional parameters to include in the request.
 * @param cookies - Optional cookies to include in the request.
 * @returns A promise that resolves with the response data.
 */
    static async call(url: string, method: string, params?: any, cookies?: any): Promise<any> {

        let options = { url, method, cookies, baseUrl: PayPalEnvironment.baseUrl, };

        if (params) {
            if (method?.toUpperCase() === RequestMethod.GET) {
                options = { ...options, ...{ params: params }, };
            } else if (method?.toUpperCase() === RequestMethod.POST) {
                options = { ...options, ...{ data: params }, };
            }
        }

        return await fetcher(options);
    }
}