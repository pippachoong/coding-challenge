const items = require("./items")
const customer = require("./customer")
const deals = require("./deals")

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
        // console.log(this.cart)
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
        // console.log('arrayOfItems', arrayOfitems)

        let totalPrice = arrayOfitems.reduce((a, b) => a + b) // to get sum of items in an array
        let roundedOffTotalPrice = Math.round(totalPrice * 100) / 100 // to get 2 decimal places


        return roundedOffTotalPrice
    }

}

module.exports = Checkout