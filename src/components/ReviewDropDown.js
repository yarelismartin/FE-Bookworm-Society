import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function ReviewDropDown({ onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = () => {
    onDelete(); // Pass the delete action up
    setIsOpen(false); // Close dropdown after delete
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Space or Enter key
      toggleDropdown();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0} // Make it focusable
        role="button"
        className="ellipsis"
        onClick={toggleDropdown} // Handle click
        onKeyDown={handleKeyDown} // Handle keyboard events
        aria-label="Toggle dropdown menu"
      >
        ...
      </div>
      {isOpen && (
        <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow cursor-pointer">
          <li>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

ReviewDropDown.propTypes = {
  onDelete: PropTypes.func.isRequired, // onDelete must be a function
};
