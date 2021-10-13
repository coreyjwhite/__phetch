/**
 * @module Topbar
 * @category Layout
 * @description Topbar component
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import m from "styles/measures";
import s from "styles/styles";

const TopbarDiv = styled.div.attrs({
  id: "topbar",
  className: "topBar"
})`
  position: fixed;
  z-index: 2000;
  display: flex;
  width: 100%;
  height: ${m.sp9};
  justify-content: flex-end;
  padding: 0;
  background: white;
  box-shadow: ${s.elev3};
  @media (min-width: ${m.devMd}) {
    left: ${m.sp13};
    width: calc(${m.col12} - ${m.sp13});
  }
`;

/**
 * @param props
 * @param {object} props.children
 */
export default function Topbar(props) {
  return <TopbarDiv>{props.children}</TopbarDiv>;
}

Topbar.propTypes = {
  children: PropTypes.array
};
