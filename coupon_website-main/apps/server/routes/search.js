import express from "express";
import { couponModel } from "../db/moduls/coupons.js";

const router = express.Router();

router.get("/api/search", async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const searchResults = await couponModel.find({
      name: { $regex: new RegExp(searchQuery, "i") },
    });
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error });
  }
});
export { router as searchRouter };
