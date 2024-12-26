/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

'use client';

import { useRouter } from 'next/navigation';
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { IoLocationOutline } from 'react-icons/io5';
import { TfiLink } from 'react-icons/tfi';
import { deletBookClub } from '../../api/BookClubData';

export default function BookClubCard({ bookClubObj, showDeleteButton, onUpdate, showImage }) {
  const router = useRouter();

  const handleDeletingBookClub = () => {
    if (window.confirm('Are you sure you want to delete this book club? You can always hand over hosting abilities to a current member.')) {
      deletBookClub(bookClubObj.id).then(onUpdate);
    }
  };

  const renderMeetupIcon = () => {
    if (bookClubObj.meetUpType === 'Online') {
      return <HiOutlineComputerDesktop className="w-6 h-6" />;
    }

    if (bookClubObj.meetUpType === 'In-Person') {
      return <IoLocationOutline className="w-6 h-6" />;
    }

    if (bookClubObj.meetUpType === 'Hybrid') {
      return <TfiLink className="w-6 h-6" />;
    }

    return <span>Unknown</span>;
  };

  return (
    <div className="book-club-card w-full max-w-[270px] rounded-lg shadow-md border border-gray-200 bg-white overflow-hidden">
      {/* Top Image */}
      {showImage && <img src={bookClubObj.imageUrl} alt={bookClubObj.name} className="w-full h-48 object-cover rounded-t-lg" />}

      <div className="p-4">
        {/* Header */}
        <div className="card-header flex justify-between items-start mb-3">
          <h2 className="text-lg font-bold leading-tight line-clamp-2">{bookClubObj.name}</h2>
          {showDeleteButton && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="ellipsis text-gray-500 cursor-pointer">
                ...
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
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
        <div className="flex items-center mb-3">
          {renderMeetupIcon()}
          <p className="ml-2 ">{bookClubObj.meetUpType}</p>
        </div>
        {/* Description */}
        <p className="text-sm text-gray-600">{bookClubObj.description}</p>
        {/* Actions */}
        <div className="card-actions mt-4">
          <button type="button" className="blue-button w-full" onClick={() => router.push(`/bookclubs/${bookClubObj.id}`)}>
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
    meetUpType: PropTypes.string,
  }).isRequired,
  showDeleteButton: PropTypes.bool,
  showImage: PropTypes.bool,
  onUpdate: PropTypes.func,
};
