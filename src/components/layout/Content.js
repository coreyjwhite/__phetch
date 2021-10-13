/**
 * @module Content
 * @category Layout
 * @description A flex column component be passed to
 * {@link module:Layout|<Layout>}
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import m from "styles/measures";

const StyledDiv = styled.div.attrs(props => ({
  id: `${camelize(props.pageTitle)}PageContentContainer`,
  className: "contentContainer"
}))`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-flow: row wrap;
  align-self: flex-start;
  @media (min-width: ${m.devMd}) {
    padding: ${m.sp4};
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.pageTitle - HTML <title> element
 * @param {object} props.children - Content components
 */
export default function Content(props) {
  return <StyledDiv {...props}>{props.children}</StyledDiv>;
}

Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  pageTitle: PropTypes.string
};
