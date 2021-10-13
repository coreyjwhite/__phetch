/**
 * @module Toggle
 * @category Inputs
 * @description A styled toggle component
 */

import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import InputLabel from "components/input/InputLabel";

const HiddenCheckbox = styled.input.attrs(props => ({
  className: "hiddenToggle",
  id: `_${camelize(props.label)}HiddenToggle`,
  name: camelize(props.label),
  type: "checkbox"
}))`
  display: none;
`;

const StyledToggle = styled.label.attrs(props => ({
  className: "toggle",
  id: `${camelize(props.label)}Toggle`
}))`
  position: relative;
  display: flex;
  min-width: ${m.sp9};
  height: ${m.sp7};
  align-self: center;
  margin: ${m.sp4};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  span {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${c.gray7};
    border-radius: ${m.sp5};
    box-shadow: ${s.elev2};
  }
  span:before {
    position: absolute;
    bottom: 4px;
    left: 4px;
    width: ${m.sp6};
    height: ${m.sp6};
    background-color: white;
    border-radius: ${m.sp6};
    box-shadow: ${s.elev2};
    content: "";
    transition: ${s.inputTransition};
  }
  input:checked + span {
    border: ${s.activeBorder};
    background-color: ${c.primary5};
  }
  input:checked + span:before {
    bottom: 2px;
    left: 4px;
    border: 0px;
    transform: translateX(1.25rem);
  }
`;

const ToggleContainer = styled.div.attrs(props => ({
  id: `${camelize(props.label)}ToggleContainer`
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${m.sp4};
`;

/**
 * React function component
 *
 * @component
 * @param props
 * @param {string} props.label
 * @param {object} props.inputRef - forwardRef
 * @param {boolean} [props.defaultChecked=false]
 */
export default function Toggle(props) {
  const [checked, setChecked] = useState(props.defaultChecked);
  return (
    <ToggleContainer onClick={() => setChecked(!checked)} label={props.label}>
      <StyledToggle label={props.label}>
        <HiddenCheckbox
          checked={checked}
          ref={props.inputRef}
          label={props.label}
          onChange={props.onChange}
        />
        <span />
      </StyledToggle>
      <InputLabel label={props.label} margin={`0 0 0 ${m.sp5}`}>
        {props.children || props.label}
      </InputLabel>
    </ToggleContainer>
  );
}

Toggle.propTypes = {
  children: PropTypes.string,
  defaultChecked: PropTypes.bool,
  inputRef: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

Toggle.defaultProps = {
  defaultChecked: false
};
