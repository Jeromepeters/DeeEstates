import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signup", (req, res) => {
  res.send("hey");
});
export default router;