import styled from "@emotion/styled";

export const Wrapper = styled.div`
  font-size: 18px;
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: 450px 1fr;
  grid-template-areas: "sidebar content";

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 450px;
    grid-template-areas: "content" "sidebar";
  }
`;

export const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  grid-area: content;
  justify-content: center;
`;
