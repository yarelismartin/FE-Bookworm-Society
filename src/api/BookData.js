import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllBooks = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getAllBooks;
