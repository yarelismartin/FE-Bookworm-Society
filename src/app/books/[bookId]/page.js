'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getSingleBook } from '../../../api/BookData';

export default function BookDetail() {
  const [book, setBook] = useState({});
  const { bookId } = useParams();

  const getBook = () => {
    getSingleBook(bookId).then(setBook);
  };

  useEffect(() => {
    getBook();
    console.warn(book);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="book-image-container">
        <div className="book-image">
          <p>{book.imageUrl}</p>
        </div>
        <div className="CTA-rate">
          <Link href={`/books/${bookId}/review/create`} passHref>
            <p>rate this book CTA links to review form</p>
          </Link>
        </div>
      </div>
      <div className="book-highlight">
        <h2>{book.title}</h2>
        <h4>{book.author} </h4>
        <h2>star rating when clicked takes you down to the reviews</h2>
        <p>{book.description}</p>
        <p>{book.genre}</p>
      </div>
      <div className="book-reviews">
        <div className="filter-by-rating">
          <p>1 -5 star filter with the percentage showcases beside the start line</p>
        </div>
        <div className="users-reviews">
          {book.reviews?.map((review) => (
            <p>{review.content}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
