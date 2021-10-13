/**
 * @module Row
 * @category Containers
 * @description A flexbox column div component for horizontal layout of child
 * components
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import m from "styles/measures";

const StyledRow = styled.div.attrs(props => ({
  id: `${camelize(props.label)}Row`,
  className: "row",
  label: props.label
}))`
  display: flex;
  width: ${props => props.width};
  height: ${props => props.height};
  flex-flow: row wrap;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  @media (min-width: ${m.devMd}) {
    flex-flow: row nowrap;
  }
`;

const RowHeading = styled.h3.attrs(props => ({
  id: `${camelize(props.label)}RowHeading`,
  className: "rowHeading"
}))`
  margin: ${m.sp2} 0 ${m.sp4} ${m.sp4};
  font-weight: 400;
  @media (min-width: ${m.devMd}) {
    align-self: flex-start;
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label - For element id and visible heading (if
 * showHeading=true)
 * @param {string} [props.align=space-around] - Flexbox row alignment (vertical
 * alignment)
 * @param {string} [props.height=fit-content]
 * @param {string} [props.justify=space-around] - Flexbox row justification
 * (horizontal alignment)
 * @param {string} [props.margin=0]
 * @param {string} [props.padding=0]
 * @param {boolean} [props.showHeading=false] - Display the label as a heading
 * @param {string} [props.width=100%]
 */
export default function Row(props) {
  return (
    <>
      {props.showHeading && (
        <RowHeading label={props.label}>{props.label}</RowHeading>
      )}
      <StyledRow {...props}>{props.children}</StyledRow>
    </>
  );
}

Row.propTypes = {
  align: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  height: PropTypes.string,
  justify: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  showHeading: PropTypes.bool,
  label: PropTypes.string,
  width: PropTypes.string
};

Row.defaultProps = {
  alignIitems: "space-around",
  height: "fit-content",
  justify: "space-around",
  margin: "0",
  padding: "0",
  showHeading: false,
  width: "100%"
};
