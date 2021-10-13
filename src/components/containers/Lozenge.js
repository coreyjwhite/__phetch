/**
 * @module Lozenge
 * @category Containers
 * @description A lozenge component that can be styled with text and background
 * colors
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledSpan = styled.span.attrs((props) => ({
  id: `${camelize(props.label)}Lozenge`,
  className: `lozenge ${props.variant}`,
}))`
  display: inline-block;
  width: ${(props) => props.width};
  height: fit-content;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  border-radius: ${m.sp3};
  box-shadow: ${s.elev1};
  color: ${(props) => props.color};
  cursor: default;
  font-size: ${m.sp6};
  &.success {
    background-color: ${c.success4};
    border-color: ${c.success4};
    color: white;
  }
  &.warning {
    background-color: ${c.warning3};
    color: ${c.warning1};
  }
  &.danger {
    background-color: ${c.danger4};
    border-color: ${c.danger4};
  }
  &.none {
    background-color: transparent;
    border-color: transparent;
    color: ${c.gray2};
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 * @param {string} [props.bg={@link module:Color|primary5}] - Background color
 * @param {string} [props.color={@link module:Color|primary9] - Text color
 * @param {string} [props.variant=none] - "success", "warning", or "danger"
 * styles
 * @param {string} [props.width=fit-content]
 */
export default function Lozenge(props) {
  return <StyledSpan {...props}>{props.children}</StyledSpan>;
}

Lozenge.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  width: PropTypes.string,
};

Lozenge.defaultProps = {
  bg: c.primary6,
  color: c.primary9,
  margin: m.sp4,
  padding: m.sp4,
  variant: "",
  width: "fit-content",
};
