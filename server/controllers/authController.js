import catchAsync from "../errors/catchAsync.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import AppError from "../errors/AppError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const day = 24 * 60 * 60 * 1000; //One day ins milliseconds
  const expires = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * day);
  const oneDayToSeconds = 24 * 60 * 60;
  res.cookie("jwt", token, {
    maxAge: oneDayToSeconds,
    httpOnly: true,
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

export const protectedRoute = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Email or password were not specified", 400));

  //Find user by email
  const user = await User.findOne({ email }).select("+password");

  //Validate user credentials
  if (!user || !(await user.validatePassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, req, res);
});

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });

  createSendToken(newUser, 201, req, res);
});

// export const logout = (req, res) => {
//   res.cookie("jwt", 'loggedout', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({ status: "success" });
// };

export const isLoggedIn = catchAsync(async (req, res, next) => {
  let currentUser;
  let status = 'success';
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentUser = await User.findById(decoded._id);
  } else {
    currentUser = null;
    status = 'fail';
  }
  res.status(200).send({ status, user: currentUser });
});
