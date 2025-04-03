import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function CarouselBooksCard({ bookObj }) {
  return (
    <div className="card bg-transparent border-none pb-4 w-32 sm:w-44 md:w-40 lg:w-48 xl:[width:10rem] group">
      {/* Aspect ratio for consistent height */}
      <div className="book-card-cover relative aspect-[2/3]  overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
        <img src={bookObj.imageUrl} alt={bookObj.title} className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-[15px] rounded-br-[3%] rounded-tl-none  cursor-pointer" />
      </div>
      <Link href={`/books/${bookObj.id}`} passHref>
        <div className="p-2 bg-transparent">
          <h3 className="truncate-book-title text-lg font-semibold text-[#1e1915]  transition-all duration-300 ease-in-out group-hover:underline cursor-pointer">{bookObj.title}</h3>
          <p className="text-sm text-gray-600">by {bookObj.author}</p>
        </div>
      </Link>
    </div>
  );
}

CarouselBooksCard.propTypes = {
  bookObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};
