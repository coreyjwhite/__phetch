/**
 * @module Textbox
 * @category Inputs
 * @description A styled textbox component with a bottom border
 */

import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Column from "components/containers/Column";
import InputLabel from "components/input/InputLabel";

const TextboxContainer = styled(Column).attrs(props => ({
  id: `${camelize(props.label)}TextboxContainer`,
  className: "textboxContainer"
}))`
  width: 100%;
  align-items: flex-start;
  @media (min-width: ${m.devMd}) {
    width: ${props => props.width};
  }
`;

const StyledTextInput = styled.input.attrs(props => ({
  id: `${camelize(props.label)}Textbox`,
  className: "textbox",
  type: "text"
}))`
  width: 100%;
  height: ${m.sp7};
  padding: 0 ${m.sp2} 0 ${props => (props.img ? m.sp4 : 0)};
  border: none;
  margin: ${m.sp4} ${m.sp1};
  background: transparent;
  background-image: url(${props => props.img});
  background-position: 0;
  background-repeat: no-repeat;
  background-size: ${m.sp5};
  border-radius: 0;
  box-shadow: 0 1px 0 ${c.gray7};
  caret-color: ${c.gray5};
  font-size: ${m.sp6};
  outline: none;
  transition: ${s.inputTransition};
  ::after {
    box-shadow: 0 2px 0 transparent;
  }
  &:focus {
    box-shadow: 0 2px 0 ${c.primary5};
  }
  @media (min-width: ${m.devMd}) & {
    width: ${props => props.width};
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 * @param {object} props.inputRef - forwardRef
 * @param {string} [props.img=none] - Path to an image to display inside and
 * before text
 * @param {string} [props.placeholder=none]
 * @param {boolean} [props.showLabel=true]
 * @param {string} [props.width=100%]
 */
export default function Textbox(props) {
  const [isFocused, setFocused] = useState(false);
  return (
    <TextboxContainer width={props.width} label={props.label}>
      {props.showLabel ? (
        <InputLabel focus={isFocused} label={props.label} width={props.width} />
      ) : null}
      <StyledTextInput
        label={props.label}
        img={props.img}
        placeholder={props.placeholder}
        ref={props.inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </TextboxContainer>
  );
}

Textbox.propTypes = {
  img: PropTypes.string,
  inputRef: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  width: PropTypes.string
};

Textbox.defaultProps = {
  showLabel: true,
  width: "100%"
};
