

import { createSlice } from "@reduxjs/toolkit";

// Helper function to get cart items from localStorage
const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(), // Load initial state from localStorage
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state)); // Save updated cart to localStorage
    },
    remove: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to localStorage
      return updatedCart;
    },
    //removing cart item after logout
    clearCart: (state) => {
        localStorage.removeItem("cart"); // Remove cart from localStorage
        return []; // Clear the cart state
      },

    
  },
});

export const { add, remove ,clearCart} = CartSlice.actions;
export default CartSlice.reducer;