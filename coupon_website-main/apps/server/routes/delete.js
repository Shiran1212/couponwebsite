import { userModel } from "../db/moduls/user.js";
import { couponModel } from "../db/moduls/coupons.js";
import express from "express";

const router = express.Router();

router.delete("/api/deleteCoupon", async (req, res) => {
  const { name } = req.body;
  const isExist = await couponModel.deleteOne({ name });

  if (!isExist) {
    return res.send("Item doesnt exists!");
  }

  res.send(isExist);
});

router.delete("/api/deleteUser", async (req, res) => {
  const { email } = req.body;
  // Inside the deleteUser route
  const isExist = await userModel.deleteOne({ email });

  if (!isExist) {
    return res.send("User doesnt exists!!!!!!");
  }

  res.send(isExist);
});

export { router as deleteRouter };
