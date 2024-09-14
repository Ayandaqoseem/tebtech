const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const Token = require("../model/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const GoogleUser = require("../model/googleModel");
const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { validateEmail } = require("../utils/authUtils");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cPassword } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }
  if (password !== cPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  if(!validateEmail(email)) {
    return res.status(400).json("Kindly provide valid email")
  }

  // Check if user exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate token
  const token = generateToken(user._id);

  if (user) {
    const { _id, name, email, role } = user;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7000 * 86400),
      // secure: true,
      // sameSite: "none"
    });
    res.status(201).json({
      _id,
      name,
      email,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  if(!validateEmail(email)) {
    return res.status(400).json("Kindly provide valid email")
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  // Check if user has a password set
  if (!user.password) {
    res.status(400);
    throw new Error(
      "User registered via Google. Please set a password to login with email and password."
    );
  }

  // Check password
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Generate token
  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    const newUser = await User.findOne({ email }).select("-password");
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7000 * 86400),
      // secure: true,
      // sameSite: "none",
    });
    res.status(200).json(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    // sameSite: "none",
    // secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

// Get user data
const getUser = asyncHandler(async (req, res) => {
  const user =
    (await User.findById(req.user._id).select("-password")) ||
    (await GoogleUser.findById(req.user._id).select("-password"));

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Get user login status
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

// Update user information
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Update user photo
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;

  let user;

  if (req.user.googleId) {
    user = await User.findById(req.user._id);
  } else {
    user = await User.findById(req.user._id);
  }

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  user.photo = photo;
  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    photo: updatedUser.photo,
    address: updatedUser.address,
    role: updatedUser.role,
  });
});

// Change user password
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (!oldPassword) {
    res.status(400);
    throw new Error("Please add old password");
  }
  if (!password) {
    res.status(400);
    throw new Error("Please add new password");
  }

  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  if (passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).json("Password changed successfully");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await new Token({
    userId: user._id,
    token: hashedToken,
    expiresAt: Date.now() + 3600000,
  }).save();

  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const template = {
    body: {
      name: user.name,
      intro:
        "Someone has requested a new password for the following account on tebtechnologyltd:",
      action: {
        instructions:
          "If you did not request this, please ignore this email. Otherwise, click the link below to reset your password:",
        button: {
          color: "#22BC66",
          text: "Reset your password",
          link: resetUrl,
        },
      },
      outro: "If you need further assistance, please contact our support team.",
    },
  };

  const subject = "Password Reset Request";
  const send_to = user.email;
  const send_from = `"no-reply" <${process.env.EMAIL_USER}>`;

  try {
    await sendEmail(subject, send_to, template, send_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, userData } = req.body;
  const password = userData;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res
      .status(400)
      .json({ message: "Session expired, please try again" });
  }

  const user = await User.findOne({ _id: userToken.userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.password = password;
  await user.save();
  await userToken.deleteOne();

  res.status(200).json({
    message: "Password reset successfully, please login",
    success: true,
  });
});

// Handle Google user integration
const handleGoogleUser = asyncHandler(async (profile, done) => {
  try {
    let googleUser = await GoogleUser.findOne({ googleId: profile.id });

    if (!googleUser) {
      googleUser = await GoogleUser.create({
        googleId: profile.id,
        name: profile._json.name,
        email: profile._json.email,
      });
    }
    await googleUser.save();

    done(null, googleUser);
  } catch (error) {
    done(error);
  }
});

// Save Cart
const saveCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  user.cartItems = cartItems;
  user.save();
  res.status(200).json({ message: "Cart saved" });
});

// Get Cart
const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // const { _id, name, email, phone, address } = user;
    res.status(200).json(user.cartItems);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Clear Cart
const clearCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.cartItems = [];
    user.save();
    res.status(200).json({ message: "Cart cleared" });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// add to wishlist
const addToWishlist = expressAsyncHandler(async (req, res) => {
  const { productId } = req.body;

  await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  );
  res.json({ message: "Product added to wishlist" });
});

// get wishlist
const getWishlist = expressAsyncHandler(async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist");

  res.json(list);
});

// get wishlist
const removeFromWishlist = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  );
  res.json({ message: "Product remove from wishlist" });
});


// Service review
const reviewService = asyncHandler(async(req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params

  // Validation 
  if(star < 1) {
    re.status(400)
    throw new Error("Please add star  and review")
  }

  const user = await User.findById(id)

  if(!user) {
    res.status(404)
    throw new Error("User not found")
  }

  // Update review
  user.serviceReview.push({
    star,
    review,
    reviewDate,
    name: req.user.name,
    photo: req.user.photo,
    userID: req.user._id,
  })

  user.save();

  res.status(200).json({ message: "Service review added"})
})

// delete review service
const deleteReviewService = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  // Find the user by their ID
  const user = await User.findById(userID);

  // Check if the user exists
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check if serviceReview exists and is an array
  if (!user.serviceReview || !Array.isArray(user.serviceReview)) {
    res.status(400);
    throw new Error("Service reviews not found or invalid");
  }

  // Filter out the service review, ensuring userID exists
  const newServiceReview = user.serviceReview.filter((review) => {
    return review.userID && review.userID.toString() !== userID.toString();
  });

 
  user.serviceReview = newServiceReview;
  await user.save();  

 
  res.status(200).json({ message: "Service review deleted" });
});


// update review service
const updateReviewService = asyncHandler(async(req, res) => {

  const { star, review, reviewDate, userID } = req.body;
  
    
  const user = await User.findById(userID)

  if(!user) {
    res.status(400)
    throw new Error("User not found")
  }

 

 // Check if the serviceReview array exists and is valid
 if (!user.serviceReview || !Array.isArray(user.serviceReview)) {
  res.status(400);
  throw new Error("Service reviews not found or invalid");
}

// Find the specific service review by userID
const servReview = user.serviceReview.find(review => review.userID && review.userID.toString() === userID.toString());

// Check if the review exists
if (!servReview) {
  res.status(400);
  throw new Error("Service review not found for this user");
}

 // Convert userID to ObjectId
 const userObjectId = new mongoose.Types.ObjectId(`${userID}`);

  const updatedReview = await User.findOneAndUpdate(
    {
      "serviceReview.userID": userObjectId,
    },
    {
      $set: {
        "serviceReview.$.star": Number(star),
        "serviceReview.$.review": review,
        "serviceReview.$.reviewDate": reviewDate,
      },
    },
    { new: true }
  )

  if (!updatedReview) {
    return res.status(404).json({ message: "review not found during update." });
  }

  res.status(200).json({ message: "Review updated successfully." });
  
  
})

const allReviews = async(req, res) => {
  try {
    const users = await User.find({ "serviceReview.0": { $exists: true } }, 'serviceReview');

    if(!users) {
      return res.json("reviews not found")
    }
    const reviews = users.flatMap(user => user.serviceReview); 
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
  changePassword,
  forgotPassword,
  resetPassword,
  handleGoogleUser,
  saveCart,
  getCart,
  clearCart,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  reviewService,
  deleteReviewService,
  updateReviewService, 
  allReviews,
};
