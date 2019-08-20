import makeActionCreator from "../../utils/makeActionCreator";

export const SET_IS_LOADING = "App/setIsLoading";
export const setIsLoading = makeActionCreator(SET_IS_LOADING, "isLoading");

export const SET_LAST_SEEN_REPO = "App/setLastSeenRepo";
export const setLastSeenRepo = makeActionCreator(
  SET_LAST_SEEN_REPO,
  "lastSeenRepo"
);

export const SET_REPOS = "App/setRepos";
export const setRepos = makeActionCreator(SET_REPOS, "repos");

export const SET_SELECTED_REPO = "App/setSelectedRepo";
export const setSelectedRepo = makeActionCreator(
  SET_SELECTED_REPO,
  "selectedRepo"
);
