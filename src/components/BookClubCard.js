'use client';

import { useRouter } from 'next/navigation';
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';

export default function BookClubCard({ bookClubObj, showDeleteButton }) {
  const router = useRouter();

  return (
    <div className="card glass w-96" key={bookClubObj.id}>
      <figure>
        <img src={bookClubObj.imageUrl} alt="car!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{bookClubObj.name}</h2>
        <p>{bookClubObj.description}</p>
        <div className="card-actions justify-end">
          <button type="button" className="btn btn-primary" onClick={() => router.push(`/bookclubs/${bookClubObj.id}`)}>
            View Club
          </button>
          <button type="button" className="btn btn-primary" onClick={() => router.push(`/send to edit form`)}>
            Edit Club
          </button>
          {showDeleteButton && (
            <button type="button" className="btn btn-primary" onClick={() => router.push(`/deleye endpoint called`)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

BookClubCard.propTypes = {
  bookClubObj: PropTypes.shape({
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  showDeleteButton: PropTypes.bool,
};
