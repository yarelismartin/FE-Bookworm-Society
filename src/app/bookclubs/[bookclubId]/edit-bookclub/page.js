/* eslint-disable react-hooks/exhaustive-deps */

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
    });
  };

  useEffect(() => {
    singleBookClub();
  }, [user]);

  return (
    <div>
      <BookClubForm bookClubObj={bookClub} userId={user.id} />
    </div>
  );
}

EditBookClub.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
