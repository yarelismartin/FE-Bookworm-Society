'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { createBookClub, updateBookClub } from '../../api/BookClubData';

const initialState = {
  name: '',
  meetUpType: '',
  description: '',
  imageUrl: '',
  hostId: 0,
};

export default function BookClubForm({ bookClubObj }) {
  const [previewUrl, setPreviewUrl] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value, // Updates meetUpType for radio buttons
    }));
  };

  function handleImageUrlChange(e) {
    const { value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      imageUrl: value,
    }));
    // Update preview only if the input has a valid image-like URL pattern
    if (value.match(/\.(jpeg|jpg|png|gif|webp)(\?.*)?$/i)) {
      setPreviewUrl(value);
    } else {
      setPreviewUrl(''); // Clear preview for invalid inputs
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookClubObj?.id) {
      if (formInput.hostId !== bookClubObj.host?.id) {
        const confirmChange = window.confirm('Are you sure you no longer want to be the host of this club? This decision cannot be reversed.');
        if (!confirmChange) return;
      }
      updateBookClub(formInput, bookClubObj.id).then(() => {
        router.push(`/users/${user.id}/my-clubs`);
      });
    } else {
      createBookClub({ ...formInput, hostId: user.id }).then(() => {
        router.push(`/users/${user.id}/my-clubs`);
        console.warn({ ...formInput, hostId: user.id });
      });
    }
  };

  useEffect(() => {
    if (bookClubObj?.id) {
      setFormInput({ ...bookClubObj, hostId: bookClubObj.host?.id });
    } else {
      setFormInput(initialState);
    }
  }, [bookClubObj]);

  return (
    <form className="container my-5" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">{bookClubObj?.id ? 'Update Your Book Club' : 'Create a Book Club'}</h2>
          {/* Image URL */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="photo-url" className="block text-sm/6 font-medium text-gray-900">
                Book Club Picture URL
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {/* Image Preview */}
                <div className="avatar">
                  <div className="relative w-16 h-16 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 shadow-sm">
                    <img src={previewUrl || '/images/default-user.jpg'} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Input for Image URL */}
                <input type="text" id="photo-url" name="imageUrl" value={formInput.imageUrl} onChange={handleImageUrlChange} required placeholder="Enter image URL" className="block w-full max-w-sm rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* book club name */}
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Book Club Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input id="name" name="name" value={formInput.name} type="text" required placeholder="Enter a name for your book club!" onChange={handleChange} className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" />
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea name="description" value={formInput.description} rows={3} required onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about this book club.</p>
            </div>
            {bookClubObj?.id && (
              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                  Book Club Host
                </label>
                <p className="mt-1 text-sm/6 text-gray-600">If you select to give over this club to someone else then you will lose access to this bookclub.</p>

                <div className="mt-2 grid grid-cols-1">
                  <select name="hostId" onChange={handleChange} value={formInput.hostId} autoComplete="host-name" required className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    {/* Current Host Option */}
                    <option key={bookClubObj.host?.id} value={bookClubObj.host?.id}>
                      {bookClubObj.host?.username}{' '}
                    </option>
                    {/* Member Options */}
                    {bookClubObj.members?.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.username}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <fieldset>
        <legend className="text-sm/6 font-semibold text-gray-900">Meet Up Type</legend>
        <p className="mt-1 text-sm/6 text-gray-600">This is the preferred way that your club will meet.</p>
        <div className="mt-6 space-y-6">
          {/* Online */}
          <div className="flex items-center gap-x-3">
            <input id="meet-up-online" name="meetUpType" value="Online" type="radio" checked={formInput.meetUpType === 'Online'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="meet-up-online" className="block text-sm/6 font-medium text-gray-900">
              Online
            </label>
          </div>

          {/* In-Person */}
          <div className="flex items-center gap-x-3">
            <input id="meet-up-in-person" name="meetUpType" value="In-Person" type="radio" required checked={formInput.meetUpType === 'In-Person'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="meet-up-in-person" className="block text-sm/6 font-medium text-gray-900">
              In-Person
            </label>
          </div>

          {/* Hybrid */}
          <div className="flex items-center gap-x-3">
            <input id="meet-up-hybrid" name="meetUpType" value="Hybrid" type="radio" checked={formInput.meetUpType === 'Hybrid'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="meet-up-hybrid" className="block text-sm/6 font-medium text-gray-900">
              Hybrid
            </label>
          </div>
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
  );
}

BookClubForm.propTypes = {
  bookClubObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    meetUpType: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    hostId: PropTypes.number,
    host: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
    members: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
      }),
    ),
  }),
};
/* When the user is creating the club they will be the host. 
But when we edit then they should be a drop down that shows that garbs all the members in that club so the user can select another host if they want. we want to make sure to incude the host nam in that drop down too though */
