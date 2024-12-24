/* eslint-disable react-hooks/exhaustive-deps */

'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCommunityPosts } from '../../../../api/BookClubData';
import PostForm from '../../../../components/forms/PostForm';
import PostCard from '../../../../components/PostCard';

export default function CommunityPosts({ bookClubId }) {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getCommunityPosts(bookClubId).then((data) => {
      console.warn(data);
      setPosts(data.posts);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div label="Community Posts">
      <PostForm clubId={bookClubId} onUpdate={getPosts} />
      {posts.map((item) => (
        <PostCard post={item} key={item.id} clubId={bookClubId} onUpdate={getPosts} />
      ))}
    </div>
  );
}

CommunityPosts.propTypes = {
  bookClubId: PropTypes.number.isRequired,
};
