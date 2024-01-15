import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import cors from "cors";
import UserModel from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

export const signup = async (req, res, next) => {
  console.log("posted");
  console.log(req.body);
  let { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = new user({
    username,
    email,
    password: hashPassword,
  });
  console.log(newUser);
  newUser
    .save()
    .then(() => {
      res.json({
        success: true,
        message: "user created",
      });
    })
    .catch((error) => {
      next(error);
    });
};
export const signin = async (req, res, next) => {
  console.log("posted in sign in");
  console.log(req.body);
  let { email, password } = req.body;
  try {
    const validUser = await UserModel.findOne({ email });
    console.log(validUser);
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    } else {
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(401, "invalid credential"));
      } else {
        console.log("user found");
        console.log(validUser._doc);
        const token = await jwt.sign(
          { id: validUser._id },
          process.env.JWT_SECRET
        );
        const { password: pass, ...rest } = validUser._doc;
        console.log(rest);
        console.log(token);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(rest);
      }
    }
  } catch (error) {}
};

export const google = async (req, res, next) => {
  console.log("Posted in google");
  console.log("Posted in googleemail", req.body.email);
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log("user from mon and google", user);
    if (user) {
      console.log("user exist", user);
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      console.log(rest);
      console.log(token);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    } else {
      console.log("for no user and about to create user");
      // let { name, email, photo } = req.body;
      const genPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      console.log("generated password: ", genPassword);
      const hashPassword = bcrypt.hashSync(genPassword, 10);
      console.log("hashed password", hashPassword);
      const username =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-8);
      console.log("Username", username);
      const newUser = new UserModel({
        username,

        email: req.body.email,
        avater: req.body.photo,
        password: hashPassword,
      });
      console.log("user from google: ", newUser);
      newUser.save().then(() => {
        console.log("google saved to mongodb");
      });

      const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      console.log(rest);
      console.log(token);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
