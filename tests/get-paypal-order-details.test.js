const { PayPalEnvironment, Order } = require("../dist");

PayPalEnvironment.init("<client_id>", "<app_secret>");
const order = new Order();
order.get("<order_id>")
    .then(response => {
        console.log(response)
    });