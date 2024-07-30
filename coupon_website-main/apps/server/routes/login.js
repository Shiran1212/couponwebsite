import express from "express";
import {userModel} from "../db/moduls/user.js"
const router = express.Router();

router.get("/getUser",async(req,res)=>{
    const user = await userModel.find({});
    res.send(user);

})


// בקובץ userRouter.js
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      // Check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      // If email and password are correct, return user details
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  
router.post("/user/removeCouponFromWishList", async (req, res) => {
    const { userId, couponId } = req.body;
    try {
      // Find the user by userId and update their wishList field to remove the couponId
      const user = await userModel.findByIdAndUpdate(userId, { $pull: { wishList: couponId } }, { new: true });
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  
  router.post("/user/addCouponToWishList", async (req, res) => {
    const { userId, couponId } = req.body;
    try {
      // Find the user by userId and update their wishList field to include the couponId
      const user = await userModel.findByIdAndUpdate(userId, { $addToSet: { wishList: couponId } }, { new: true });
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
export {router as userRouter};
