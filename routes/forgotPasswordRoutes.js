import express from "express";
import { forgotPassword } from "../controllers/userControllers.js";
import { resetPassword } from "../controllers/forgotPasswordController.js";

const router = express.Router();

router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
export default router;
