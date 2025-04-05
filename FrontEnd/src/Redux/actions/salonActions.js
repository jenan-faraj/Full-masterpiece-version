// actions/salonActions.js

import axios from 'axios';

// Fetch salon data
export const FETCH_SALON_REQUEST = 'FETCH_SALON_REQUEST';
export const FETCH_SALON_SUCCESS = 'FETCH_SALON_SUCCESS';
export const FETCH_SALON_FAILURE = 'FETCH_SALON_FAILURE';

export const fetchSalon = (id) => async (dispatch) => {
  dispatch({ type: FETCH_SALON_REQUEST });
  try {
    const response = await axios.get(`http://localhost:3000/api/salons/${id}`);
    dispatch({
      type: FETCH_SALON_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SALON_FAILURE,
      payload: error,
    });
  }
};

// Update salon services
export const UPDATE_SALON_SERVICES_REQUEST = 'UPDATE_SALON_SERVICES_REQUEST';
export const UPDATE_SALON_SERVICES_SUCCESS = 'UPDATE_SALON_SERVICES_SUCCESS';
export const UPDATE_SALON_SERVICES_FAILURE = 'UPDATE_SALON_SERVICES_FAILURE';

export const updateSalonServices = (salonId, updatedServices) => async (dispatch) => {
  dispatch({ type: UPDATE_SALON_SERVICES_REQUEST });
  try {
    const response = await axios.put(
      `http://localhost:3000/api/salons/${salonId}`,
      { services: updatedServices }
    );
    dispatch({
      type: UPDATE_SALON_SERVICES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SALON_SERVICES_FAILURE,
      payload: error,
    });
  }
};
