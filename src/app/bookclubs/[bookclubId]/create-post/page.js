import React from 'react';
import PropTypes from 'prop-types';
import PostForm from '../../../../components/forms/PostForm';

export default function CreatePost({ params }) {
  const { bookclubId } = params;

  return (
    <div>
      <PostForm bookClubId={bookclubId} />
    </div>
  );
}
CreatePost.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
