import Users from "../models/userModels.js";
import jwt from "jsonwebtoken";

export const authGuard = async (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization;

  if (header && header.startsWith("Bearer ")) {
    try {
      const token = header.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = await Users.findById(_id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not Authorized, Token Failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not Authorized, No Token");
    error.statusCode = 401;
    next(error);
  }
};
