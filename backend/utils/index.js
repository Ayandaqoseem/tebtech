// const Stripe = require("stripe");

const Product = require("../model/productModel");

// Instantiate stripe
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Calculate Total Price
function calculateTotalPrice(products, cartItems) {
  let totalPrice = 0;

  cartItems.forEach(function (cartItem) {
    const product = products.find(function (product) {
      return product._id?.toString() === cartItem._id;
    });

    if (product) {
      const quantity = cartItem.cartQuantity;
      const price = parseFloat(product.price);
      totalPrice += quantity * price;
    }
  });

  return totalPrice;
}

// calculate discount
function applyDiscount(cartTotalAmount, discountPercentage) {
  var discountAmount = (discountPercentage / 100) * cartTotalAmount;
  var updatedTotal = cartTotalAmount - discountAmount;
  return updatedTotal;
}

// Update Cart Quantity
const updateProductQuantity = async (cartItems) => {
  let bulkOption = cartItems.map((product) => {
    return {
      updateOne: {
        filter: {_id: product._id},
        update: {
          $inc: {
            quantity: -product.cartQuantity,
            sold: +product.cartQuantity,
          }
        }
      }
    }
  })
  await Product.bulkWrite(bulkOption, {})
}

module.exports = {
  // stripe,
  calculateTotalPrice,
  applyDiscount,
  updateProductQuantity,
};
