/* eslint-disable jsx-a11y/control-has-associated-label */

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
        modalClose();
        onUpdate();
      });
    } else {
      const payload = { ...formInput, bookclubId: clubId, userId: user.id };
      createAPost(payload).then(() => {
        setFormInput(initialState);
        onUpdate();
      });
    }
  };

  useEffect(() => {
    if (postObj.id) {
      setFormInput(postObj);
    } else {
      setFormInput(initialState);
    }
  }, [postObj]);

  return (
    <div className="flex items-center justify-center mb-4">
      <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg shadow-md p-3 w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
        <div className="flex items-start space-x-4">
          {/* User Avatar */}
          {/* Textarea for Post */}
          <textarea placeholder="Share your thoughts..." onChange={handleChange} name="content" rows={3} required value={formInput.content} className="flex-grow bg-gray-100 p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none lora-font" />
        </div>
        {/* Buttons for Adding Media and Submitting */}
        <div className="flex items-center mt-2 justify-end">
          <input type="submit" value="Post" className="btn form-btn" />
        </div>
      </form>
    </div>
  );
}
/* <form onSubmit={handleSubmit}>
      <textarea placeholder="Add post here..." onChange={handleChange} name="content" rows={3} required value={formInput.content} className="textarea textarea-bordered textarea-lg w-full max-w-xs" />
      <input type="submit" value="Post" className="btn" />
    </form> */
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
