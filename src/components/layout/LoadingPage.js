/**
 * @module LoadingPage
 * @category Layout
 * @description {@link module:Page|Page} placeholder while data is loading.
 * Uses {@link https://www.npmjs.com/package/react-loader-spinner|react-loader-spinner} }
 */

import styled from "styled-components";
import Loader from "react-loader-spinner";
import c from "styles/color";
import Page from "components/layout/Page";

const StyledDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function LoadingPage() {
  return (
    <Page>
      <StyledDiv>
        <Loader type="Bars" color={c.primary6} height={70} width={70} />
      </StyledDiv>
    </Page>
  );
}
