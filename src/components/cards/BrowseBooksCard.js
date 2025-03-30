import React from 'react';
import PropTypes from 'prop-types';

export default function BrowseBooksCard({ bookObj }) {
  return (
    <div className="card bg-transparent border-none pb-4 w-40 sm:w-44 md:w-40 lg:w-48 xl:[width:10rem] group">
      {/* Aspect ratio for consistent height */}
      <div className="relative pb-[160%] sm:pb-[125%] md:pb-[160%] lg:pb-[160%] xl:pb-[160%] overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
        <img src={bookObj.imageUrl} alt={bookObj.title} className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-[15px] rounded-br-[3%] rounded-tl-none shadow-2xl cursor-pointer" />
      </div>

      <div className="p-2 bg-transparent">
        <h3 className="text-lg font-semibold text-gray-800  transition-all duration-300 ease-in-out group-hover:underline cursor-pointer">{bookObj.title}</h3>
        <p className="text-sm text-gray-600">by {bookObj.author}</p>
      </div>
    </div>
  );
}

BrowseBooksCard.propTypes = {
  bookObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};
