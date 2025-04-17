'use client';

import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import Link from 'next/link';
import { getAllBooks, getPopularBooks } from '../../api/BookData';
import BrowseBooksCard from '../../components/cards/BrowseBooksCard';
import 'react-multi-carousel/lib/styles.css';
import CarouselBooksCard from '../../components/cards/CarouselBookCard';
import Pagination from '../../components/Pagination';

export default function Books() {
  const [activePage, setActivePage] = useState(1);
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const getBooks = () => {
    getAllBooks(activePage, itemsPerPage).then((b) => {
      setBooks(b.items);
      setTotalPages(Math.ceil(b.totalCount / itemsPerPage));
    });
  };

  const getPopular = () => {
    getPopularBooks().then(setPopularBooks);
  };

  useEffect(() => {
    getBooks();
    getPopular();
  }, [activePage]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1139, min: 716 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 715, min: 0 },
      items: 2,
      showDots: false,
    },
  };

  return (
    <div className="pt-4 w-full overflow-hidden">
      <Carousel responsive={responsive} infinite={false} autoPlay={false} keyBoardControl arrows draggable centerMode={false} customTransition="transform 300ms ease-in-out" containerClass="carousel-container" itemClass="m-0 p-0" removeArrowOnDeviceType={['mobile']} slidesToSlide={2} minimumTouchDrag={2}>
        {popularBooks.map((book) => (
          <Link href={`/books/${book.id}`} passHref>
            <CarouselBooksCard key={book.id} bookObj={book} />
          </Link>
        ))}
      </Carousel>
      <div className="view-all-books">
        {books?.map((book) => (
          <Link href={`/books/${book.id}`} passHref>
            <BrowseBooksCard key={book.id} bookObj={book} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} />
      </div>
    </div>
  );
}
