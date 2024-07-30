import express from "express";
import { userModel } from "../db/moduls/user.js";
const router = express.Router();

router.post("/api/createUser", async (req, res) => {
  
  const { firstname, lastname, email, password, phonenumber, admin } = req.body;
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    return res.send("Email already in use");
  }
  const user = new userModel({
    firstname,
    lastname,
    email,
    password,
    phonenumber,
    admin,
  });
  await user.save();
  res.send(user);
});

export { router as createRouter };
