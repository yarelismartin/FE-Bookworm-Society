'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookClubTabs from '../../../components/BookClubTabs';
import HaveRead from '../../../components/HaveRead';
import BookClubDetails from '../../../components/BookClubDetails';
import CommunityPosts from './community-posts/page';
import VotingSession from '../../../components/VotingSession';

export default function BookClub({ params }) {
  const { bookclubId } = params;
  const [isMemberOrHost, setIsMemberOrHost] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const handleMembershipStatusChange = (status) => {
    setIsMemberOrHost(status);
  };

  return (
    <div className="container mt-5 ">
      <BookClubTabs>
        <BookClubDetails key="Book Club Hub" label="Book Club Hub" bookClubId={bookclubId} onMembershipStatusChange={handleMembershipStatusChange} updateHostStatus={setIsHost} />
        <HaveRead label="Have Read" key="Have Read" bookClubId={bookclubId} />
        {isMemberOrHost && <CommunityPosts bookClubId={bookclubId} label="Community Posts" />}
        <VotingSession label="Voting Session" key="Voting Session" bookClubId={bookclubId} hostOfClub={isHost} />
      </BookClubTabs>
    </div>
  );
}

BookClub.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
