import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createReview = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/reviews`, {
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

const getSingleReview = (reviewId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/reviews/${reviewId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateReview = (reviewId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/reviews/${reviewId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteReview = (reviewId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { createReview, getSingleReview, updateReview, deleteReview };
