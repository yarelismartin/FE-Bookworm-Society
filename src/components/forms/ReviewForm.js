'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { createReview } from '../../api/ReviewData';
import StarIcon from '../StarIcon';
import 'react-quill/dist/quill.snow.css';

const initialState = {
  content: '',
  rating: 0,
};

function RatingReview({ rating, setRating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          role="button"
          key={star}
          tabIndex={0}
          aria-label={`Rate ${star} stars`}
          style={{
            cursor: 'pointer',
            color: rating >= star ? '#e87400' : '#c2c7cc',
            fontSize: '35px',
          }}
          onClick={() => {
            setRating(star);
            console.log(star);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setRating(star); // Update rating when Enter or Space is pressed
            }
          }}
        >
          <StarIcon className="w-[30px] h-[30px]" />
        </span>
      ))}
    </div>
  );
}

RatingReview.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
};

export default function ReviewForm({ reviewObj, book, user }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const [ratingReview, setRatingReview] = useState(0);
  const [error, setError] = useState('');

  // create api

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the rating is selected
    if (ratingReview === 0) {
      setError('Please select a rating');
      return; // Prevent form submission if no rating is selected
    }

    if (reviewObj?.id) {
      // edit review
    } else {
      createReview({
        ...formInput,
        bookId: book,
        userId: user,
        rating: ratingReview,
      }).then(() => {
        router.push(`/books/${book}`);
      });
    }
  };

  /*   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }; */

  const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
  };

  const formats = ['bold', 'italic', 'underline', 'list', 'bullet'];

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <div className="form-group">
        <div className="flex items-center mt-2">
          <RatingReview rating={ratingReview} setRating={setRatingReview} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <label htmlFor="exampleFormControlTextarea1" className="pt-3 pb-1">
          What did you think? <span className="optional-text">(Optional)</span>
        </label>
        <ReactQuill theme="snow" value={formInput.content} onChange={(value) => setFormInput((prev) => ({ ...prev, content: value }))} modules={modules} formats={formats} placeholder="Write your review here..." />
      </div>
      <div className="mt-6 flex items-center justify-start gap-x-6">
        <button type="submit" className="rounded-md bg-[#497dcb] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4a90c2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#497dcb]">
          Post
        </button>
      </div>
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
