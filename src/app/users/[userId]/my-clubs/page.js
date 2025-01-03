/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useParams } from 'next/navigation';
// import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUsersClubs } from '../../../../api/UserData';
import BookClubCard from '../../../../components/cards/BookClubCard';

export default function MyClubs() {
  const { userId } = useParams();
  const [bookClubs, setBookClubs] = useState({ members: [], hosts: [] });

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
    <div className="container mx-auto pt-4 pb-5">
      <div className="flex justify-center mb-4">
        <Link href="/bookclubs/add-bookclub" className="blue-button">
          Create Book Club
        </Link>
      </div>

      <h3 className="text-center text-xl font-semibold mb-4">Clubs You Are Hosting</h3>
      <div className="flex flex-wrap flex-row gap-2 justify-center">{bookClubs.hosts.length > 0 ? bookClubs.hosts.map((club) => <BookClubCard bookClubObj={club} key={club.id} showDeleteButton onUpdate={getMyClubs} showImage={false} />) : <p className="text-center w-full">You are not hosting any clubs.</p>}</div>

      <h3 className="text-center text-xl font-semibold mb-4 mt-3">Clubs You Are a Member Of</h3>
      <div className="flex flex-wrap flex-row gap-2 justify-center">{bookClubs.members.length > 0 ? bookClubs.members.map((club) => <BookClubCard bookClubObj={club} key={club.id} showDeleteButton={false} onUpdate={getMyClubs} showImage={false} />) : <p className="text-center w-full">You are not a member of any clubs.</p>}</div>
    </div>
  );
}
