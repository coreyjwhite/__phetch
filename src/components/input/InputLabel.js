/**
 * @module InputLabel
 * @category Inputs
 * @description A reuseable label for text, select, and boolean inputs
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import s from "styles/styles";

const StyledLabel = styled.label.attrs(props => ({
  className: "inputLabel",
  id: `${camelize(props.label)}Label`
}))`
  color: ${props => (props.focus ? c.primary5 : c.gray5)};
  font-weight: ${props => (props.focus ? 600 : 400)};
  font-size: 0.9rem;
  margin: ${props => props.margin};
  transition: ${s.inputTransition};
  ::after {
    content: attr(data-text);
    content: attr(data-text) / "";
    height: 0;
    visibility: hidden;
    overflow: hidden;
    font-weight: 600;
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 * @param {boolean} [props.focus=false] - When used with text or select inputs,
 * makes the font bold
 * @param {number} [props.margin=0] - To adjust in forms, especially with
 * boolean inputs
 */
export default function InputLabel(props) {
  return (
    <StyledLabel focus={props.focus} margin={props.margin} label={props.label}>
      {props.children || props.label}
    </StyledLabel>
  );
}

InputLabel.propTypes = {
  children: PropTypes.string,
  focus: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.string
};

InputLabel.defaultProps = {
  focus: false,
  margin: "0"
};
