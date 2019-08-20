import React, { useCallback, useEffect } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import RepoItem from "../RepoItem";
import { FixedSizeList } from "react-window";

export default function RepoList({
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
  makeSelectRepo,
  repos,
  repos: { length: repoCount }
}) {
  const itemCount = repoCount + (hasNextPage ? 1 : 0);

  const loadMoreItems = useCallback(
    () => (isNextPageLoading ? undefined : loadNextPage()),
    [isNextPageLoading, loadNextPage]
  );

  const isItemLoaded = useCallback(index => index < repoCount, [repoCount]);

  const renderItem = useCallback(
    ({ index, style }) => (
      <RepoItem index={index} makeSelectRepo={makeSelectRepo} style={style}>
        {repos[index] || "Loading..."}
      </RepoItem>
    ),
    [makeSelectRepo, repos]
  );

  const renderList = useCallback(
    listProps => (
      <FixedSizeList
        height={300}
        itemCount={itemCount}
        itemSize={30}
        width={300}
        {...listProps}
      >
        {renderItem}
      </FixedSizeList>
    ),
    [itemCount, renderItem]
  );

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {renderList}
    </InfiniteLoader>
  );
}
