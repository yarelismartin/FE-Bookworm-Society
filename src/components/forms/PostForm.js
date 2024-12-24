'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { createAPost, updatePost } from '../../api/PostData';

const initialState = {
  content: '',
};

export default function PostForm({ postObj = initialState, clubId, onUpdate, modalClose }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formInput.content.trim()) {
      alert('Please fill out this field.');
      return;
    }
    if (postObj?.id) {
      const updatePayload = { content: formInput.content };
      updatePost(updatePayload, postObj.id).then(() => {
        console.warn('updated', updatePayload, postObj.id);
        modalClose();
        onUpdate();
      });
    } else {
      const payload = { ...formInput, bookclubId: clubId, userId: user.id };
      createAPost(payload).then(() => {
        console.warn('created', { ...formInput, bookclubId: clubId, userId: user.id });
        setFormInput(initialState);
        onUpdate();
      });
    }
  };

  useEffect(() => {
    if (postObj.id) {
      setFormInput(postObj);
      console.warn('true');
    } else {
      setFormInput(initialState);
    }
  }, [postObj]);

  return (
    <form onSubmit={handleSubmit}>
      <textarea placeholder="Add post here..." onChange={handleChange} name="content" rows={3} required value={formInput.content} className="textarea textarea-bordered textarea-lg w-full max-w-xs" />
      <input type="submit" value="Post" className="btn" />
    </form>
  );
}

// content
// bookclub id
// user id

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
  }),
  clubId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func,
  modalClose: PropTypes.func.isRequired,
};
