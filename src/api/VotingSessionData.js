import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getActiveVotingSession = (bookClubId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/votingsessions/bookclubs/${bookClubId}?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // Handle HTTP response codes
        if (!response.ok) {
          return response.json().then((errorData) => {
            reject(new Error(errorData.message || `HTTP error! Status: ${response.status}`));
          });
        }
        return response.json(); // Parse the response JSON
      })
      .then(resolve) // Pass the parsed data to resolve
      .catch((error) => {
        reject(new Error(error.message || 'An unexpected error occurred'));
      });
  });

const createVotingSession = (payload, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/votingsessions?userId=${userId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then(resolve)
      .catch(reject);
  });

const createVote = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/votes`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then(resolve)
      .catch(reject);
  });

export { getActiveVotingSession, createVotingSession, createVote };
