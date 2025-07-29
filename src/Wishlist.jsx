import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/wishlist');
        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    fetchWishlistItems();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 4 items per page as shown in the image

  // Calculate items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlistItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Assuming Navbar is rendered elsewhere, or this page will have its own simplified header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your wishlist is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {currentItems.map((item) => (
                <div key={item.venue_id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <img src={item.image} alt={item.venueName} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.venueName}</h3>
                    <p className="text-gray-600 text-sm">{item.location}</p>
                    <div className="text-yellow-500">{'★'.repeat(item.ratings)}{'☆'.repeat(5 - item.ratings)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {'<'}
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {'>'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
