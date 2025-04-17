import React from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import PropTypes from 'prop-types';

export default function Pagination({ activePage, setActivePage, totalPages }) {
  const getItemProps = (index) => ({
    variant: activePage === index ? 'filled' : 'text',
    color: 'gray',
    onClick: () => setActivePage(index),
  });

  const next = () => {
    if (activePage === totalPages) return;
    setActivePage(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;
    setActivePage(activePage - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button variant="text" className="flex items-center gap-2" onClick={prev} disabled={activePage === 1}>
        ◀ Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <IconButton key={num} {...getItemProps(num)}>
            {num}
          </IconButton>
        ))}
      </div>

      <Button variant="text" className="flex items-center gap-2" onClick={next} disabled={activePage === totalPages}>
        Next ▶
      </Button>
    </div>
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
