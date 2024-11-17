import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className="container overflow-auto mx-auto px-4 py-8">
      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="md:w-2/3">
            {cart.map((item, index) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>
          <div className="md:w-1/3 md:ml-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-lg font-semibold">Your Cart</div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <div>Total Items:</div>
                  <div>{cart.length}</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div>Total Amount:</div>
                  <div>${totalAmount}</div>
                </div>
              </div>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                CheckOut Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cart Empty</h1>
          <Link to={"/"}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
