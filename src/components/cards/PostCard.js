'use client';

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TiPinOutline, TiPin } from 'react-icons/ti';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import PostForm from '../forms/PostForm';
import { deletePost, togglePinPost } from '../../api/PostData';

export default function PostCard({ post, clubId, onUpdate, isHost }) {
  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm("Click 'OK' if you would like to move forward with deleting this post?")) {
      deletePost(post.id).then(onUpdate);
    }
  };

  const handlePinClick = (postId) => {
    if (isHost) {
      const payload = { userId: user.id, bookClubId: clubId };
      togglePinPost(payload, postId).then(() => {
        onUpdate();
      });
    } else {
      alert('Only the host can pin or unpin posts.');
    }
  };

  const pinButtonClass = isHost ? 'cursor-pointer' : '';

  // Add state to track which post is selected
  const [openModalId, setOpenModalId] = useState(null);

  const openModal = (postId) => {
    setOpenModalId(postId);
    const modal = document.getElementById(`modal-${postId}`);
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    setOpenModalId(null);
    const modal = document.getElementById(`modal-${post.id}`);
    if (modal) modal.close(); // This will close the modal
  };

  return (
    <div key={post.id} className="flex items-center justify-center mb-3 lora-font">
      <div className="rounded-xl border p-4 shadow-md w-full sm:w-10/12 md:w-11/12 lg:w-11/12 bg-white">
        {/* Header */}
        <div className="flex flex-wrap justify-between border-b pb-3">
          {/* User Info */}
          <div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img src={post.user?.imageUrl} alt="User Avatar" className="h-full w-full object-cover" />
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700">{post.user?.username}</div>
            </div>
            {/* Timestamp */}
            <div className="text-xs text-neutral-500 mt-2">{formatDistanceToNow(new Date(post.createdDate), { addSuffix: true })}</div>
          </div>
          <div className="flex space-x-4 sm:space-x-8">
            {post.isPinned ? (
              // Both Host and Members see the TiPin icon when the post is pinned
              <TiPin className={`w-6 h-6 ${pinButtonClass}`} onClick={isHost ? () => handlePinClick(post.id) : undefined} />
            ) : (
              // Only Host sees the TiPinOutline icon when the post is not pinned, and can click it
              isHost && (
                <TiPinOutline
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handlePinClick(post.id)} // Host can pin/unpin
                />
              )
            )}

            {user.id === post.user.id && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="ellipsis">
                  ...
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow cursor-pointer">
                  <li>
                    <button type="button" onClick={() => openModal(post.id)}>
                      Edit
                    </button>
                    {/* Modal */}
                    {openModalId === post.id && (
                      <dialog id={`modal-${post.id}`} className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="modal-box w-11/12 max-w-5xl">
                          <h3 className="font-bold text-lg">Edit Post</h3>
                          <PostForm postObj={post} modalClose={closeModal} onUpdate={onUpdate} />
                        </div>
                      </dialog>
                    )}
                  </li>
                  <li>
                    <button type="button" onClick={handleDelete}>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Content */}
        <div className="mt-4 mb-6 lora-font">
          <div className="text-xs sm:text-sm text-neutral-600 lora-font">{post.content}</div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between text-slate-500">
          <div className="flex space-x-4 sm:space-x-8">
            {/* Comment Icon */}
            <Link href={`/bookclubs/${clubId}/posts/${post.id}`} aria-label="View post details" className="flex cursor-pointer items-center transition hover:text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span className="text-xs sm:text-sm">{post.commentCount >= 1 ? post.commentCount : ''}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    createdDate: PropTypes.string,
    content: PropTypes.string,
    isPinned: PropTypes.bool,
    commentCount: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      imageUrl: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
  clubId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func,
  isHost: PropTypes.bool.isRequired,
};
