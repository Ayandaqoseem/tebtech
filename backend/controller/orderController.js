const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const { calculateTotalPrice, updateProductQuantity } = require("../utils");
const Product = require("../model/productModel");
const dotenv = require("dotenv");
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const axios = require("axios");
const User = require("../model/userModel");
const Transaction = require("../model/transactionModel");
const { orderSuccessEmail } = require("../emailTemplates/orderTemplate");
const sendEmail = require("../utils/sendEmail");

dotenv.config();

// Create new order
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  } = req.body;

  //   Validation
  if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
    res.status(400);
    throw new Error("Order data missing!!!");
  }

  // Create Order
  await Order.create({
    user: req.user.id,
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  });

  // Update product Quantity
  await updateProductQuantity(cartItems);

  // Send Order Email to the user
  const subject = "tebtechnologyltd Order Placed";
  const send_to = req.user.email;
  const template = orderSuccessEmail(req.user.name, cartItems);
  const reply_to = "no-repy@tebtechnology-ltd@gmail.com";

  await sendEmail(subject, send_to, template, reply_to);

  res.status(201).json({ message: "Order Created" });
});

// Get all Orders
const getOrders = asyncHandler(async (req, res) => {
  let orders;

  if (req.user.role === "admin") {
    orders = await Order.find().sort("-createdAt");

    return res.status(200).json(orders);
  }
  orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json(orders);
});

// Get single Order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (req.user.role === "admin") {
    return res.status(200).json(order);
  }
  // Match Order to its user
  if (order.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(order);
});

// Update Product
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const { id } = req.params;

  const order = await Order.findById(id);

  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Update Product
  await Order.findByIdAndUpdate(
    { _id: id },
    {
      orderStatus: orderStatus,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ message: "Order status updated" });
});

// Pay with stripe
// const payWithStripe = asyncHandler(async (req, res) => {
//   const { items, shipping, description, coupon } = req.body;
//   const products = await Product.find();

//   let orderAmount;
//   orderAmount = calculateTotalPrice(products, items);
//   if (coupon !== null && coupon?.name !== "nil") {
//     let totalAfterDiscount =
//       orderAmount - (orderAmount * coupon.discount) / 100;
//     orderAmount = totalAfterDiscount;
//   }

// Create a PaymentIntent with the order amount and currency
// const paymentIntent = await stripe.paymentIntents.create({
// amount: orderAmount,
// currency: "usd",
// automatic_payment_methods: {
//   enabled: true,
// },
// description,
// shipping: {
//   address: {
//     line1: shipping.line1,
//     line2: shipping.line2,
//     city: shipping.city,
//     country: shipping.country,
//     postal_code: shipping.postal_code,
//   },
//   name: shipping.name,
//   phone: shipping.phone,
// },
// receipt_email: customerEmail
// });

// console.log(paymentIntent);

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// Pay With Flutterwave // NOT WORKING
const payWithFlutterwave = async (req, res) => {
  try {
    const { cartItems, userID, coupon } = req.body;

    const products = await Product.find();
    const user = await User.findById(userID);

    let orderAmount = calculateTotalPrice(products, cartItems);

    if (coupon !== null && coupon?.name !== "nil") {
      let totalAfterDiscount =
        orderAmount - (orderAmount * coupon.discount) / 100;
      orderAmount = totalAfterDiscount;
    }

    // Function to create a payment link
    const createPaymentLink = async () => {
      const response = await axios.post(
        `${process.env.FLW_URL}/payments`,
        {
          tx_ref: `${process.env.TX_REF}_${Date.now()}`,
          amount: orderAmount,
          currency: "NGN",
          redirect_url: `${process.env.BACKEND_URL}/api/order/response`,
          customer: {
            email: user?.email,
            name: user?.name,
            phonenumber: user?.phone,
          },
          customizations: {
            title: "Tebtechnologyltd online store",
            description: "Payment for products",
            logo: "https://i.ibb.co/txYS250/tebtech-logo-1.png",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data.link;
    };

    // Attempt to create the payment link
    const paymentLink = await createPaymentLink();

    res.status(200).json({ paymentLink });
  } catch (err) {
    console.error(err.code);
    console.error(err.response.data);
  }
};

// Verify FLW Payment
const verifyFlwPayment = async (req, res) => {
  const { status, tx_ref } = req.query;

  const successURL =
    process.env.FRONTEND_URL +
    `/checkout-flutterwave?payment=successful&ref=${tx_ref}`;
  const failureURL =
    process.env.FRONTEND_URL + `/checkout-flutterwave?payment=failed`;
  const cancelURL =
    process.env.FRONTEND_URL + `/checkout-flutterwave?payment=cancelled`;

  try {
    if (status === "successful") {
      res.redirect(successURL);
    } else {
      res.redirect(failureURL);
    }
  } catch (err) {
    console.error("Error handling payment callback:", err);
    res.status(500).send("Internal Server Error");
  }
};

// pAYWith Wallet
// Pay with Wallet
const payWithWallet = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { items, cartItems, shippingAddress, coupon } = req.body;
  // console.log(coupon);
  const products = await Product.find();
  const today = new Date();

  let orderAmount;
  orderAmount = calculateTotalPrice(products, items);
  if (coupon !== null && coupon?.name !== "nil") {
    let totalAfterDiscount =
      orderAmount - (orderAmount * coupon.discount) / 100;
    orderAmount = totalAfterDiscount;
  }
  // console.log(orderAmount);
  // console.log(user.balance);

  if (user.balance < orderAmount) {
    res.status(400);
    throw new Error("Insufficient balance");
  }

  const newTransaction = await Transaction.create({
    amount: orderAmount,
    sender: user.email,
    receiver: "Shopito store",
    description: "Payment for products.",
    status: "success",
  });

  // decrease the sender's balance
  const newBalance = await User.findOneAndUpdate(
    { email: user.email },
    {
      $inc: { balance: -orderAmount },
    }
  );

  const newOrder = await Order.create({
    user: user._id,
    orderDate: today.toDateString(),
    orderTime: today.toLocaleTimeString(),
    orderAmount,
    orderStatus: "Order Placed...",
    cartItems,
    shippingAddress,
    paymentMethod: "Shopito Wallet",
    coupon,
  });

  // Update Product quantity
  const updatedProduct = await updateProductQuantity(cartItems);
  // console.log("updated product", updatedProduct);

  // Send Order Email to the user
  const subject = "Shopito Order Placed";
  const send_to = user.email;
  // const send_to = "zinotrust@gmail.com";
  const template = orderSuccessEmail(user.name, cartItems);
  const reply_to = "donaldzee.ng@gmail.com";
  // const cc = "donaldzee.ng@gmail.com";

  await sendEmail(subject, send_to, template, reply_to);

  if (newTransaction && newBalance && newOrder) {
    return res.status(200).json({
      message: "Payment successful",
      url: `${process.env.FRONTEND_URL}/checkout-success`,
    });
  }
  res
    .status(400)
    .json({ message: "Something went wrong, please contact admin" });
});

// const updateProductQuantity = async (cartItems) => {

//   let bulkOption = cartItems.map((product) => {
//     return {
//       updateOne: {
//         filter: { _id: product._id },
//         update: {
//           $inc: {
//             quantity: -product.cartQuantity,
//             sold: +product.cartQuantity,
//           },
//         },
//       },
//     };
//   });
//   let updatedProduct = await Product.bulkWrite(bulkOption, {});
// };

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  // payWithStripe,
  verifyFlwPayment,
  payWithFlutterwave,
  payWithWallet,
};
