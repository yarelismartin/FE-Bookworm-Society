/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

'use client';

import { useRouter } from 'next/navigation';
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { deletBookClub } from '../api/BookClubData';

export default function BookClubCard({ bookClubObj, showDeleteButton, onUpdate }) {
  const router = useRouter();

  const handleDeletingBookClub = () => {
    if (window.confirm('Are you sure you want to delete this book club? You can always hand over hosting abilities to a current member.')) {
      deletBookClub(bookClubObj.id).then(onUpdate);
    }
  };
  return (
    <div className="book-club-card">
      <div className="frosted-overlay" />
      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <h2>{bookClubObj.name}</h2>
          {showDeleteButton && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="ellipsis">
                ...
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow cursor-pointer">
                <li>
                  <button type="button" onClick={() => router.push(`/bookclubs/${bookClubObj.id}/edit-bookclub`)}>
                    Edit
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleDeletingBookClub}>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Description */}
        <p className="card-description">{bookClubObj.description}</p>
        {/* Actions */}
        <div className="card-actions">
          <button type="button" className="blue-button" onClick={() => router.push(`/bookclubs/${bookClubObj.id}`)}>
            Visit Club
          </button>
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
  onUpdate: PropTypes.func,
};
