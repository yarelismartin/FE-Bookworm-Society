'use client';

import React, { useEffect, useState } from 'react';
import getAllBooks from '../../api/BookData';
import BrowseBooksCard from '../../components/cards/BrowseBooksCard';

export default function Books() {
  const [books, setBooks] = useState([]);
  // const [popularBooks, setPopularBooks] = useState([]);

  const getBooks = () => {
    getAllBooks(1, 10).then((b) => setBooks(b.items));
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="pt-4">
      <div className="flex flex-wrap gap-4">
        {books?.map((book) => (
          <BrowseBooksCard bookObj={book} />
        ))}
      </div>
    </div>
  );
}
