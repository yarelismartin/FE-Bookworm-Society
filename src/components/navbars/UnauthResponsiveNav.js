import React from 'react';
import { Arsenal } from 'next/font/google';
import Image from 'next/image';
import logo from '../../../public/images/Book Club Logo.png';
import { signOut } from '../../utils/auth';

const arsenal = Arsenal({ subsets: ['latin'], weight: ['400'] });

export default function ResponsiveNavBar() {
  return (
    <div className={`bg-[#497dcb] ${arsenal.className} custom-shadow`}>
      <div className="navbar shadow-sm">
        <div className="navbar-start">
          <Image src={logo} alt="Book Club Logo" width={120} height={50} style={{ width: 'auto', height: 'auto' }} priority />
        </div>
        <div className="navbar-center">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" aria-label="Open menu" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {' '}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />{' '}
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                {' '}
                <button type="button" onClick={signOut}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
