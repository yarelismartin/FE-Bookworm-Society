/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBookClubsHaveRead } from '../api/BookClubData';
import BookCard from './cards/BookCard';

export default function HaveRead({ bookClubId }) {
  const [haveRead, setHaveRead] = useState([]);

  const getClubsHaveRead = () => {
    getBookClubsHaveRead(bookClubId).then((data) => {
      setHaveRead(data.haveRead);
    });
  };

  useEffect(() => {
    getClubsHaveRead();
  }, []);

  return (
    <div label="Have Read" className="flex flex-wrap gap-4 justify-center">
      {haveRead.length > 0 ? (
        haveRead.map((book) => <BookCard bookObj={book} key={book.id} />)
      ) : (
        <h1 className="text-3xl font-semibold text-center mb-6" color="gray">
          No books have been read yet.
        </h1>
      )}
    </div>
  );
}

HaveRead.propTypes = {
  bookClubId: PropTypes.number.isRequired,
};
