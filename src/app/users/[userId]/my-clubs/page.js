'use client';

import { useParams, useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getUsersClubs } from '../../../../api/UserData';
import BookClubCard from '../../../../components/BookClubCard';

export default function MyClubs() {
  const { userId } = useParams();
  const [bookClubs, setBookClubs] = useState({ members: [], hosts: [] });
  const router = useRouter();

  const getMyClubs = () => {
    getUsersClubs(userId).then((data) => {
      setBookClubs({
        members: data.memberBookClubs || [],
        hosts: data.hostedBookClubs || [],
      });
    });
  };

  useEffect(() => {
    getMyClubs();
  }, [userId]);

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={() => router.push(`/bookclubs/add-bookclub`)}>
        Create Book Club
      </button>

      <h3>Clubs You Are a Member Of</h3>
      {bookClubs.members.length > 0 ? (
        bookClubs.members.map((club) => (
          <BookClubCard
            bookClubObj={club}
            key={club.id}
            showDeleteButton={false}
            onUpdate={getMyClubs} // Pass refresh handler
          />
        ))
      ) : (
        <p>You are not a member of any clubs.</p>
      )}

      <h3>Clubs You Are Hosting</h3>
      {bookClubs.hosts.length > 0 ? (
        bookClubs.hosts.map((club) => (
          <BookClubCard
            bookClubObj={club}
            key={club.id}
            showDeleteButton
            onUpdate={getMyClubs} // Pass refresh handler
          />
        ))
      ) : (
        <p>You are not hosting any clubs.</p>
      )}
    </div>
  );
}
