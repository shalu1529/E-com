


import { FcDeleteDatabase, } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";



const CartItem = ({ item, itemIndex }) => {
  const dispatch = useDispatch();
  //const { wishlist, addToWishlist } = useWishlist();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  };

  //const isInWishlist = wishlist.some((product) => product.id === item.id);

  return (
    <div className="flex flex-col md:flex-row items-center border-b border-gray-200 py-4 relative">
      {/* <div className="absolute top-2 right-2 cursor-pointer">
        {isInWishlist ? (
          <FcLike onClick={() => addToWishlist(item)} className="text-red-500 w-6 h-6" />
        ) : (
          <FcLikePlaceholder onClick={() => addToWishlist(item)} className="w-6 h-6" />
        )}
      </div> */}
      <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
        <img src={item.image} alt={item.title} className="h-24 w-24 object-cover" />
      </div>
      <div className="md:w-2/3 flex flex-col md:flex-row justify-between ml-4">
        <div>
          <h1 className="text-xl font-semibold">{item.title}</h1>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <p className="text-lg mr-4">${item.price}</p>
          <div onClick={removeFromCart} className="cursor-pointer">
            <FcDeleteDatabase className="text-red-500 w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

