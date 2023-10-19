import express from "express";
import {
  registerUser,
  loginUser,
  getProfileUser,
  logoutUser,
} from "../controllers/userControllers.js";
import {
  validateLogin,
  validateRegister,
} from "../validation/userValidation.js";
import { validationMiddleware } from "../middleware/validation.js";
import { authGuard } from "../middleware/authGuard.js";

const router = express.Router();

router.post("/register", validateRegister, validationMiddleware, registerUser);
router.post("/login", validateLogin, validationMiddleware, loginUser);
router.get("/profile", authGuard, getProfileUser);
router.delete("/logout", logoutUser);

export default router;
