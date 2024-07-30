import mongoose from "mongoose";

const User = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
  },
  admin: {
    type: Boolean,
  },
  wishList: {
    type: [String], // אפשר להשתמש במערך של מחרוזות לשמירת המזהים של הקופונים שברצונו להוסיף לרשימת המשאלות
  },
  
});

export const userModel = mongoose.model("user", User);
