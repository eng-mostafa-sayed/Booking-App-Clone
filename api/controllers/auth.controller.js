import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../helper/error.helper.js";
export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSaltSync(await Number(process.env.SALT_KEY));
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send("user has been registered");
  } catch (e) {
    next(e);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
    });
    if (!user) return next(createError(404, "user not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(404, "incorrect password"));
    const token = JWT.sign(
      { id: user._id, isAdmin: user.isAdmin },
      await process.env.JWT_SECRET_KEY
    );
    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (e) {
    next(e);
  }
};
