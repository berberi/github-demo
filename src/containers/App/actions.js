import makeActionCreator from "../../utils/makeActionCreator";

export const START_LOADING = "App/startLoading";
export const startLoading = makeActionCreator(START_LOADING);

export const FINISH_LOADING = "App/finishLoading";
export const finishLoading = makeActionCreator(FINISH_LOADING, "lastSeenRepo");

export const SET_REPOS = "App/setRepos";
export const setRepos = makeActionCreator(SET_REPOS, "repos");

export const SET_SELECTED_REPO = "App/setSelectedRepo";
export const setSelectedRepo = makeActionCreator(
  SET_SELECTED_REPO,
  "selectedRepo"
);
