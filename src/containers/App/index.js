import React, { createContext, useCallback, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import RepoList from "../../components/RepoList";
import { setIsLoading, setRepos } from "./actions";
import { Wrapper } from "./styles";

export const AppDispatch = createContext(null);

export default function App() {
  const [{ isLoading, repos, selectedRepo }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const loadRepos = useCallback(
    () =>
      new Promise(resolve => {
        dispatch(setIsLoading(true));
        setTimeout(() => {
          dispatch(setIsLoading(false));
          resolve([...new Array(100)].map(() => Math.random()));
        }, 1000);
      }),
    []
  );

  const loadNextPage = useCallback(async () => {
    const nextRepos = await loadRepos();
    dispatch(setRepos([...repos, ...nextRepos]));
  }, [loadRepos, repos, setRepos]);

  return (
    <AppDispatch.Provider value={dispatch}>
      <Wrapper>
        <RepoList
          hasNextPage
          isNextPageLoading={isLoading}
          loadNextPage={loadNextPage}
          repos={repos}
        />
        {selectedRepo && <p>Selected repo: {repos[selectedRepo]}</p>}
      </Wrapper>
    </AppDispatch.Provider>
  );
}
