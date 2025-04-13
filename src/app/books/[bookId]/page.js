/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
/* import { useAuth } from '@/utils/context/authContext';
 */ import PropTypes from 'prop-types';
import { getSingleBook } from '../../../api/BookData';
/* import { deleteReview } from '../../../api/ReviewData';
 */ import ReviewCard from '../../../components/cards/ReviewCard';
import StarIcon from '../../../components/StarIcon';

function StarRatingDisplay({ rating }) {
  return (
    <a href="#reviews">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => {
          const fill = Math.min(Math.max(rating - i, 0), 1); // 0.0 to 1.0
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="relative">
              {/* Gray background */}
              <StarIcon className="text-[#c2c7cc] w-[30px] h-[30px]" /> {/* Increased size here */}
              {/* Yellow fill layer */}
              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <StarIcon className="text-[#e87400] w-[30px] h-[30px]" /> {/* Same size for fill */}
              </div>
            </div>
          );
        })}
      </div>
    </a>
  );
}

StarRatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default function BookDetail() {
  const [book, setBook] = useState({});
  const { bookId } = useParams();
  const [bookRating, setBookRating] = useState(0);
  /*   const { user } = useAuth();
   */
  const getBook = () => {
    getSingleBook(bookId).then(setBook);
  };

  /* const handleDelete = (reviewId) => {
    deleteReview(reviewId).then(getBook);
  }; */

  const averageRating = () => {
    const ratings = book.reviews?.map((review) => review.rating) || [];

    if (ratings.length === 0) {
      setBookRating(0);
    } else {
      const sum = ratings.reduce((acc, curr) => acc + curr, 0);
      const average = sum / ratings.length;
      setBookRating(average);
    }
  };

  useEffect(() => {
    getBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (book.reviews) {
      averageRating();
    }
  }, [book.reviews]);

  return (
    <div className="px-2 py-6">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-6 lg:grid-cols-12">
        {/* Left Column - Book Image & CTA */}
        <div className="left-book-image-container md:block md:col-span-2 lg:col-span-3 flex flex-col items-center md:items-start">
          <div className="book-image">
            <img src={book.imageUrl} alt="book_cover" className="w-full max-w-[200px] md:max-w-full object-contain book-card-cover rounded-tr-[15px] rounded-br-[3%] rounded-tl-none mb-2" />
          </div>
          <Link href={`/books/${bookId}/review/create`} passHref>
            <p className="rate_book_link text-center font-normal hover:underline mt-2 hover:text-[#e87400]">Rate This Book</p>
          </Link>
        </div>

        {/* Right Column - Book Info */}
        <div className=" pt-0 col-span-1 md:col-span-4 lg:col-span-9">
          <h2 className="text-4xl font-semibold sm:text-5xl">{book.title}</h2>
          <h4 className="text-xl text-gray-900 sm:text-2xl">{book.author} </h4>

          <div className="flex items-center mt-2">
            <StarRatingDisplay rating={bookRating} />
            <p className="pl-2 text-2xl font-normal">{Number.parseFloat(bookRating).toFixed(2)}</p>
          </div>

          <p className="mt-4 text-gray-800 text-[16px] lora-font  leading-relaxed">{book.description}</p>
          <p className="mt-2 text-md font-medium text-gray-500 italic">{book.genre}</p>

          {/* Reviews */}
          <div id="reviews" className="mt-10">
            <h3 className="text-2xl font-normal mb-2">User Reviews</h3>
            {book.reviews?.length > 0 ? (
              book.reviews.map((review) => (
                <div key={review.id} className="mb-2">
                  <ReviewCard reviewObj={review} onUpdate={() => getBook()} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
