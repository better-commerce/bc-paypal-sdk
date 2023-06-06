import { Api } from "../api";
import { IOrder } from "../base/contracts/IOrder";
import { RequestMethod } from "../constants/enums/RequestMethod";

export class Order implements IOrder {

    /**
     * Show order details. Shows details for an order, by ID.
     * API Reference - https://developer.paypal.com/docs/api/orders/v2/#orders_get
     * @param data {String}
     * @returns 
     */
    async get(id: string): Promise<any> {
        const getOrderResult = await Api.call(`v2/checkout/orders/${id}`, RequestMethod.GET);
        return getOrderResult;
    }
}