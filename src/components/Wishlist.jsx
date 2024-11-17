


import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemove = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your wishlist?')) {
      removeFromWishlist(productId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((product) => {
            // Handling product image and fallback
            let productImage = 'default-image-url'; // Default image URL

            if (product.images && product.images.length > 0) {
              productImage = product.images[0].replace(/[\[\]\"\\]/g, ''); // Clean URL if necessary
            } else if (product.image) {
              productImage = product.image;
            }

            return (
              <div key={product.id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={productImage}
                    alt={product.title}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      <Link to={`/product/${product.id}`} className="hover:text-blue-500">
                        {product.title}
                      </Link>
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold">{product.rating?.rate}</span>
                      <span className="text-sm text-gray-600">({product.rating?.count})</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Assured
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-800 mt-2">₹{product.price}</div>
                    <span className="line-through text-sm text-gray-500">₹23,316</span>
                    <span className="text-sm text-green-600 ml-2">45% off</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <AiFillDelete size={24} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
