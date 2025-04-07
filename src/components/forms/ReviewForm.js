'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { createReview } from '../../api/ReviewData';

const initialState = {
  content: '',
  rating: 0,
};

export default function ReviewForm({ reviewObj, book, user }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  // create api

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewObj?.id) {
      // edit revoew
    } else {
      createReview({ ...formInput, bookId: book, userId: user, rating: 4 }).then(() => {
        router.push(`/books/${book}`);
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Content</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} name="content" value={formInput.content} onChange={handleChange} />
      </div>
      <button type="submit">submit</button>
    </form>
  );
}

ReviewForm.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
  }),
  book: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
};
