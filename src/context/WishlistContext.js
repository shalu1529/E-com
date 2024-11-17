import React, { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];  // Default to empty array if nothing in localStorage
  });

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      const isItemInWishlist = prevWishlist.some(
        (product) => product.id === item.id
      );
      const updatedWishlist = isItemInWishlist
        ? prevWishlist.filter((product) => product.id !== item.id)
        : [...prevWishlist, item];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    if (userId) {
      localStorage.removeItem(`wishlist_${userId}`);
    }
  };

  const clearUser = () => {
    setUserId("");
    localStorage.removeItem("userId");
    clearWishlist();
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearUser,
        setUser: setUserId,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
