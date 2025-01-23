const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const sendEmail = require("../middleware/sendEmail");
const createToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TIME,
  });
};
const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return next(
        new ApiError(`Error: please enter username , email , password`, 500)
      );
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return next(new ApiError(`Error: user already exist`, 500));
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    const token = createToken(newUser._id);
    return res.status(201).json({
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return next(new ApiError(`Error: ${err.message}`, 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(
        new ApiError(`Error: email , password validation error`, 400)
      );
    }
    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      return next(
        new ApiError(`Error: email , password validation error`, 400)
      );
    }

    const token = createToken(user._id);
    return res.status(200).json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      token,
    });
  } catch (err) {
    console.log("login", err.message);
    return next(new ApiError(`Error: ${err.message}`, 500));
  }
};
const googleAuth = async (req, res, next) => {
  try {
    // console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const match = await bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        return next(
          new ApiError(`Error: email , password validation error`, 500)
        );
      }

      const token = createToken(user._id);
      return res.status(200).json({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        token,
      });
    }
    if (!user) {
      user = await new User({
        name: req.body.name,
        image: req.body.image,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
    }
    const token = createToken(user._id);
    return res.status(201).json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      token,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return next(new ApiError(`Error: ${err.message}`, 500));
  }
};
const facebookAuth = async (req, res, next) => {
  try {
    // console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const match = await bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        return next(
          new ApiError(`Error: email , password validation error`, 400)
        );
      }

      const token = createToken(user._id);
      return res.status(200).json({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        token,
      });
    }
    if (!user) {
      user = await new User({
        name: req.body.name,
        image: req.body.image,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
    }
    const token = createToken(user._id);
    return res.status(201).json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      token,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return next(new ApiError(`Error: ${err.message}`, 500));
  }
};

const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (email == "") {
      return next(new ApiError(`Error: please enter valid email`, 400));
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new ApiError(`Error: user not found`, 400));
    }
    const message = `
      <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 10px;
            font-weight:bold;
            font-family: Arial, sans-serif;
          }
          .button {
            background-color: #333;
            border: none;
            color: white;
            padding: 10px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 4px;
          }
          .note {
            color: #666;
            font-size: 14px;
            margin-top: 20px;
          }
          a{
            color: white;
            text-decoration: none;

            }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Password Reset Request</h2>
          <p>Hello, ${user?.name}</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <p>
            <a href="${
              req.protocol +
              "://" +
              req.get("host") +
              "/reset-password/" +
              user._id
            }" class="button">Reset Password</a>
          </p>
          <p>Or copy and paste this link in your browser:</p>
          <p>${"http://localhost:5173" + "/reset-password/" + user._id}</p>
          <p class="note">This link will expire in 1 hour for security reasons.</p>
          <p class="note">If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          <br>
          <p>Best regards,<br>Your App Team</p>
        </div>
      </body>
    </html>
    
    `;
    if (user) {
      await sendEmail({
        email: email,
        subject: "Zoom Metting app",
        message: message,
      });
    }
    return res.status(200).json({
      message: `Email sent to ${email}`,
    });
  } catch (err) {
    console.log(err);
    return next(new ApiError(`Error: ${err.message}`, 500));
  }
};
const resetPassword = async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.params;
  try {
    if (password.length < 6) {
      return next(
        new ApiError(`Error: please enter min 6 characters password`, 400)
      );
    }
    const user = await User.findById({ _id: id });
    if (!user) {
      return next(new ApiError(`Error: user not found`, 404));
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(
      { _id: id },
      {
        password: hashPassword,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: `Password Reset success`,
    });
  } catch (err) {
    console.log(err);
    return next(new ApiError(`Error: ${err.message}`, 500));
  }
};
module.exports = {
  register,
  login,
  googleAuth,
  facebookAuth,
  forgetPassword,
  resetPassword,
};
