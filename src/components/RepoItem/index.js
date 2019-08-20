import React, { useMemo } from "react";

export default function RepoItem({ children, index, makeSelectRepo, style }) {
  const selectRepo = useMemo(() => makeSelectRepo(index), [
    index,
    makeSelectRepo
  ]);

  return (
    <div onClick={selectRepo} style={style}>
      {children}
    </div>
  );
}
