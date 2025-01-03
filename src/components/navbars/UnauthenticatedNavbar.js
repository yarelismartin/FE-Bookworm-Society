/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Arsenal } from 'next/font/google';
import Image from 'next/image';
import { signOut } from '../../utils/auth';
import logo from '../../../public/images/Book Club Logo.png';

const arsenal = Arsenal({ subsets: ['latin'], weight: ['400'] });
export default function UnauthenticatedNavbar() {
  return (
    <nav className={`bg-[#497dcb] ${arsenal.className} custom-shadow nav-responsive`}>
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section: Logo and Navigation */}
          <div className="flex items-center">
            <Image src={logo} alt="Book Club Logo" width={120} height={50} style={{ width: 'auto', height: 'auto' }} priority />
          </div>

          {/* Right Section: Profile Dropdown */}
          <div className="relative flex items-center">
            <button type="button" onClick={signOut} className="text-[#ede7e7] px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
