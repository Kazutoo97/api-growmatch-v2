import { body } from "express-validator";

export const validateRegister = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("userName")
    .isLength({ min: 6, max: 12 })
    .withMessage("Username must be between 6 to 12 character long")
    .matches(/[A-Z]/)
    .withMessage("Username must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Username must contain at least one number")
    .matches(/[@#$%]/)
    .withMessage(
      "Username must contain at least one of the special characters: @, #, $, %"
    ),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .withMessage("Only @gmail.com domain is allowed"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@#$%]/)
    .withMessage(
      "Password must contain at least one of the special character: @, #, $, %"
    ),
  body("dob")
    .isDate()
    .withMessage("Invalid date format for Date of Birth (YYYY-MM-DD)"),
];

export const validateLogin = [
  body("userName")
    .isLength({ min: 6, max: 12 })
    .withMessage("Username must be between 6 to 12 character long")
    .matches(/[A-Z]/)
    .withMessage("Username must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Username must contain at least one number")
    .matches(/[@#$%]/)
    .withMessage(
      "Username must contain at least one of the special characters: @, #, $, %"
    ),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@#$%]/)
    .withMessage(
      "Password must contain at least one of the special character: @, #, $, %"
    ),
];
