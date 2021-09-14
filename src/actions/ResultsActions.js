import { GET_ALL_RESULTS_SUCCESS, GET_ALL_RESULTS_ERROR, ADD_RESULTS_SUCCESS, ADD_RESULTS_ERROR} from './types';
import backendCall from './backendCall';
import responseComponent from './responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const GetAllResults = () => async (dispatch) => {
  try {
    const res = await backendCall.get('/results');
    const response = res.data;
    console.log("action===>",response);
    dispatch(businessType(GET_ALL_RESULTS_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(GET_ALL_RESULTS_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const AddNewResults = ({score,level}) => async (dispatch) => {
  try {
    // console.log('====>',resultData)
    const res = await backendCall.post('/results/', {score,level});
    const response = res.data;
    dispatch(businessType(ADD_RESULTS_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(ADD_RESULTS_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};


export default { GetAllResults, AddNewResults };
