import React, { useState, useCallback } from "react";
import { Wrapper } from "./styles";
import RepoList from "../../components/RepoList";

export default function App() {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const loadRepos = useCallback(
    () =>
      new Promise(resolve => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          resolve([...new Array(100)].map(() => Math.random()));
        }, 1000);
      }),
    [setIsLoading]
  );

  const loadNextPage = useCallback(async () => {
    const nextRepos = await loadRepos();
    setRepos([...repos, ...nextRepos]);
  }, [loadRepos, repos, setRepos]);

  const makeSelectRepo = useCallback(
    index => () => setSelectedRepo(repos[index]),
    [repos, setSelectedRepo]
  );

  return (
    <Wrapper>
      <RepoList
        hasNextPage
        isNextPageLoading={isLoading}
        loadNextPage={loadNextPage}
        makeSelectRepo={makeSelectRepo}
        repos={repos}
      />
      {selectedRepo && <p>Selected repo: {selectedRepo}</p>}
    </Wrapper>
  );
}
