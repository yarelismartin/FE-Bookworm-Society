/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format, formatDistanceToNow } from 'date-fns';
import { getSinglePost } from '../../../../../api/PostData';

export default function PostDetail({ params }) {
  const [post, setPost] = useState({});

  const { postId } = params;

  const getPost = () => {
    getSinglePost(postId).then((data) => {
      setPost(data);
      console.warn(data);
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="container pt-3">
      <article className="rounded-xl bg-white p-4  sm:p-6 lg:p-8 flex items-center justify-center mb-4 w-full max-w-lg ml-auto mr-auto">
        <div className="flex items-start sm:gap-8">
          <div>
            <p className="mt-3 text-sm text-gray-700">{post.content}</p>

            <div className="mt-4 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-1 text-gray-500">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <p className="text-xs font-medium">{post.createdDate ? format(new Date(post.createdDate), 'MMM d, yyyy') : 'N/A'}</p>
              </div>

              <span className="hidden sm:block" aria-hidden="true">
                &middot;
              </span>

              <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">@{post.user?.username}</p>
            </div>
          </div>
        </div>
      </article>
      {post.comments?.map((comment) => (
        <div key={comment.id} className="flex justify-center">
          <div className="relative grid grid-cols-1 gap-3 p-3 mb-8 border rounded-lg bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-md">
            <div className="relative flex gap-4">
              <img src={comment.user?.imageUrl} className="relative rounded-lg -top-6 -mb-2 bg-white border h-16 w-16 object-cover" alt="" loading="lazy" />
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                  <p className="relative text-lg whitespace-nowrap truncate overflow-hidden">{comment.user?.username}</p>
                </div>
                <p className="text-gray-400 text-xs">{formatDistanceToNow(new Date(comment.createdDate), { addSuffix: true })}</p>
              </div>
            </div>
            <p className="-mt-3 text-gray-500">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

PostDetail.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
