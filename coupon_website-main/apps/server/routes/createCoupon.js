import express from "express";
import { couponModel } from "../db/moduls/coupons.js";

const router = express.Router();

router.post("/api/createCoupon", async (req, res) => {
  const { name, description, discount, category, code, expired, imageSrc } =
    req.body;

  try {
    const isExist = await couponModel.findOne({ name });

    if (isExist) {
      return res.status(400).send("Coupon already exists!");
    }

    const coupon = new couponModel({
      name,
      description,
      discount,
      category,
      code,
      expired,
      imageSrc, // Use the provided image URL
    });

    await coupon.save();
    res.status(200).send(coupon);
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).send("Internal server error");
  }
});

export { router as createCouponRouter };
