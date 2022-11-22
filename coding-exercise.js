const Checkout = require("./src/checkout")


// Testing Checkout
const def = new Checkout('001')
def.addToCart("101", 1)
def.addToCart("102", 1)
def.addToCart("103", 1)
console.log('default customer', def.totalPrice() === 987.97)

const secondBite = new Checkout('002')
secondBite.addToCart("101", 1)
secondBite.addToCart("101", 1)
secondBite.addToCart("101", 1)
secondBite.addToCart("103", 1)
console.log('SecondBite', secondBite.totalPrice() === 934.97)

const axil = new Checkout('003')
axil.addToCart("102", 1)
axil.addToCart("102", 1)
axil.addToCart("102", 1)
axil.addToCart("103", 1)
console.log('Axil Coffee Roasters', axil.totalPrice() === 1294.96)

const myer = new Checkout('004')
myer.addToCart("102", 5)
myer.addToCart("103", 1)
console.log('myer', myer.totalPrice() === 1681.95)

const jora = new Checkout('005')
jora.addToCart("103", 5)
// console.log('jora price', jora.totalPrice());
console.log('jora', jora.totalPrice() === 1899.95)


const myerExtension = new Checkout('004')
myerExtension.addToCart("101", 4)
console.log('myer', myerExtension.totalPrice() === 999.96)

