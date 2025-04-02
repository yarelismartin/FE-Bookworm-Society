'use client';

import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { getAllBooks, getPopularBooks } from '../../api/BookData';
import BrowseBooksCard from '../../components/cards/BrowseBooksCard';
import 'react-multi-carousel/lib/styles.css';
import CarouselBooksCard from '../../components/cards/CarouselBookCard';

export default function Books() {
  const [books, setBooks] = useState([]);
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
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
      showDots: false,
    },
  };

  return (
    <div className="pt-4 w-full overflow-hidden">
      <Carousel responsive={responsive} infinite={false} autoPlay={false} keyBoardControl arrows draggable centerMode={false} customTransition="transform 300ms ease-in-out" containerClass="carousel-container" itemClass="m-0 p-0" removeArrowOnDeviceType={['mobile']} slidesToSlide={2} minimumTouchDrag={2}>
        {popularBooks.map((book) => (
          <CarouselBooksCard key={book.id} bookObj={book} />
        ))}
      </Carousel>
      <div className="view-all-books">
        {books?.map((book) => (
          <BrowseBooksCard key={book.id} bookObj={book} />
        ))}
      </div>
    </div>
  );
}
