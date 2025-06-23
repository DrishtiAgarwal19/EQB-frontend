import React from 'react';

function Wishlist() {
  const wishlistItems = ['Venue 1', 'Caterer 1', 'Photographer 1'];

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {wishlistItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
export default Wishlist;
