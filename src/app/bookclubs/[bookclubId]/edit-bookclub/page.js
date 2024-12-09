'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import BookClubForm from '../../../../components/forms/BookClubForm';
import { getSingleBookClub } from '../../../../api/BookClubData';

export default function EditBookClub({ params }) {
  const [bookClub, setBookClub] = useState({});
  const { bookclubId } = params;
  const { user } = useAuth();

  const singleBookClub = () => {
    getSingleBookClub(bookclubId, user.id).then((data) => {
      setBookClub(data);
      console.warn(data);
    });
  };

  useEffect(() => {
    singleBookClub();
  }, [user]);

  return (
    <div>
      <BookClubForm bookClubObj={bookClub} />
    </div>
  );
}

EditBookClub.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
