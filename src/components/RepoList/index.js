import React, { useCallback, useEffect, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import LoadingIndicator from "../LoadingIndicator";
import RepoItem from "../RepoItem";
import { FixedSizeList } from "react-window";
import { ListWrapper } from "./styles";

export default function RepoList({
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
  repos,
  repos: { length: repoCount }
}) {
  // one extra item for loading indicator
  const itemCount = repoCount + (hasNextPage ? 1 : 0);

  // rerender on resize since list has static sizes
  const [_, forceUpdate] = useState(null);
  useEffect(() => {
    window.addEventListener("resize", forceUpdate);
  }, []);

  const loadMoreItems = useCallback(
    () => (isNextPageLoading ? undefined : loadNextPage()),
    [isNextPageLoading, loadNextPage]
  );

  const isItemLoaded = useCallback(index => index < repoCount, [repoCount]);

  const renderItem = useCallback(
    ({ index, style }) => {
      const repo = repos[index];
      if (!repo) return <LoadingIndicator style={style} />;

      return (
        <RepoItem index={index} style={style}>
          {repo.full_name}
        </RepoItem>
      );
    },
    [repos]
  );

  const wrapperRef = React.useRef(null);

  const renderList = useCallback(
    listProps => {
      const { clientHeight = 0, clientWidth = 0 } = wrapperRef.current || {};
      return (
        <FixedSizeList
          height={clientHeight}
          itemCount={itemCount}
          itemSize={40}
          width={clientWidth}
          style={{ overflowX: "hidden" }}
          {...listProps}
        >
          {renderItem}
        </FixedSizeList>
      );
    },
    [
      itemCount,
      renderItem,
      // ensure list rerenders when size changes
      wrapperRef.current && wrapperRef.current.clientHeight,
      wrapperRef.current && wrapperRef.current.clientWidth
    ]
  );

  return (
    <ListWrapper ref={wrapperRef}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {renderList}
      </InfiniteLoader>
    </ListWrapper>
  );
}
