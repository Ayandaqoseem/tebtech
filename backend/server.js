const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes")
const errorHandler = require("./middleware/errorMiddleware")

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoute)

app.get("/", (req, res) => {
  res.json({
    data: "Tebtech server is running",
  });
});


// errorMiddleware
app.use(errorHandler)
const port = process.env.PORT || 8673;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Node server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
