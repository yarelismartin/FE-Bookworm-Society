'use client';

import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { getAllBooks, getPopularBooks } from '../../api/BookData';
import BrowseBooksCard from '../../components/cards/BrowseBooksCard';
import 'react-multi-carousel/lib/styles.css';

export default function Books() {
  const [books, setBooks] = useState([]);
  // const [startIndex, setStartIndex] = useState(0);
  // const [booksPerSlide, setBooksPerSlide] = useState(3); // Default for mid-sized screens
  const [popularBooks, setPopularBooks] = useState([]);

  const getBooks = () => {
    getAllBooks(1, 10).then((b) => setBooks(b.items));
  };

  const getPopular = () => {
    getPopularBooks().then(setPopularBooks);
  };

  useEffect(() => {
    getBooks();
    getPopular();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="pt-4">
      <Carousel
        responsive={responsive}
        infinite={false} // Set to true if you want it to loop
        autoPlay={false}
        keyBoardControl
        showDots={false}
        arrows
        customTransition="transform 300ms ease-in-out"
        containerClass="carousel-container"
        itemClass="m-0 p-0" // Adjust spacing between slides
        removeArrowOnDeviceType={['tablet', 'mobile']} // Remove arrows on smaller screens
      >
        {popularBooks.map((book) => (
          <BrowseBooksCard key={book.id} bookObj={book} />
        ))}
      </Carousel>
      <div className="flex flex-wrap gap-4">
        {books?.map((book) => (
          <BrowseBooksCard bookObj={book} />
        ))}
      </div>
    </div>
  );
}
