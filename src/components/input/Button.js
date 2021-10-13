/**
 * @module Button
 * @category Inputs
 * @description A button component with preset styles and optional custom
 * background color
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledButton = styled.button.attrs((props) => ({
  className: `button ${props.variant}`,
  id: `${camelize(props.text || props.label)}Button`,
  name: camelize(props.text),
}))`
  display: flex;
  width: fit-content;
  min-width: ${m.sp11};
  height: fit-content;
  min-height: ${m.sp9};
  align-items: center;
  justify-content: center;
  padding: ${m.sp6};
  border-style: none;
  margin: ${m.sp3};
  margin-right: ${(props) => (props.autoRightMargin ? "auto" : m.sp3)};
  background: ${c.primary5};
  border-radius: ${s.borderRadius};
  box-shadow: ${s.elev2};
  color: white;
  cursor: pointer;
  font-size: ${m.sp6};
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: ${s.inputTransition};
  &:hover {
    background: ${c.primary2};
  }
  &.secondary {
    background: ${c.gray8};
    color: ${c.gray1};
  }
  &.secondary:hover {
    background: ${c.gray7};
    color: white;
  }
  &:active {
    box-shadow: none;
    filter: brightness(0.9);
  }
  &.tertiary {
    background: transparent;
    box-shadow: none;
    color: ${c.gray1};
  }
  &.link {
    min-width: fit-content;
    min-height: ${m.sp8};
    align-self: center;
    padding: ${m.sp4};
    background: transparent;
    box-shadow: none;
    color: ${c.gray1};
  }
  &.tertiary:hover,
  &.link:hover {
    text-decoration: underline;
  }
  &.tertiary:active {
    background: ${c.gray9};
    text-decoration: underline;
  }
  &.danger {
    background: ${c.danger4};
    color: ${c.danger1};
  }
  &.danger:hover,
  &.danger:active {
    background: ${c.danger2};
    color: white;
  }
  &:disabled {
    background-color: ${c.gray6};
    color: ${c.gray3};
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} [props.text] - Alternative to children
 * @param {string} [props.autoRightMargin=false]
 * @param {string} [props.variant=primary] - primary, secondary, tertiary,
 * danger or link styling
 */
export default function Button(props) {
  return <StyledButton {...props}>{props.text || props.children}</StyledButton>;
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  autoRightMargin: PropTypes.bool,
  text: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "danger",
    "link",
  ]),
};

Button.defaultProps = {
  autoRightMargin: false,
  variant: "primary",
};
