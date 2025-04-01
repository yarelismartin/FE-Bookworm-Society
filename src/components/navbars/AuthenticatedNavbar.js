/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Arsenal } from 'next/font/google';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { signOut } from '../../utils/auth';
import logo from '../../../public/images/Book Club Logo.png';

const arsenal = Arsenal({ subsets: ['latin'], weight: ['400'] });
export default function AuthenticatedNavbar({ userId, userImage }) {
  return (
    <nav className={`bg-[#497dcb] ${arsenal.className} custom-shadow`}>
      <div className="mx-auto px-4 pl-0 nav-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section: Logo and Navigation */}
          <div className="flex items-center pl-0">
            <Image src={logo} alt="Book Club Logo" width={120} height={50} style={{ width: 'auto', height: 'auto' }} priority />

            <div className=" sm:block ml-4 nav-header">
              <Link href={`/users/${userId}/my-clubs`} className="text-[#ede7e7] px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-700">
                My Clubs
              </Link>
              <Link href="/" className="text-[#ede7e7] px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-700">
                Join Club
              </Link>
              <Link href="/books" className="text-[#ede7e7] px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-700">
                Books
              </Link>
            </div>
          </div>

          {/* Right Section: Profile Dropdown */}
          <div className="relative flex items-center">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src={userImage} />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50">
                <li>
                  <Link href={`/users/${userId}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                </li>

                <li>
                  <button type="button" onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

AuthenticatedNavbar.propTypes = {
  userId: PropTypes.number,
  userImage: PropTypes.string,
};
