// routes/wishlistRoutes.js

import express from "express";
import { auth } from "../middlewares/auth.js";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlist.js";

const router = express.Router();

// Add to wishlist
router.post("/add", auth, addToWishlist);

// Remove from wishlist
router.delete("/remove", auth, removeFromWishlist);

// Get wishlist
router.get("/", auth, getWishlist);

export default router;
