import React from "react";
import { SelectedRepoWrapper } from "./styles";

export default function SelectedRepo({
  repo: {
    description,
    full_name,
    html_url,
    owner: { login: owner_name, html_url: owner_url, avatar_url } = {}
  }
}) {
  return (
    <SelectedRepoWrapper>
      <a href={html_url} target="_blank">
        <h2>{full_name}</h2>
      </a>
      <p>{description}</p>
      <p>
        Created by{" "}
        <a href={owner_url} target="_blank">
          {owner_name}
        </a>
      </p>
      <img alt={owner_name} src={avatar_url} />
    </SelectedRepoWrapper>
  );
}
