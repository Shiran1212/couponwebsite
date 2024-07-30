import mongoose from "mongoose";
const Coupon = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    enum: ["fashion", "beauty", "home", "food"],
    required: true,
  },
  code: {
    type: String,
  },
  expired: {
    type: String,
  },
  imageSrc: {
    type: String,
    required: true,
  },
});
export const couponModel = mongoose.model("coupons", Coupon);
