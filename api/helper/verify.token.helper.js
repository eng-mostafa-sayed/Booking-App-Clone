import JWT from "jsonwebtoken";
import { createError } from "./error.helper.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "not authenticated"));
  JWT.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(createError(401, "token is not valid"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin || req.user.id === req.params.id) {
      next();
    } else return next(createError(401, "you are not admin or not authorized"));
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else return next(createError(401, "you are not admin"));
  });
};
