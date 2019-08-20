import React, { useCallback, useContext } from "react";
import { setSelectedRepo } from "../../containers/App/actions";
import { AppDispatch } from "../../containers/App";
import { RepoItemWrapper } from "./styles";

export default function RepoItem({ children, index, selected, style }) {
  const dispatch = useContext(AppDispatch);

  const selectRepo = useCallback(() => dispatch(setSelectedRepo(index)), [
    index
  ]);

  return (
    <RepoItemWrapper onClick={selectRepo} selected={selected} style={style}>
      {children}
    </RepoItemWrapper>
  );
}
