/**
 * @module ControlLevel
 * @category Data
 * @description Styled component to display drug control level
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledSpan = styled.span.attrs((props) => ({
  id: `${camelize(props.label)}ControlLevel`,
}))`
  display: inline-block;
  width: ${m.sp8};
  height: ${m.sp8};
  padding: ${m.sp4};
  margin: 0;
  border-radius: ${m.sp9};
  color: ${(props) => props.color || c.gray4};
  cursor: default;
  font-family: Georgia, serif;
  font-size: ${m.sp6};
  text-align: center;
  &.legend {
    color: ${c.primary5};
  }
  &.scheduleTwo {
    padding: 0.4rem;
    border: 1px solid;
    color: ${c.danger4};
    box-shadow: ${s.elev1};
  }
  &.scheduleThree {
    color: ${c.danger4};
  }
  &.scheduleFour {
    color: ${c.danger4};
  }
  &.scheduleFive {
    color: ${c.danger4};
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 */
export default function ControlLevel(props) {
  let ctrl_lvl = props.ctrl_lvl;
  let className = "legend";
  let display = "";
  if (ctrl_lvl == "2") {
    className = "scheduleTwo";
    display = "II";
  } else if (ctrl_lvl == "3") {
    className = "scheduleThree";
    display = "III";
  } else if (ctrl_lvl == "4") {
    className = "scheduleFour";
    display = "IV";
  } else if (ctrl_lvl == "5") {
    className = "scheduleFive";
    display = "V";
  }
  return (
    <StyledSpan className={className} label={props.label}>
      {display}
    </StyledSpan>
  );
}

ControlLevel.propTypes = {
  ctrl_lvl: PropTypes.string,
  label: PropTypes.string,
};
