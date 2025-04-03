'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
  }, []);
  return <div>book detail</div>;
}
