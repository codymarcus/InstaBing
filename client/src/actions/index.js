import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_IMAGES,
  FETCHING_IMAGES,
  SELECT_USER,
  CLEAR_USER,
  UPDATE_COMMENT
} from './types';

const ROOT_URL = 'http://localhost:3090';
const BING_KEY = 'XOVTQI/S4ig8Xe+UySvWMkH39mtSkjqdEt9gQBYm3mk';

// Sign in the user
export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      // If response is good authenticate user in state
      .then(response => dispatch(authUser(response.data.token)))
      // If response is bad show an error
      .catch(() => dispatch(authError('Bad Login Info')));
  };
}

// Signs up the user
export function signupUser({ email, password, username }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password, username })
      // If response is good authenticate user in state
      .then(response => dispatch(authUser(response.data.token)))
      // If response is bad show error from server
      .catch(response => dispatch(authError(response.data.error)));
  };
}

// Helper for authenticating the user
function authUser(token) {
  return function(dispatch) {
    // Decode the JWT
    const decodedToken = jwtDecode(token);
    // Update state to indicate user is authenticated
    dispatch({
      type: AUTH_USER,
      id: decodedToken.sub,
      username: decodedToken.name
    });
    // Save the JWT token in local storage
    localStorage.setItem('token', token);
    // Redirect to the route '/feature'
    browserHistory.push('/');
  };
}

// Authentication error
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

// Sign out the user
export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

// Waiting on images from some async call
function fetchingImages() {
  return {
    type: FETCHING_IMAGES
  };
}

// Fetch images from API
export function fetchImages(userId = null) {
  return function(dispatch) {
    dispatch(fetchingImages());

    const url = `${ROOT_URL}/images` + (userId ? `?user_id=${userId}` : '');

    axios.get(url)
      .then(response => dispatch({
        type: FETCH_IMAGES,
        payload: response.data
      }));
  };
}

// Get user information from API
export function selectUser(userId) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/users/?id=${userId}`)
      .then(response => dispatch({
        type: SELECT_USER,
        id: userId,
        username: response.data.username
      }));
  };
}

// Clear user information from store
export function clearUser() {
  return {
    type: CLEAR_USER
  };
}

// Search images using Bing search API
export function searchImages(query) {
  return function(dispatch) {
    dispatch(fetchingImages());

    axios.get(`https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27${query}%27&$format=json&$top=25`,
      { auth: { password: BING_KEY }}
    )
      .then(response => {
        const results = response.data.d.results;
        const formattedArray = [];

        for (let result of results) {
          formattedArray.push({ url: result.MediaUrl });
        }

        dispatch({
          type: FETCH_IMAGES,
          payload: formattedArray
        });
      });
  };
}

// Clear images from store
export function clearImages() {
  return {
    type: FETCH_IMAGES,
    payload: []
  };
}

// Request to save an image to the authenticated user's profile on the API
export function saveImage(url) {
  return function() {
    axios.post(`${ROOT_URL}/images/save`, { url }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(window.alert('Image added!'));
  };
}

// Request to update an image's comment on the API
export function saveComment(imageId, comment) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/images/update_comment`, { imageId, comment }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(dispatch({
        type: UPDATE_COMMENT,
        imageId,
        comment
      }));
  };
}
