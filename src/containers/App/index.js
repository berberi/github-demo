import React, { createContext, useCallback, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import RepoList from "../../components/RepoList";
import { LAMBDA_API_URL } from "./constants";
import { setIsLoading, setLastSeenRepo, setRepos } from "./actions";
import { Wrapper } from "./styles";

export const AppDispatch = createContext(null);

export default function App() {
  const [
    { isLoading, lastSeenRepo, repos, selectedRepo },
    dispatch
  ] = useReducer(reducer, initialState);

  const loadRepos = useCallback(async () => {
    dispatch(setIsLoading(true));

    const options = lastSeenRepo ? `?since=${lastSeenRepo}` : "";
    const response = await fetch(`${LAMBDA_API_URL}/repos${options}`);
    const json = await response.json();
    const { data, next: nextLastSeenRepo } = JSON.parse(json);

    dispatch(setIsLoading(false));
    dispatch(setLastSeenRepo(nextLastSeenRepo));
    return data;
  }, [lastSeenRepo]);

  const loadNextPage = useCallback(async () => {
    const nextRepos = await loadRepos();
    dispatch(setRepos([...repos, ...nextRepos]));
  }, [loadRepos, repos]);

  return (
    <AppDispatch.Provider value={dispatch}>
      <Wrapper>
        <RepoList
          hasNextPage={typeof lastSeenRepo === "number"}
          isNextPageLoading={isLoading}
          loadNextPage={loadNextPage}
          repos={repos}
        />
        {selectedRepo && <p>Selected repo: {repos[selectedRepo].full_name}</p>}
      </Wrapper>
    </AppDispatch.Provider>
  );
}
