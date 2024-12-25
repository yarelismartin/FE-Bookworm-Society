/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { getSinglePost } from '../../../../../api/PostData';
import CommentForm from '../../../../../components/forms/CommentForm';
import CommentCard from '../../../../../components/cards/CommentCard';

export default function PostDetail({ params }) {
  const [post, setPost] = useState({});
  const { user } = useAuth();

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
      <div>
        <CommentForm postId={postId} userId={user.id} onUpdate={getPost} />
      </div>
      {post.comments?.map((item) => (
        <CommentCard comment={item} key={item.id} userId={user.id} onUpdate={getPost} />
      ))}
    </div>
  );
}

PostDetail.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
