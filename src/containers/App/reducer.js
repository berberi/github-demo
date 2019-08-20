import createReducer from "../../utils/createReducer";
import {
  SET_IS_LOADING,
  SET_LAST_SEEN_REPO,
  SET_REPOS,
  SET_SELECTED_REPO
} from "./actions";

export const initialState = {
  isLoading: false,
  lastSeenRepo: 0,
  repos: [],
  selectedRepo: null
};

const makeSetStateKey = key => (state, { [key]: value }) => ({
  ...state,
  [key]: value
});

export default createReducer(initialState, {
  [SET_IS_LOADING]: makeSetStateKey("isLoading"),
  [SET_LAST_SEEN_REPO]: makeSetStateKey("lastSeenRepo"),
  [SET_REPOS]: makeSetStateKey("repos"),
  [SET_SELECTED_REPO]: makeSetStateKey("selectedRepo")
});
