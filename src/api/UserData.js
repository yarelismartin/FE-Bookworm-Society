import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleUser = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getUsersClubs = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${userId}/my-clubs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

export { getSingleUser, getUsersClubs };
