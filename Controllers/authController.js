const User = require("../models/user");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  try {
    const { name, email, password, address, isAdmin, contactNumber } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const user = new User({ name, email, password, address, contactNumber, isAdmin });

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    // Check if the password is correct
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
   
    
    const token=jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(200).json({ message: "Login successful",token,user: {
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  } });
  } catch (err) {
   next(err);
  }
};

module.exports = { registerUser, loginUser };