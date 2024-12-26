'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

/* import { useAuth } from '@/utils/context/authContext';
 */ import { useEffect, useState } from 'react';
import BookClubCard from '../components/cards/BookClubCard';
import { getAllBookClubs } from '../api/BookClubData';

function Home() {
  const [clubs, setClubs] = useState([]);

  const getClubs = () => {
    getAllBookClubs().then((data) => {
      setClubs(data);
      console.warn(data);
    });
  };

  useEffect(() => {
    getClubs();
  }, []);

  return (
    <div className="container flex flex-wrap justify-center items-center mx-auto pt-4 pb-5 gap-4">
      {clubs.map((club) => (
        <BookClubCard key={club.id} bookClubObj={club} showDeleteButton={false} onUpdate={getClubs} showImage />
      ))}
    </div>
  );
}

export default Home;
