'use clinet';

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../utils/auth';

export default function RegistrationForm({ user, updateUser }) {
  const [previewUrl, setPreviewUrl] = useState('');
  const router = useRouter();
  const [formInput, setFormInput] = useState({
    firstName: '',
    lastName: '',
    imageUrl: '',
    username: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
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
  // 5. handle submit so that we can call our create and update endpoints
  // prevent default ????
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ ...formInput, uid: user.uid }).then(() => updateUser(user.uid).then(router.push('/')));
  };

  // 6. useEffect so that if the userObj.id == true then we showcase the inputs
  useEffect(() => {}, []);

  // 8. Need proptypes section

  return (
    <form className="container my-5" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Set Up Your Account</h2>
          {/* Image URL */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="photo-url" className="block text-sm/6 font-medium text-gray-900">
                Profile Picture URL
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {/* Avatar Preview */}
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
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
            {/* Username */}
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">@</div>
                  <input id="username" name="username" value={formInput.username} type="text" required placeholder="janesmith" onChange={handleChange} className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" />
                </div>
              </div>
            </div>
            {/* First Name */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input name="firstName" type="text" required value={formInput.firstName} onChange={handleChange} autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>
            {/* Last Name */}
            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input name="lastName" value={formInput.lastName} type="text" required onChange={handleChange} autoComplete="family-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
  );
}

RegistrationForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
  updateUser: PropTypes.func,
};
