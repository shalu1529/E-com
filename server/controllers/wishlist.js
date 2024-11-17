// controllers/wishlistController.js

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const user = req.user;

    // Check and add product to wishlist
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    return res.status(200).json({ success: true, message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Add to Wishlist Error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to add to wishlist" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const user = req.user;

    // Remove product from wishlist
    const updatedWishlist = user.wishlist.filter((id) => id !== productId);
    user.wishlist = updatedWishlist;
    await user.save();

    return res.status(200).json({ success: true, message: "Product removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Remove from Wishlist Error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to remove from wishlist" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = req.user;

    if (!user.wishlist.length) {
      return res.status(200).json({ success: true, message: "Wishlist is empty", wishlist: [] });
    }

    return res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error("Fetch Wishlist Error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to fetch wishlist" });
  }
};
