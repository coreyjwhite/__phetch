/**
 * @module Tooltip
 * @category Containers
 * @description A {@link https://wwayne.github.io/react-tooltip/| react-tooltip}
 * component
 */

import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import s from "styles/styles";

const StyledTooltip = styled(ReactTooltip)`
  background-color: white !important;
  border-radius: ${s.borderRadius} !important;
  box-shadow: ${s.elev5} !important;
  opacity: 1 !important;
  z-index: 1000000 !important;
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.id Used by data-for prop on hover element
 */
export default function Tooltip(props) {
  return (
    <StyledTooltip {...props} type={"light"} effect={"solid"}>
      {props.children}
    </StyledTooltip>
  );
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  id: PropTypes.string,
};
