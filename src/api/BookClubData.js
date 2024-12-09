import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createBookClub = (userInfo) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bookclubs`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

export default createBookClub;
