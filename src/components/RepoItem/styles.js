import styled from "@emotion/styled";

export const RepoItemWrapper = styled.div`
  cursor: pointer;
  display: flex;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  flex-flow: column nowrap;
  justify-content: center;
  margin: 10px;

  &:hover {
    background-color: #393d45;
  }
`;
