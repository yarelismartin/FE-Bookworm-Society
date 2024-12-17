'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import getAllBooks from '../../api/BookData';
import { createVotingSession } from '../../api/VotingSessionData';

export default function VotingSessionForm({ bookClubId, modalClose, onUpdate }) {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [error, setError] = useState('');

  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 4);

  const fetchBooks = () => {
    getAllBooks().then((data) => {
      const options = data.map((book) => ({
        value: book.id,
        label: `${book.title} by ${book.author}`,
      }));

      setBooks(options);
    });
  };

  /*   const handleChange = (e) => {
    const { name, value} = e.target;
    setFormInput((prevState) => ({
      ...prevState, 
      [name] : value,
    }))
  } */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedBooks.length < 2) {
      setError('Please select at least two books.');
      return;
    }

    const payload = {
      VotingEndDate: selectedDate,
      BookClubId: bookClubId,
      BookIds: selectedBooks.map((book) => book.value),
    };
    createVotingSession(payload, user.id).then(() => {
      modalClose();
      onUpdate();
    });
  };

  const handleBookSelect = (selections) => {
    if (selections.length > 4) {
      return;
    }
    setSelectedBooks(selections);
    if (selections.length >= 2) {
      setError(''); // Clear error when valid selection is made
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <Select isMulti isSearchable options={books} onChange={handleBookSelect} value={selectedBooks} placeholder="Choose books..." required className="w-full rounded-md p-2" />
      </div>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      <div className="max-w-sm mx-auto rounded-lg mt-4">
        <h3 className="text-sm font-thin mb-4">Please choose a date between tomorrow and up to four days from today for the voting session to end.</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={tomorrow} // Disable dates before today
          maxDate={maxDate} // Disable dates beyond 4 days from today
          required
          placeholderText="Select a date"
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-thin"
        />
      </div>

      <button type="submit" className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Submit
      </button>
    </form>
  );
}

VotingSessionForm.propTypes = {
  bookClubId: PropTypes.number.isRequired,
  modalClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
