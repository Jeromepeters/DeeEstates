import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  console.log("im in verify token");
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "forbidden"));
    }
    req.user = user;
    next();
  });
};
