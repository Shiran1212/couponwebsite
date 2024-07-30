import { couponModel } from "../db/moduls/coupons.js";
import express from "express";

const router = express.Router();

router.put("/api/updateCoupon", async (req, res) => {
  const { name, description, discount, category, code, expired, imageSrc } =
    req.body;

  const coupon = await couponModel.findOne({ name });

  if (!coupon) {
    return res.send("Item not found!!!!!!");
  }
  coupon.name = name;
  
  coupon.description = description;
  coupon.discount = discount;
  coupon.category = category;
  coupon.code = code;
  coupon.expired = expired;
  coupon.imageSrc = imageSrc;
  await coupon.save();
  res.send(coupon);
});
export { router as updateRouter };
