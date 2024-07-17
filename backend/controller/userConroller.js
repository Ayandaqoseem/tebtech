const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const Token = require("../model/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cPassword } = req.body;

  //   Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be up to 8 characters in length");
  }
  if (password !== cPassword) {
    res.status(400);
    throw new Error("Password do not match");
  }

  // Check if user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  //  Create
  const user = await User.create({
    name,
    email,
    password,
  });

  //   Generate Token
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
    // Send user data
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  //   check if user exist
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  // User exist, check if password is correct
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

// Logout
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

// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Get User Login Status
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

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name, phone, address } = user;
  if (user) {
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updateUser = await user.save();
    res.status(200).json(updateUser);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Update user photo
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  user.photo = photo;
  const updateUser = await user.save();
  res.status(200).json({
    _id: updateUser._id,
    name: updateUser.name,
    email: updateUser.email,
    phone: updateUser.phone,
    photo: updateUser.photo,
    address: updateUser.address,
  });
});

// Change password
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
  const passwordIsCorrect = await bcrypt.compare(oldPassword, password);

  if (user || passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).json("Password changed successfully");
  } else {
    res.status(400);
    throw new Error("Old password is not correct");
  }
});

// Forgot Password
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

  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await new Token({
    userId: user._id,
    token: hashedToken,
    // createdAt: Date.now(),
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
          color: "#22BC66", // Optional action button color
          text: "Reset your password",
          link: resetUrl,
        },
      },
      outro: "If you need further assistance, please contact our support team.",
    },
  };

  // const template_1 = `
  //     <h3>Hello ${user.name}</h3>
  //     <p>
  //     Someone has requested a new password for the following account on tebtechnologyltd:</p>
  //     <p>name: ${user.name}</p>
  //     <p>If you didn't make this request, just ignore this email. If you'd like to proceed:</p>;
  //     <a href=${resetUrl} clicktracking=off>Click here to reset your password</a>
  //     <p>Regards...</p>
  //   `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const send_from = `"no-reply" <${process.env.EMAIL_USER}>`;

  try {
    await sendEmail(subject, send_to, template, send_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, Please try again");
  }
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { userData } = req.body;
  const password = userData;
  
  const { resetToken } = req.body;

  // Hash token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find Token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if(!userToken){
    return res.status(400).json({message:"Try again session expired"})
}
  // Find User
  const user = await User.findOne({
    _id: userToken.userId,
  });

if (!user) {
  return res.status(404).json({ message: "User not found" });
}


  user.password = password;
  
  await user.save();

  await userToken.deleteOne();


  res.status(200).json({
    message: "Password Reset Successfully, Please Login",
    success: true,
  });
  // const passwordIsCorrect = await bcrypt.compare(confirmPassword, password);
  //   if(user && passwordIsCorrect) {
  //     user.password = password;
  //     await user.save();
  //     res.status(200).json({
  //       message: "Password Reset Successfully, Please Login"
  //     })
  //   } else {
  //     throw new Error("password has expired");
  //   }
});

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
};
