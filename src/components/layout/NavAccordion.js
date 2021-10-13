/**
 * @module NavAccordion
 * @category Layout
 * @description Expanding groups of Next links for
 * {@link module:NavMenu|<NavMenu>}
 */
import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import config from "config";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import Column from "components/containers/Column";

const StyledDiv = styled.div.attrs({
  id: "navAccordion",
  className: "navAccordion",
})`
  display: flex;
  width: ${m.col12};
  height: fit-content;
  flex-direction: column;
  margin: ${m.sp4};
  -ms-overflow-style: none; /* hide scrollbar in Internet Explorer, Edge */
  overflow-y: auto;
  scrollbar-width: none; /* hide scrollbar in Firefox */
  ::-webkit-scrollbar {
    display: none; /* hide scrollbar in Chrome, Safari, and Opera */
  }
  transition: 0.2s;
  @media (min-width: ${m.devMd}) {
    height: 100%;
    padding: ${m.sp5} 0;
  }
`;

const NavGroup = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}NavGroup`,
  className: "navGroup",
}))`
  display: flex;
  width: ${m.col12};
  flex-flow: row nowrap;
  align-items: flex-start;
  padding: 0;
  border: none;
  margin: 0 0 ${m.sp6} 0;
  background-color: inherit;
  cursor: pointer;
  outline: none;
  text-align: left;
  p {
    margin: ${`0 0 ${m.sp3} ${m.sp5}`};
    color: ${c.primary8};
    font-size: 1.3rem;
    @media (min-width: ${m.devMd}) {
      font-size: 1rem;
    }
  }
  a {
    height: ${(props) => (props.visible ? "1.2rem" : "0px")};
    margin: ${(props) =>
      props.visible ? `${m.sp3} 0 ${m.sp3} ${m.sp6}` : "0"};
    color: ${c.primary8};
    font-size: 1.2rem;
    transition: height 0.3s ease-in-out, visibility 0s;
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    @media (min-width: ${m.devMd}) {
      height: ${(props) => (props.visible ? "1rem" : "0px")};
      font-size: 1rem;
    }
  }
  p:hover,
  a:hover {
    color: ${c.primary6};
    transition: 0s;
  }
`;

export default function NavAccordion(props) {
  const [navGroupIsOpen, setNavGroupIsOpen] = useState(null);

  return (
    <StyledDiv>
      {config.navTree.map(([group, icon, links]) => (
        <NavGroup
          key={group}
          onClick={() =>
            setNavGroupIsOpen(navGroupIsOpen === group ? null : group)
          }
          visible={navGroupIsOpen === group}
          label={group}
        >
          <Image src={icon} height={20} width={20} alt="Menu icon" />
          <Column
            label={`${camelize(group)}NavGroup`}
            width={m.col12}
            align="stretch"
          >
            <p>{group}</p>
            {links.map(([title, href]) => (
              <Link
                href={href}
                key={title}
                passHref
                styles={{ display: navGroupIsOpen ? "inline" : "none" }}
              >
                <a onClick={() => props.handleLinkClick(false)}>{title}</a>
              </Link>
            ))}
          </Column>
        </NavGroup>
      ))}
    </StyledDiv>
  );
}

NavAccordion.propTypes = {
  handleLinkClick: PropTypes.func,
};
