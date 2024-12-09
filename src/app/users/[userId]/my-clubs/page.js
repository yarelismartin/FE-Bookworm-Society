'use client';

import { useParams, useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getUsersClubs } from '../../../../api/UserData';
import BookClubCard from '../../../../components/BookClubCard';

export default function MyClubs() {
  const { userId } = useParams();
  const [memberClubs, setMemberClubs] = useState([]);
  const [hostedClubs, setHostedClubs] = useState([]);
  const router = useRouter();

  const getMyClubs = () => {
    getUsersClubs(userId).then((data) => {
      setMemberClubs(data.memberBookClubs);
      setHostedClubs(data.hostedBookClubs);
    });
  };

  useEffect(() => {
    getMyClubs();
  }, [userId]);

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={() => router.push(`/bookclubs/add-bookclub`)}>
        Create BooK Club
      </button>

      {memberClubs?.map((club) => (
        <BookClubCard bookClubObj={club} key={club.id} showDeleteButton={false} />
      ))}
      {hostedClubs?.map((club) => (
        <BookClubCard bookClubObj={club} key={club.id} showDeleteButton />
      ))}
    </div>
  );
}
