/**
 * @module Select
 * @category Inputs
 * @description A styled select component
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

const SelectContainer = styled.div.attrs(props => ({
  className: "selectContainer",
  id: `${camelize(props.label)}SelectContainer`
}))`
  display: flex;
  width: 100%;
  margin: ${m.sp4} 0;
  cursor: pointer;
  &&::after {
    width: ${m.sp5};
    height: ${m.sp4};
    align-self: center;
    margin-right: ${m.sp5};
    background-color: ${c.primary5};
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    content: "";
    justify-self: end;
  }
`;

const StyledSelect = styled.select.attrs(props => ({
  className: "select",
  id: `${camelize(props.label)}Select`,
  name: camelize(props.label)
}))`
  width: 100%;
  padding: ${m.sp3} ${m.sp4};
  border: ${s.inactiveBorder};
  margin: 0 calc(-2 * ${m.sp5}) 0 0;
  appearance: none;
  background-color: transparent;
  border-radius: 0.03rem;
  cursor: pointer;
  outline: none;
  transition: ${s.inputTransition};
  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px ${c.primary5};
  }
  option {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 * @param {object[]} props.data - Array of {label:key, label:value} objects
 * @param {string} props.defaultValue - Can be set to -1 for null if
 * nullAllowed=true
 * @param {object} props.inputRef - forwardinputRef
 * @param {string} props.keyLabel - Data key label
 * @param {string} props.valueLabel - Data value lavel
 * @param {string} props.width
 * @param {boolean} [props.nullAllowed=false]
 * @param {boolean} [props.showLabel=false] - Display label
 */
export default function Select(props) {
  const [focused, setFocused] = useState(false);
  return (
    <Column
      id={`${camelize(props.label)}Column`}
      label={props.label}
      align="flex-start"
      width={props.width}
    >
      {props.showLabel && <InputLabel focus={focused} label={props.label} />}
      <SelectContainer
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        label={props.label}
      >
        <StyledSelect
          defaultValue={props.defaultValue}
          ref={props.inputRef}
          label={props.label}
        >
          {props.nullAllowed && <option value={null} />}
          {props.data.map(function(row) {
            return (
              <option key={row[props.keyLabel]} value={row[props.keyLabel]}>
                {row[props.valueLabel]}
              </option>
            );
          })}
        </StyledSelect>
      </SelectContainer>
    </Column>
  );
}

Select.propTypes = {
  data: PropTypes.array.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  inputRef: PropTypes.object.isRequired,
  keyLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  nullAllowed: PropTypes.bool,
  showLabel: PropTypes.bool,
  valueLabel: PropTypes.string.isRequired,
  width: PropTypes.string
};

Select.defaultProps = {
  nullAllowed: false,
  showLabel: true,
  width: "50%"
};
