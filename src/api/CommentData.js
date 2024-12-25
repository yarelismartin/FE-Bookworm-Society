import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createAComment = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

const deleteComment = (commentId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { createAComment, deleteComment };
