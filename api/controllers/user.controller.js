import User from "../models/User.model.js";

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (e) {
    res.status(500).send(e.message);
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { __v: 0, password: 0 });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { __v: 0, password: 0 });

    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};
export const checkAuthentication = async (req, res, next) => {
  try {
    res.status(200).json("hello user you are logged in");
  } catch (e) {
    next(e);
  }
};
export const checkUser = async (req, res, next) => {
  try {
    res.status(200).json("hello user you are logged in");
  } catch (e) {
    next(e);
  }
};
export const checkAdmin = async (req, res, next) => {
  try {
    res.status(200).json("hello Admin");
  } catch (e) {
    next(e);
  }
};
