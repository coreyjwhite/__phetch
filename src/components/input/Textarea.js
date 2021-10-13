/**
 * @module Textarea
 * @category Inputs
 * @description A styled textarea component
 */

import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import InputLabel from "components/input/InputLabel";
import Column from "components/containers/Column";

const StyledTextarea = styled.textarea.attrs(props => ({
  id: `${camelize(props.label)}Textarea`,
  type: "textarea"
}))`
  height: ${props => props.height};
  border: ${s.inactiveBorder};
  margin: ${m.sp4} 0;
  border-radius: ${s.borderRadius};
  color: ${c.gray2};
  resize: none;
  transition: ${s.inputTransition};
  &:focus {
    border: ${s.activeBorder};
    outline: none;
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 * @param {object} props.inputRef - inputRef
 * @param {string} [props.height={@link module:Measures|sp11}]
 * @param {boolean} [props.showLabel=true]
 */
export default function Textarea(props) {
  const [focused, setFocused] = useState(false);
  return (
    <Column
      id={`${camelize(props.label)}Column`}
      label={props.label}
      align="stretch"
    >
      {props.showLabel && <InputLabel focus={focused} label={props.label} />}
      <StyledTextarea
        height={props.height}
        ref={props.inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        label={props.label}
      />
    </Column>
  );
}

Textarea.propTypes = {
  height: PropTypes.string,
  inputRef: PropTypes.object,
  label: PropTypes.string,
  showLabel: PropTypes.bool
};

Textarea.defaultProps = {
  height: m.sp11,
  showLabel: true
};
