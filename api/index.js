import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import test from "./routes/user.route.js";
import auth from "./routes/auth.route.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });
app.use("/api/auth", auth);
app.use("/api/user", test);

app.listen(3000, () => {
  console.log("Listening to PORT: 3000");
});

// app.use(express.json());
