import React, { useState } from 'react';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Grand Ballroom', price: '$5000' },
    { id: 2, name: 'Garden Venue', price: '$3000' },
    { id: 3, name: 'City Loft', price: '$4500' },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleRemove = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter(itemId => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleCompareSelected = () => {
    if (selectedItems.length >= 2) {
      alert(`Comparing selected items: ${selectedItems.join(', ')}`);
      // In a real application, you would navigate to a comparison page
    } else {
      alert('Please select at least two venues to compare.');
    }
  };

  const handleViewDetails = (id) => {
    alert(`Viewing details for item: ${id}`);
    // In a real application, you would navigate to the venue details page
  };

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <>
          <ul className="wishlist-list">
            {wishlistItems.map((item) => (
              <li key={item.id} className="wishlist-item">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: {item.price}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleViewDetails(item.id)}>View Details</button>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCompareSelected}
            disabled={selectedItems.length < 2}
            className="compare-button"
          >
            Compare Selected ({selectedItems.length})
          </button>
        </>
      )}
    </div>
  );
}

export default Wishlist;
