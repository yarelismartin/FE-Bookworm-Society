/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { deleteComment } from '../../api/CommentData';

export default function CommentCard({ comment, userId, onUpdate }) {
  const deleteAComment = () => {
    if (window.confirm("Click 'Ok' if you would like to delete your comment")) {
      deleteComment(comment.id).then(onUpdate);
    }
  };
  return (
    <div key={comment.id} className="flex justify-center">
      <div className="relative grid grid-cols-1 gap-3 p-3 mb-8 border rounded-lg bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-md">
        <div className="relative flex gap-4">
          <img src={comment.user?.imageUrl} className="relative rounded-lg -top-6 -mb-2 bg-white border h-16 w-16 object-cover" alt="" loading="lazy" />
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
              <div>
                <p className="relative text-lg whitespace-nowrap truncate overflow-hidden">{comment.user?.username}</p>
                <p className="text-gray-400 text-xs">{formatDistanceToNow(new Date(comment.createdDate), { addSuffix: true })}</p>
              </div>
              {userId === comment.user.id && (
                <svg width="54" height="54" viewBox="0 0 84 84" fill="none" onClick={deleteAComment} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_ddd_360_5244)">
                    <path d="M32.5 34H51.5" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    <path d="M45.9673 34C45.9673 31.7909 46.6286 30 42 30C37.3714 30 38.0327 31.7909 38.0327 34" stroke="black" strokeWidth="2" />
                    <path d="M50 37.5L48.005 48.346C47.9236 48.8094 47.6815 49.2292 47.3212 49.5317C46.9609 49.8342 46.5055 50 46.035 50H37.965C37.4945 50 37.0391 49.8342 36.6788 49.5317C36.3185 49.2292 36.0764 48.8094 35.995 48.346L34 37.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <filter id="filter0_ddd_360_5244" x="-21" y="-21" width="126" height="126" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_360_5244" />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="13" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.0785417 0 0 0 0 0.149529 0 0 0 0 0.3625 0 0 0 0.04 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_360_5244" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.14902 0 0 0 0 0.360784 0 0 0 0.04 0" />
                      <feBlend mode="normal" in2="effect1_dropShadow_360_5244" result="effect2_dropShadow_360_5244" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.14902 0 0 0 0 0.360784 0 0 0 0.1 0" />
                      <feBlend mode="normal" in2="effect2_dropShadow_360_5244" result="effect3_dropShadow_360_5244" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_360_5244" result="shape" />
                    </filter>
                  </defs>
                </svg>
              )}
            </div>
          </div>
        </div>
        <p className="-mt-3 text-gray-500">{comment.content}</p>
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    createdDate: PropTypes.string,
    content: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      imageUrl: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
  userId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
