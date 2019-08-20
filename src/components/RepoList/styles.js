import styled from "@emotion/styled";

export const ListWrapper = styled.div`
  background-color: #282c34;
  color: white;
  grid-area: sidebar;
  height: 100%;
  overflow-x: hidden;
  width: 450px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
