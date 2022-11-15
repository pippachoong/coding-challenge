const items = require("./items")

// pricing rules are flexible hence it can be added or altered easily in object 
const deals = {

    "A": {
        name: "3 for 2 Classic Ads",
        itemId: "101",
        quantity: 3,
        offer: items["101"]["price"] * 2

    },

    "B": {
        name: "Stand Out Ads",
        itemId: "102",
        quantity: 1,
        offer: 299.99
    },

    "C": {
        name: "5 for 4 Standout Ads",
        itemId: "102",
        quantity: 5,
        offer: items["102"]["price"] * 4
    },

    "D": {
        name: "Premium Ads",
        itemId: "103",
        quantity: 1,
        offer: 389.99
    },

}

module.exports = deals