import { Endpoints } from "../../constants/Endpoints";

/**
 * Class {PayPalEnvironment} is used to configure the PayPal environment. It provides a static method {@link init} to
 * initialize the client id, app secret and the base url for the PayPal API.
 *
 * @static
 */
export class PayPalEnvironment {

    // Static variables
    /**
     * Field to store the client id.
     * @property {string}
     */
    static clientId: string;

    /**
     * Field to store the app secret.
     * @property {string}
     */
    static appSecret: string;

    /**
     * Field to store the paypal base url.
     * @property {string}
     */
    static baseUrl: string;

    /**
     * Initializes the PayPal environment with the given client id and app secret.
     *
     * @param {string} clientId - The client id to use for the PayPal API.
     * @param {string} appSecret - The app secret to use for the PayPal API.
     * @param {boolean} [useSandBox=true] - If true, the environment will be set to sandbox mode.
     * @return {PayPalEnvironment} - The PayPalEnvironment instance, for chaining.
     */
    static init(clientId: string, appSecret: string, useSandBox = true) {
        PayPalEnvironment.clientId = clientId;
        PayPalEnvironment.appSecret = appSecret;

        if (useSandBox) {
            PayPalEnvironment.baseUrl = Endpoints.Base.SANDBOX_URL;
        } else {
            PayPalEnvironment.baseUrl = Endpoints.Base.PRODUCTION_URL;
        }
        return this;
    }

    /**
     * Returns the client id that was set with {@link init}.
     * @return {string} The client id.
     */
    static getClientId(): string {
        return PayPalEnvironment.clientId;
    }

    /**
     * Returns the app secret that was set with {@link init}.
     * @return {string} The app secret.
     */
    static getAppSecret(): string {
        return PayPalEnvironment.appSecret;
    }

    /**
     * Returns the base url for the PayPal API that was set with {@link init}.
     * @return {string} The base url for the PayPal API.
     */
    static getBaseUrl(): string {
        return PayPalEnvironment.baseUrl;
    }
}