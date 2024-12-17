/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getSingleUser } from '../../../api/UserData';

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  const displaySingleUser = () => {
    getSingleUser(userId).then(setUser);
  };

  useEffect(() => {
    displaySingleUser();
  }, []);

  return (
    <div className="p-6 container">
      <div className=" bg-white rounded-lg shadow-md p-4  w-full max-w-md mx-auto">
        {/* Profile Section */}
        <div className="col-span-1 flex flex-col items-center">
          <div className="w-32 h-32 mb-4 shadow-md overflow-hidden rounded-md">
            <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.username}</p>
          <p className="text-sm text-gray-500 mt-2">Joined: {user.joinedDate ? format(new Date(user.joinedDate), 'MMM d, yyyy') : 'N/A'}</p>
          {/*  <button type="button" className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Save
          </button> */}
        </div>
      </div>
    </div>
  );
}
