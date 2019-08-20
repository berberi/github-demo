import React from "react";
import loading from "./loading.gif";
import { LoadingWrapper } from "./styles";

export default function LoadingIndicator({ style }) {
  return (
    <LoadingWrapper style={style}>
      <img alt="Loading..." src={loading} />
    </LoadingWrapper>
  );
}
