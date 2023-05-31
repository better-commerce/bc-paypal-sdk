import { Api } from "../api";
import { IOrder } from "../base/contracts/IOrder";
import { RequestMethod } from "../constants/enums/RequestMethod";

export class Order implements IOrder {
    async get(id: string): Promise<any> {
        const getOrderResult = await Api.call(`v2/checkout/orders/${id}`, RequestMethod.GET);
        return getOrderResult;
    }
}