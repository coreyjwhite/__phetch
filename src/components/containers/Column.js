/**
 * @module Column
 * @category Containers
 * @description A flexbox column div component for vertical layout of child
 * components
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import m from "styles/measures";

const StyledColumn = styled.div.attrs((props) => ({
  className: "column",
  id: `${camelize(props.label)}Column`,
}))`
  display: flex;
  width: 100%;
  height: ${(props) => props.height};
  flex-flow: column wrap;
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  @media (min-width: ${m.devMd}) {
    width: ${(props) => props.width};
  }
`;

const ColumnHeading = styled.h3.attrs((props) => ({
  className: "columnHeading",
  id: `${camelize(props.label)}ColumnHeading`,
}))`
  margin: ${m.sp6} 0 ${m.sp4} 0;
  font-weight: 600;
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
 * @param {string} [props.align=center] - Flexbox column alignment
 * (horizontal alignment)
 * @param {string} [props.height=fit-content]
 * @param {string} [props.justify=space-around] - Flexbox column justification
 * (vertical alignment)
 * @param {string} [props.margin=0]
 * @param {string} [props.padding=0]
 * @param {boolean} [props.showHeading=false] - Display the label as a heading
 * @param {string} [props.width=100%]
 */
export default function Column(props) {
  return (
    <>
      <StyledColumn {...props}>
        {props.showHeading && (
          <ColumnHeading label={props.label}>{props.label}</ColumnHeading>
        )}
        {props.children}
      </StyledColumn>
    </>
  );
}

Column.propTypes = {
  align: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  height: PropTypes.string,
  justify: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  showHeading: PropTypes.bool,
  width: PropTypes.string,
};

Column.defaultProps = {
  align: "center",
  height: "fit-content",
  justify: "flex-start",
  margin: "0",
  padding: "0",
  showHeading: false,
  width: "100%",
};
