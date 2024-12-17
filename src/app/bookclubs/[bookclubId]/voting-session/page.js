import React from 'react';
import PropTypes from 'prop-types';
import VotingSessionForm from '../../../../components/forms/VotingSessionForm';

export default function VotingSessionCreate({ params }) {
  const { bookclubId } = params;
  return (
    <div>
      <VotingSessionForm bookClubId={bookclubId} />
    </div>
  );
}

VotingSessionCreate.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
