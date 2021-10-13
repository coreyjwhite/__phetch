/**
 * @module Page
 * @category Layout
 * @description A flex column component be passed to
 * {@link module:Layout|<Layout>}
 */

import PropTypes from "prop-types";
import Head from "next/head";
import styled from "styled-components";
import camelize from "libs/camelize";
import m from "styles/measures";
import Content from "components/layout/Content";
import Row from "components/containers/Row";

const PageHeaderContainer = styled(Row).attrs({
  justify: "flex-start",
})`
  nav {
    color: green;
    content: ">";
    ol {
      display: none;
    }

    li {
      display: inline;
    }
    a:before {
      height: ${m.sp4};
      content: ">";
      visibility: visible;
    }
  }
`;

const PageHeader = styled.h2.attrs((props) => ({
  id: `${camelize(props.pageTitle)}PageHeader`,
}))`
  display: flex;

  margin: ${m.sp4} ${m.sp4} 0;
  vertical-align: middle;
`;

const PageContainer = styled.div.attrs((props) => ({
  id: `${camelize(props.pageTitle)}PageContainer`,
  className: "pageContainer",
}))`
  position: absolute;
  top: ${m.sp9};
  display: flex;
  width: 100%;
  height: fit-content;
  flex-flow: column wrap;
  align-items: center;
  padding-bottom: ${m.sp8};
  @media (min-width: ${m.devMd}) {
    left: ${m.sp13};
    max-width: ${m.devXl};
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.pageTitle - HTML <title> element
 * @param {object} props.children - A single <Page> element
 */
export default function Page(props) {
  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <PageContainer pageTitle={props.pageTitle}>
        <PageHeaderContainer
          label={`${camelize(props.pageTitle)}PageHeaderContainer`}
        >
          <PageHeader pageTitle={props.pageTitle}>
            {props.pageTitle} {props.actions}
          </PageHeader>
        </PageHeaderContainer>
        <Content {...props}>{props.children}</Content>
      </PageContainer>
    </>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  pageTitle: PropTypes.string.isRequired,
};
