import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
//**Import File */
import dbConn from "./config/dbConn.js";
import { ErrorHandler } from "./middleware/errorHandler.js";
import usersRoutes from "./routes/userRoutes.js";
import forgotPasswordRoutes from "./routes/forgotPasswordRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
dbConn();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // <-- middleware morgan
}

//**Middleware */
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000", // for development
  "https://grow-match-v2.vercel.app", // for production
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: ${origin} is not allowed by Access-Control-Allow-Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

//**All Routes */
app.use("/api/v1/auth/", usersRoutes);
app.use("/api/v1/", forgotPasswordRoutes);
app.use("/", (req, res) => {
  res.send("HI GROWMATCH");
});

//**Handle Error Middleware */
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
