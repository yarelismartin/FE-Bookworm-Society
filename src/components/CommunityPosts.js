/* eslint-disable react-hooks/exhaustive-deps */

'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCommunityPosts } from '../api/BookClubData';
import PostForm from './forms/PostForm';
import PostCard from './cards/PostCard';

export default function CommunityPosts({ bookClubId, hostOfClub }) {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getCommunityPosts(bookClubId).then((data) => {
      setPosts(data.posts);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div label="Community Posts">
      <PostForm clubId={bookClubId} onUpdate={getPosts} />
      {posts.length === 0 ? <h1 className="text-1xl font-semibold text-center mb-6">It&apos;s quiet here... Start something exciting by creating the first post!</h1> : posts.map((item) => <PostCard post={item} key={item.id} clubId={bookClubId} onUpdate={getPosts} isHost={hostOfClub} />)}
    </div>
  );
}

CommunityPosts.propTypes = {
  bookClubId: PropTypes.number.isRequired,
  hostOfClub: PropTypes.bool.isRequired,
};
