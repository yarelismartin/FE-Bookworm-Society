/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import { createVote } from '../api/VotingSessionData';

export default function VotingSessionDetail({ sessionObj, hasVoted, onUpdate }) {
  const { user } = useAuth();

  const handleVote = (bookId) => {
    const payload = { userId: user.id, bookId, votingSessionId: sessionObj.id };
    createVote(payload).then(onUpdate);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {sessionObj.votingBooks.map((book) => (
        <Card key={book.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 shadow-md flex flex-col items-center relative">
          <div className="absolute top-0 right-0 m-[-8px] w-8 h-8 rounded-full baby-blue white-text flex items-center justify-center text-xs font-bold">{book.totalVotes}</div>
          <CardHeader shadow={false} floated={false} className="h-60 w-full mt-0">
            <img alt="book" src={book.imageUrl} className="h-full w-full object-cover rounded-lg" />
          </CardHeader>
          <CardBody className="text-center w-full flex flex-col flex-grow p-0">
            <Typography color="blue-gray" className="font-medium mb-2 mt-2">
              {book.title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal opacity-75 mb-3">
              By: {book.author}
            </Typography>
            {!hasVoted && (
              <div className="mt-auto">
                <div className="flex justify-center">
                  <button type="button" onClick={() => handleVote(book.id)} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-pink-500 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

VotingSessionDetail.propTypes = {
  sessionObj: PropTypes.shape({
    id: PropTypes.number,
    votingBooks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        totalVotes: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  hasVoted: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
