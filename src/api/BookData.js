import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllBooks = (page, pageSize) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books?page=${page}&pageSize=${pageSize}`, {
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
