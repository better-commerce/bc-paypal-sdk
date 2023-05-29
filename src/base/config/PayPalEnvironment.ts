import { Endpoints } from "../../constants/Endpoints";

/**
 * Class {PayPalEnvironment}
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
     * Returns the client id.
     * @return {string}
     */
    static getClientId(): string {
        return PayPalEnvironment.clientId;
    }

    /**
     * Returns the app secret.
     * @return {string}
     */
    static getAppSecret(): string {
        return PayPalEnvironment.appSecret;
    }

    /**
     * Returns the base url.
     * @return {string}
     */
    static getBaseUrl(): string {
        return PayPalEnvironment.baseUrl;
    }
}