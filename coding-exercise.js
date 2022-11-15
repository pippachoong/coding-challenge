const items = {
    "101": { name: 'classic', price: 269.99 },
    "102": { name: 'standout', price: 322.99 },
    "103": { name: 'premium', price: 394.99 }
}

const customer = {
    "001": { name: 'default', deal: [] },
    "002": { name: 'SecondBite', deal: ["A"] },
    "003": { name: 'Axil Coffee Roasters', deal: ["B"] },
    "004": { name: 'MYER', deal: ["C", "D"] }
}

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


class Checkout {
    constructor(customerId) {
        this.cart = {}
        this.customer = customer[customerId]  // { name: 'SecondBite', deal: ["A"]},
        this.deal = {}

        let customersDeals = customer[customerId].deal // ["A"] 
        customersDeals.forEach(deal => {
            const itemId = deals[deal].itemId // which item has deal
            this.deal[itemId] = deals[deal]  // add item with deal into object
        })
        // console.log('checkdeal', this.deal)
    }

    addToCart(itemId, quantity) {

        if (this.cart[itemId]) {
            this.cart[itemId].quantity += quantity

        } else {
            this.cart[itemId] = { quantity }
        }
        console.log(this.cart)
        return this.cart // to check the overall cart

    }

    totalPrice() {

        let itemsInCart = Object.keys(this.cart)
        // ["101", "103"]

        // deals to be executed here 
        let arrayOfitems = itemsInCart.map(itemId => {
            if (this.deal.hasOwnProperty(itemId)) {
                let numberOfBundles = Math.round(this.cart[itemId].quantity / this.deal[itemId].quantity)
                let remainderofItems = this.cart[itemId].quantity % this.deal[itemId].quantity

                return this.deal[itemId].offer * numberOfBundles + (remainderofItems * items[itemId].price)
            } else {
                return items[itemId].price * this.cart[itemId].quantity
            }

        })
        console.log('arrayOfItems', arrayOfitems)

        let totalPrice = arrayOfitems.reduce((a, b) => a + b) // to get sum of items in an array
        let roundedOffTotalPrice = Math.round(totalPrice * 100) / 100 // to get 2 decimal places


        return roundedOffTotalPrice
    }

}

// console.log(items["101"]["price"] * 2)
// console.log(items["101"]["price"] * 4)

const def = new Checkout('001')
def.addToCart("101", 1)
def.addToCart("102", 1)
def.addToCart("103", 1)
console.log('default customer', def.totalPrice())

const secondBite = new Checkout('002')
secondBite.addToCart("101", 2)
secondBite.addToCart("101", 1)
secondBite.addToCart("103", 1)
console.log('SecondBite', secondBite.totalPrice())

const axil = new Checkout('003')
axil.addToCart("102", 3)
axil.addToCart("103", 1)
console.log('Axil Coffee Roasters', axil.totalPrice())

const myer = new Checkout('004')
myer.addToCart("102", 5)
myer.addToCart("103", 1)
console.log('myer', myer.totalPrice())



