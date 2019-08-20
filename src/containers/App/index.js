import githubLogo from "./github-logo.png";
import NoSelectedRepo from "../../components/NoSelectedRepo";
import React, { createContext, useCallback, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import RepoList from "../../components/RepoList";
import SelectedRepo from "../../components/SelectedRepo";
import { LAMBDA_API_URL } from "./constants";
import { finishLoading, setRepos, startLoading } from "./actions";
import { ContentWrapper, GitHubLink, Wrapper } from "./styles";

export const AppDispatch = createContext(null);

export default function App() {
  const [
    { isLoading, lastSeenRepo, repos, selectedRepo },
    dispatch
  ] = useReducer(reducer, initialState);

  const loadRepos = useCallback(async () => {
    dispatch(startLoading());

    const options = lastSeenRepo ? `?since=${lastSeenRepo}` : "";
    const response = await fetch(`${LAMBDA_API_URL}/repos${options}`);
    const json = await response.json();
    const { data, next: nextLastSeenRepo } = JSON.parse(json);

    dispatch(finishLoading(nextLastSeenRepo));
    return data;
  }, [lastSeenRepo]);

  const loadNextPage = useCallback(async () => {
    const nextRepos = await loadRepos();
    dispatch(setRepos([...repos, ...nextRepos]));
  }, [loadRepos, repos]);

  return (
    <AppDispatch.Provider value={dispatch}>
      <Wrapper>
        <GitHubLink href="https://github.com/berberi/github-demo">
          <img src={githubLogo} alt="GitHub" />
        </GitHubLink>
        <RepoList
          hasNextPage={typeof lastSeenRepo === "number"}
          isNextPageLoading={isLoading}
          loadNextPage={loadNextPage}
          repos={repos}
          selectedRepo={selectedRepo}
        />
        <ContentWrapper>
          {typeof selectedRepo === "number" ? (
            <SelectedRepo repo={repos[selectedRepo]} />
          ) : (
            <NoSelectedRepo />
          )}
        </ContentWrapper>
      </Wrapper>
    </AppDispatch.Provider>
  );
}
