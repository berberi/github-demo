import createReducer from "../../utils/createReducer";
import {
  FINISH_LOADING,
  SET_REPOS,
  SET_SELECTED_REPO,
  START_LOADING
} from "./actions";

export const initialState = {
  isLoading: false,
  lastSeenRepo: 0,
  repos: [],
  selectedRepo: null
};

export default createReducer(initialState, {
  [FINISH_LOADING]: (state, { lastSeenRepo }) => ({
    ...state,
    isLoading: false,
    lastSeenRepo
  }),
  [SET_REPOS]: (state, { repos }) => ({ ...state, repos }),
  [SET_SELECTED_REPO]: (state, { selectedRepo }) => ({
    ...state,
    selectedRepo
  }),
  [START_LOADING]: state => ({ ...state, isLoading: true })
});
