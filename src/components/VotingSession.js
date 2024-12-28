/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { getActiveVotingSession } from '../api/VotingSessionData';
import VotingSessionForm from './forms/VotingSessionForm';
import VotingSessionDetail from './VotingSessionDetail';

export default function VotingSession({ bookClubId, hostOfClub }) {
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const [votingSession, setVotingSession] = useState(null);

  const fetchVotingSession = async () => {
    const response = await getActiveVotingSession(bookClubId, user.id);
    if (typeof response === 'string') {
      setVotingSession(null); // Clear voting session data
      setErrorMessage(response); // Use the plain string as the error message
    } else {
      // Assume valid JSON object if not a string
      setVotingSession(response);
      setErrorMessage(null); // Clear errors
    }
  };

  const openModal = () => {
    document.getElementById('my_modal_1').showModal();
  };

  const closeModal = () => {
    document.getElementById('my_modal_1').close();
  };

  useEffect(() => {
    fetchVotingSession();
  }, [user.id]);

  if (errorMessage === 'No active voting session') {
    return (
      <div className="container">
        <h1 className="text-3xl font-semibold text-center mb-6">No active voting session at this time.</h1>
        {hostOfClub && (
          <div className="flex justify-center">
            <button type="button" className="blue-button" onClick={openModal}>
              Stat A Voting Session
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Click Submit to Start this Voting Session!</h3>
                <div className="modal-action">
                  <VotingSessionForm bookClubId={bookClubId} modalClose={closeModal} onUpdate={fetchVotingSession} />
                </div>
              </div>
            </dialog>
          </div>
        )}
      </div>
    );
  }

  if (votingSession) {
    return (
      <div className="w-full max-w-screen-xl mx-auto">
        <p className="text-center font-semibold mb-2">
          Voting ends on: <span className="font-bold">{format(new Date(votingSession.votingEndDate), 'MMM d, yyyy')}</span>
        </p>
        <p className="text-center text-gray-600 mb-6">{votingSession.hasUserVoted ? 'You have already cast your vote. Thank you for participating!' : 'Select your favorite book from the list below and click the heart icon to cast your vote.'}</p>
        <VotingSessionDetail sessionObj={votingSession} hasVoted={votingSession.hasUserVoted} onUpdate={fetchVotingSession} />
      </div>
    );
  }
}

VotingSession.propTypes = {
  bookClubId: PropTypes.number.isRequired,
  hostOfClub: PropTypes.bool.isRequired,
};
