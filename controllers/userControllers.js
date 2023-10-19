import Users from "../models/userModels.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../helpers/index.js";

export const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password, dob, interest } =
      req.body;

    const existUserName = await Users.findOne({ userName });
    if (existUserName) {
      throw new Error("Username Already Taken");
    }

    const existEmail = await Users.findOne({ email });
    if (existEmail) {
      throw new Error("Email Already Registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      slug: uuidv4(),
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      dob,
      interest,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      data: { userName: newUser.userName },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const user = await Users.findOne({ userName });
    if (!user) {
      throw new Error("Username or Password Wrong!");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new Error("Username or Password Wrong!");
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 24,
    });

    res.status(200).json({
      message: "Login successfully",
      data: {
        token: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({
      message: "Get Profile Successfully",
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);

    await user.updateOne({ resetPasswordLink: token });

    const templateEmail = {
      from: "GROWMATCH",
      to: email,
      subject: "Link Reset Password",
      html: `<p>Silahkan klik dibawah ini untuk mereset password anda.</p> <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
    };

    sendEmail(templateEmail);

    res.status(200).json({
      message: "Link reset Password berhasil terkirim",
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  const cookies = req.cookies.jwt;
  if (!cookies) {
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie Cleared" });
};
