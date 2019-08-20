import React, { useCallback, useContext } from "react";
import { setSelectedRepo } from "../../containers/App/actions";
import { AppDispatch } from "../../containers/App";

export default function RepoItem({ children, index, style }) {
  const dispatch = useContext(AppDispatch);

  const selectRepo = useCallback(() => dispatch(setSelectedRepo(index)), [
    index
  ]);

  return (
    <div onClick={selectRepo} style={style}>
      {children}
    </div>
  );
}
