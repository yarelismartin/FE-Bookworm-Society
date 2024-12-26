/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

export default function BookCard({ bookObj, showCurrentRead = false }) {
  return (
    <Card key={bookObj.id} className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-[20%] p-2 flex-grow-0">
      {showCurrentRead && (
        <div className="bg-blue-gray-100 p-2 rounded-t-lg">
          <Typography variant="h6" color="blue-gray" className="text-center">
            Current Read
          </Typography>
        </div>
      )}
      <CardHeader shadow={false} floated={false} className="h-auto">
        <img alt="book" src={bookObj.imageUrl} className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {bookObj.title}
          </Typography>
        </div>

        <Typography variant="small" color="gray" className="font-normal opacity-75">
          By: {bookObj.author}
        </Typography>
      </CardBody>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  showCurrentRead: PropTypes.bool,
};
