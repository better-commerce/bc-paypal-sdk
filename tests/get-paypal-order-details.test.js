const { PayPalEnvironment, Order } = require("../dist");

PayPalEnvironment.init("AT3ftGisLykS3-fzXAPXuT6QKBbOS8HLPuv9Xo6GVEGMGnNSrjORUcAhou1sfrF-_189ISIRyO7pWQok", "EE7JVUNBFA0rS5iqyNxHlIzJ07wpunxF7uYGr4WjChaWC2mWkyi3kjdLxLBVz43OB-sjWQdgdmVK--CD");
const order = new Order();
order.get("1T430027KR8912825")
    .then(response => {
        console.log(JSON.stringify(response))
    });