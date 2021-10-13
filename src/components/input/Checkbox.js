/**
 * @module Checkbox
 * @category Inputs
 * @description Checkbox component with a forwardRef to a hidden checkbox
 * element
 */

import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import InputLabel from "components/input/InputLabel";

const CheckboxContainer = styled.div.attrs(props => ({
  className: "checkboxContainer",
  id: `${props.label}CheckboxContainer`
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${m.sp4};
`;

const CheckIcon = styled.img.attrs(props => ({
  className: "checkIcon",
  id: `${camelize(props.label)}CheckIcon`,
  src: "/icons/check-line-white.svg"
}))`
  display: inline-block;
  width: ${m.sp7};
  height: ${m.sp7};
  visibility: ${props => (props.visible ? "visible" : "hidden")};
`;

const HiddenCheckbox = styled.input.attrs(props => ({
  checked: props.checked,
  className: "hiddenCheckbox",
  id: `_${camelize(props.label)}HiddenCheckbox`,
  name: camelize(props.label),
  type: "checkbox"
}))`
  display: none;
`;

const StyledCheckbox = styled.div.attrs(props => ({
  className: "checkbox",
  id: `${camelize(props.label)}Checkbox`
}))`
  display: flex;
  width: ${m.sp7};
  height: ${m.sp7};
  align-items: center;
  justify-content: center;
  border: ${props => (props.checked ? s.activeBorder : s.inactiveBorder)};
  background: ${props => (props.checked ? c.primary5 : "white")};
  border-radius: ${s.borderRadius};
  box-shadow: ${s.elev1};
  cursor: pointer;
  transition: ${s.inputTransition};
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 * @param {object} props.inputRef - forwardRef
 * @param {boolean} [props.defaultChecked=false]
 */
export default function Checkbox(props) {
  const [checked, setChecked] = useState(props.defaultChecked);
  return (
    <CheckboxContainer onClick={() => setChecked(!checked)} label={props.label}>
      <HiddenCheckbox
        checked={checked}
        ref={props.inputRef}
        label={props.label}
        onChange={props.onChange}
      />
      <StyledCheckbox checked={checked} label={props.label}>
        <CheckIcon label={props.label} visible={checked} />
      </StyledCheckbox>
      <InputLabel label={props.label} margin={`0 0 0 ${m.sp5}`}>
        {props.children || props.label}
      </InputLabel>
    </CheckboxContainer>
  );
}

Checkbox.propTypes = {
  children: PropTypes.string,
  defaultChecked: PropTypes.bool,
  inputRef: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

Checkbox.defaultProps = {
  defaultChecked: false
};
