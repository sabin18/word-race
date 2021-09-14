import { GET_ALL_RESULTS_SUCCESS, GET_ALL_RESULTS_ERROR, ADD_RESULTS_SUCCESS, ADD_RESULTS_ERROR } from '../actions/types';

const initialState = {
  results: null,
  resultsError: null,
  addResults: null,
  addResultsError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.payload,
        resultsError: null,
        status: 'Success',
      };
    case GET_ALL_RESULTS_ERROR:
      return {
        ...state,
        results: null,
        resultsError: action.payload,
        status: 'Failure',
      };
    case ADD_RESULTS_SUCCESS:
      return {
        ...state,
        addResults: action.payload,
        addResultsError: null,
        status: 'Success',
      };
    case ADD_RESULTS_ERROR:
      return {
        ...state,
        addResults: null,
        addResultsError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
