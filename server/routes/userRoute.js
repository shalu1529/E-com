import express from 'express';
import { Login, Logout, Register } from "../controllers/user.js";
import { auth } from "../middlewares/auth.js"; // Import the auth middleware

const router = express.Router();

// Public routes
router.route("/register").post(Register);
router.route("/login").post(Login);
// router.route("/logout").post(Logout);
// In your routes, add the `auth` middleware to the `/logout` route
router.route("/logout").post(auth,Logout);  // Attach auth middleware here

// Protected route example
router.route("/profile").get(auth, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
