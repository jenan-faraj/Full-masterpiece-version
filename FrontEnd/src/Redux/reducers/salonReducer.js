// reducers/salonReducer.js

import {
    FETCH_SALON_REQUEST,
    FETCH_SALON_SUCCESS,
    FETCH_SALON_FAILURE,
    UPDATE_SALON_SERVICES_REQUEST,
    UPDATE_SALON_SERVICES_SUCCESS,
    UPDATE_SALON_SERVICES_FAILURE,
  } from '../actions/salonActions';
  
  const initialState = {
    salon: null,
    loading: false,
    error: null,
  };
  
  const salonReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SALON_REQUEST:
      case UPDATE_SALON_SERVICES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_SALON_SUCCESS:
        return { ...state, loading: false, salon: action.payload };
      case FETCH_SALON_FAILURE:
      case UPDATE_SALON_SERVICES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case UPDATE_SALON_SERVICES_SUCCESS:
        return {
          ...state,
          loading: false,
          salon: { ...state.salon, services: action.payload.services },
        };
      default:
        return state;
    }
  };
  
  export default salonReducer;
  