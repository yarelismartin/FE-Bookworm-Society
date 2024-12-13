import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleBookClub = (bookClubId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bookclubs/${bookClubId}?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createBookClub = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bookclubs`, {
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

const updateBookClub = (payload, bookClubId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bookclubs/${bookClubId}`, {
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

const getBookClubsHaveRead = (bookClubId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bookclubs/${bookClubId}/have-read`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const addUserToClub = (bookClubId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bookclubs/${bookClubId}/add-user/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const removeUserFromClub = (bookClubId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bookclubs/${bookClubId}/remove-user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deletBookClub = (bookClubId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bookclubs/${bookClubId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const getCommunityPosts = (bookClubId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bookclubs/${bookClubId}/community-posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { updateBookClub, createBookClub, getSingleBookClub, getBookClubsHaveRead, addUserToClub, removeUserFromClub, deletBookClub, getCommunityPosts };
