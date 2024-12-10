import React from 'react';
import PropTypes from 'prop-types';
import BookClubTabs from '../../../components/BookClubTabs';
import HaveRead from '../../../components/HaveRead';
import BookClubDetails from '../../../components/BookClubDetails';

export default function BookClub({ params }) {
  const { bookclubId } = params;

  return (
    <div className="container mt-5">
      <BookClubTabs>
        <BookClubDetails key="Book Club Hub" label="Book Club Hub" bookClubId={bookclubId} />
        <HaveRead label="Have Read" key="Have Read" bookClubId={bookclubId} />
      </BookClubTabs>
    </div>
  );
}

BookClub.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
