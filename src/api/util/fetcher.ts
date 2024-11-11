import axios from "../../base/api"
import { PayPalEnvironment } from "../../base/config/PayPalEnvironment";
import { APIException, AuthenticationException, InvalidRequestException } from "../../base/entity";
import { RequestMethod } from "../../constants/enums/RequestMethod";

const SingletonFactory = (function () {
    let accessToken = '';
    const axiosInstance = axios.create({
        baseURL: PayPalEnvironment.baseUrl,
        withCredentials: true,
    });
    const getToken = () => accessToken;

    const setToken = (token: string) => (accessToken = token);

    const clearToken = () => (accessToken = '');

    axiosInstance.interceptors.request.use(
        (config: any) => {

            /**
             * Error: {"status":401,"data":{"error":"invalid_token","error_description":"Access Token not found in cache"}}
             * Due to above error received from the gateway, generate a new token on each request. 
             * It seems Paypal internally caches the token and returns the same token value in subsequent calls till the
             * time it gets expired.
             * 
             * For e.g. - Receiving the same token when 10 concurrent/subsequent calls are sent on generate token API:
             * 
             * ------
             * Call 1
             * ------
             * - token: A21AAOPxbnmoPPv0f03H404UjVAnxpFldkOSBrVEm7m6o5M4jdEMcs2Bg6ET7UszYoy92BmIHckGCKw4kAWPCUryJFSLxplGA
             * - expires_in: 32317
             * 
             * ------
             * Call 2
             * ------
             * - token: A21AAOPxbnmoPPv0f03H404UjVAnxpFldkOSBrVEm7m6o5M4jdEMcs2Bg6ET7UszYoy92BmIHckGCKw4kAWPCUryJFSLxplGA
             * - expires_in: 32333
             */

            const url = new URL('v1/oauth2/token', PayPalEnvironment.getBaseUrl());
            const auth = Buffer.from(`${PayPalEnvironment.getClientId()}:${PayPalEnvironment.getAppSecret()}`).toString("base64");
            return axios({
                url: url.href,
                method: RequestMethod.POST,
                data: `grant_type=client_credentials`,
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }).then((res: any) => {
                const token = res?.data?.access_token;
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            }).catch((error: any) => {
                return config;
            });
        },
        (err) => Promise.reject(err)
    );

    /**
     * Creates an axios interceptor to catch 401 errors and try to refresh the token.
     * If the token refresh causes another 401 error, the interceptor is ejected to prevent an infinite loop.
     * The interceptor is then recreated after the token refresh.
     */
    function createAxiosResponseInterceptor() {
        const interceptor = axiosInstance.interceptors.response.use(
            (response: any) => response,
            (error: any) => {
                // Reject promise if usual error
                if (error?.response?.status !== 401) {
                    return Promise.reject(error);
                }
                /*
                 * When response code is 401, try to refresh the token.
                 * Eject the interceptor so it doesn't loop in case
                 * token refresh causes the 401 response
                 */
                axiosInstance.interceptors.response.eject(interceptor);

                // return getAuthToken().finally(createAxiosResponseInterceptor)
                const url = new URL('v1/oauth2/token', PayPalEnvironment.getBaseUrl());
                const auth = Buffer.from(`${PayPalEnvironment.getClientId()}:${PayPalEnvironment.getAppSecret()}`).toString("base64");

                return axiosInstance({
                    url: url.href,
                    method: RequestMethod.POST,
                    data: `grant_type=client_credentials`,
                    headers: {
                        Authorization: `Basic ${auth}`,
                    },
                })
                    .then((res: any) => {
                        setToken(res.data.access_token);
                        error.response.config.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                        return axiosInstance(error.response.config);
                    })
                    .catch((error) => {
                        //@TODO redirect here to Login page
                        return Promise.reject(error);
                    })
                    .finally(createAxiosResponseInterceptor)
            }
        )
    }

    createAxiosResponseInterceptor();
    return { axiosInstance };
})()

const axiosInstance = SingletonFactory.axiosInstance;

Object.freeze(axiosInstance)

/**
 * A helper function to call the PayPal APIs. It handles the
 * authentication and the refreshing of the access token.
 *
 * @param {Object} options - The options to send with the request.
 * @param {string} options.url - The URL of the API endpoint.
 * @param {string} options.method - The HTTP method to use for the request.
 * @param {Object} options.data - The data to send with the request.
 * @param {Object} options.params - The URL parameters to send with the request.
 * @param {Object} options.headers - The headers to send with the request.
 * @param {Object} options.cookies - The cookies to send with the request.
 * @param {string} options.baseUrl - The base URL to use for the request.
 *
 * @returns {Promise<Object>} - A promise that resolves with the response data.
 * @throws {InvalidRequestException} - If the request is invalid.
 * @throws {AuthenticationException} - If the authentication fails.
 * @throws {APIException} - If there is a problem with the API.
 */
const fetcher = async ({ url = '', method = 'post', data = {}, params = {}, headers = {}, cookies = {}, baseUrl = "", }: any) => {
    const computedUrl = new URL(url, baseUrl || PayPalEnvironment.getBaseUrl());
    const config: any = {
        method: method,
        url: computedUrl.href,
        headers,
    };

    if (Object.keys(params).length) {
        config.params = params;
    }

    if (Object.keys(data).length) {
        config.data = data;
    }
    //console.log(config)
    try {
        const response = await axiosInstance(config);

        let responseCode = response.status;
        let responseBody = response.data;
        if (responseCode >= 200 && responseCode < 300) {
            return responseBody;
        } else {
            let status = undefined;
            let errorCode = undefined;
            let errorMessage = undefined;

            if (responseBody != undefined) {
                if ("status" in responseBody != undefined) {
                    status = responseBody.status;
                }

                if ("error_code" in responseBody != undefined) {
                    errorCode = responseBody.error_code;
                }

                if ("error_message" in responseBody != undefined) {
                    errorMessage = responseBody.error_message;
                }
            }
            switch (responseCode) {
                case 400:
                case 404:
                    throw new InvalidRequestException(responseCode, status, errorCode, errorMessage);

                case 401:
                    throw new AuthenticationException(responseCode, status, errorCode, errorMessage);

                default:
                    throw new APIException(responseCode, "internal_error", "internal_error", "Something went wrong.");
            }
        }
    } catch (error: any) {
        let errorData = {};

        if (error.response) {
            //errorData = error.response;
            errorData = {
                //headers: error.response.headers,
                status: error.response.status,
                data: error.response.data,
            };

            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            errorData = error.request;

            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            errorData = error.message;

            // Something happened in setting up the request that triggered an Error
            console.log('Error: ' + error.message);
        }

        return { hasError: true, error: errorData };

        //console.log(error, 'error inside fetcher');
        //throw new Error(error.response.data.message);
    }
}
export default fetcher;