# BetterCommerce PayPal NodeJS SDK

BetterCommerce's PayPal NodeJS SDK enables BC client applications to integrate with PayPal merchant API system. It publishes an interface to interact with [PayPal API v2](https://developer.paypal.com/docs/api/orders/v2/) endpoints.

Use below command for package installation:

```
npm install @better-commerce/bc-paypal-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## SDK Initialization

**Use following snippet to initialize the SDK:**

```
PayPalEnvironment.init("<client_id>", "<app_secret>", [useSandbox: boolean]);
```

## Usage Example

### Get Order Details

```
const data = {
    object_reference_id: "john@smith.com",
    mobile_number: "2233556644",
    email_address: "john@smith.com",
    first_name: "John",
    last_name: "Smith",
    mobile_country_code: "+1",
};
const order = new Order();
const result = await order.get("<order_id>");
```

### Response

```
{
  id: '<order_id>',
  intent: 'CAPTURE',
  status: 'COMPLETED',
  payment_source: {
    paypal: {
      email_address: '<email_address>',
      account_id: '<account_id>',
      name: [Object],
      address: [Object]
    }
  },
  ...
  ...
  ...
}
```