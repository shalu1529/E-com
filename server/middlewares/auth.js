// Import the necessary modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js"; // Import your User model

dotenv.config(); // Load environment variables

// Define and export the auth middleware function
export const auth = async (req, res, next) => {
  try {
    // Check for token in request
    const token = req.body.token || req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    console.log('Token in request:', token);
    
    // Return error if token is missing
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token Missing"
      });
    }
    
    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('token in payload', payload);
    
    // Use payload.id instead of payload.userId
    const user = await User.findById(payload.id); // Adjust based on your payload structure
    
    console.log('User from database:', user);
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found"
      });
    }

    // Set user data to req for access in next route handler
    req.user = user;
    next(); // Proceed if the token is valid and matches

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while authorizing the token"
    });
  }
};
