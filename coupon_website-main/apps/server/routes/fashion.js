import express from "express";
import {couponModel} from "../db/moduls/coupons.js"
const router = express.Router();




router.get("/getCoupon",async(req,res)=>{
    const coupon = await couponModel.find({});
    res.send(coupon);

})




export {router as couponRouter};
