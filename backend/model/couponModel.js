const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: [true, "Please add coupon name"],
      minlength: [6, "Coupon must be up to 6 characters"],
      maxlength: [12, "Coupon must not be more than 12 characters"],
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      requred: true,
    },
  },
  { timestamps: true }
);

// Virtual field to check if coupon is active
// couponSchema.virtual('isActive').get(function () {
//   return new Date() < this.expiresAt;
// });

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
