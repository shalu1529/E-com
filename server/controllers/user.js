

import { User } from "../models/userModel.js";
// import { createToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';

//login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;


    // Function to create a JWT token
    const createToken = (data) => {
        return jwt.sign({ id: data.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
      };
      

    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    console.log("User wishlist in backend:", user?.wishlist); // Log wishlist for debugging

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = createToken({ id: user.id });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 86400000, // 1 day
        secure: false, // Set true in production for HTTPS
        sameSite: "Strict",
        path: "/",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        success: true,
        wishlist: user.wishlist || [], // Return wishlist
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


//logout
// export const Logout = async (req, res) => {
//   console.log("Logout attempt by user:", req.user);
//   try {
//     const user = req.user;
//     const wishlist = req.body.wishlist; // Access wishlist from the request body

//     console.log("Received wishlist:", wishlist);

//     if (user) {
//       if (wishlist) {
//         user.wishlist = wishlist; // Update the user's wishlist
//         await user.save(); // Save the updated user data
//       }

//       return res
//         .status(200)
//         .cookie("token", "", {
//           httpOnly: true,
//           expires: new Date(0),
//           secure: false,
//           sameSite: "Strict",
//           path: "/",
//         })
//         .json({
//           message: "User logged out successfully.",
//           success: true,
//         });
//     }

//     return res.status(404).json({
//       message: "User not found.",
//       success: false,
//     });
//   } catch (error) {
//     console.error("Logout error:", error);
//     return res.status(500).json({
//       message: "Server error",
//       success: false,
//     });
//   }
// };
export const Logout = async (req, res) => {
  try {
    console.log("Logout attempt by user:", req.user);

    // Clear the cookie unconditionally
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: false,
      sameSite: "Strict",
      path: "/",
    });

    if (req.user) {
      const user = req.user;
      const wishlist = req.body.wishlist;

      console.log("Received wishlist:", wishlist);

      if (wishlist) {
        user.wishlist = wishlist; // Update user's wishlist
        await user.save(); // Save the user data
      }

      return res.status(200).json({
        message: "User logged out successfully.",
        success: true,
      });
    }

    // If no user found, still return a success response
    return res.status(200).json({
      message: "No active user session to logout.",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};





// Register function
export const Register = async (req, res) => {
  console.log("Register route hit");
  try {
    const { fullName, email, password } = req.body;

    // Check for missing required fields
    if (!fullName || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "This email is already used",
        success: false,
      });
    }

    // Create new user
    await User.create({
      fullName,
      email,
      password
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });

  } catch (error) {
    console.log("Register error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};