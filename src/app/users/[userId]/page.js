/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import getSingleUser from '../../../api/UserData';

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
    <div className="p-6 bg-gray-100 min-h-screen container">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="col-span-1 flex flex-col items-center">
          <img src={user.imageUrl} alt="Profile" className="rounded-full w-32 h-32 mb-4 shadow-md" />
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.username}</p>
          <p className="text-sm text-gray-500 mt-2">Joined On: {user.joinedDate ? format(new Date(user.joinedDate), 'MMM d, yyyy') : 'N/A'}</p>
          <button type="button" className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Save
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">My Clubs</h3>
          </div>

          <hr className="border-gray-200 mb-4" />

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-700">bookclub1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
