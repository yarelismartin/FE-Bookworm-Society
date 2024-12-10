'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import { getBookClubsHaveRead } from '../api/BookClubData';

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
    <div label="Have Read">
      {haveRead.map((book) => (
        <Card className="w-[45%]" key={book.id}>
          <CardHeader shadow={false} floated={false} className="h-60">
            <img alt="book" src={book.imageUrl} className="h-full w-full object-cover" />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {book.title}
              </Typography>
            </div>

            <Typography variant="small" color="gray" className="font-normal opacity-75">
              By: {book.author}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

HaveRead.propTypes = {
  bookClubId: PropTypes.number.isRequired,
};
