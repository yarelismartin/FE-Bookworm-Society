import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSinglePost = (postId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createAPost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts`, {
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

const updatePost = (payload, postId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deletePost = (postId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getSinglePost, createAPost, updatePost, deletePost };
