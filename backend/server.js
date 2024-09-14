const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const blogRoute = require("./routes/blogRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const couponRoute = require("./routes/couponRoute");
const orderRoute = require("./routes/orderRoute");
const newsletterRoute = require("./routes/newsletterRoute");
const transactionRoute = require("./routes/transactionRoute");
const errorHandler = require("./middleware/errorMiddleware");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

dotenv.config();
require("./passportConfig"); 


const app = express();





// Middleware
app.use(express.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);





// Initialize session management with express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 24 * 60 * 60, 
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());




// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/order", orderRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/newsletter", newsletterRoute)

app.get("/", (req, res) => {
  res.json({
    data: "Tebtech server is running",
  });
});

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 8673;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Node server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
