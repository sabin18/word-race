import { HOME_PAGE, NO_PAGE_FALSE } from './types';

export const resetPageAction = () => async (dispatch) => {
  dispatch({ type: HOME_PAGE });
};

export const cancelResetPageAction = () => async (dispatch) => {
  dispatch({ type: NO_PAGE_FALSE });
};
