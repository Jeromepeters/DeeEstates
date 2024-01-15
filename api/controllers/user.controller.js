import UserModel from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcrypt";
export const test = (req, res) => {
  res.json({
    message: "this is the user route",
  });
};

export const updateUser = async (req, res, next) => {
  console.log(req.body);
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "forbidden"));
  }
  try {
    if (req.body.password) {
      req.bod.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avater: req.body.avater,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};
