import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Wishlist from "./components/Wishlist";
import { Component as Footer } from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className=" bg-slate-900">
        <Navbar />
      </div>
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
