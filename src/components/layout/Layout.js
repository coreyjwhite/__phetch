/**
 * @module Layout
 * @category Layout
 * @description The base layout component to pass {@link module:Page|<Page>}
 * children components to
 */
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styled from "styled-components";
import useOutsideClickListener from "libs/useOutsideClickListener";
import m from "styles/measures";
import Button from "components/input/Button";
import Link from "next/link";
import NavAccordion from "components/layout/NavAccordion";
import NavMenu from "components/layout/NavMenu";
import Topbar from "components/layout/Topbar";

const ToggleButton = styled.button.attrs({
  id: "navMenuToggleButton",
  className: "navMenuToggleButton",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin-right: auto;
  background: transparent;
  @media (min-width: ${m.devMd}) {
    display: none;
  }
`;

const StyledDiv = styled.div.attrs({
  id: "layoutContainer",
})`
  width: 100vw;
  height: 100vh;
`;

/**
 *  React function component
 *
 * @param props
 * @param {Component}props.children - Child page component
 */
export default function Layout({ children }) {
  const [isOpen, setOpen] = useState(false);
  const navMenuRef = useRef(null);

  useOutsideClickListener(navMenuRef, setOpen, "navMenuToggleButton");

  return (
    <StyledDiv>
      <div id="navMenuOutsideClickWrapper" ref={navMenuRef}>
        <NavMenu open={isOpen}>
          <NavAccordion handleLinkClick={setOpen} />
        </NavMenu>
      </div>
      <Topbar>
        <ToggleButton
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          <Image
            src="/icons/menu-line.svg"
            id="icon"
            height="28"
            width="28"
            alt="Menu icon"
          />
        </ToggleButton>
        <Link href="/huddle">
          <Button label="docs" variant="link" autoRightMargin={true}>
            <a>Huddle</a>
          </Button>
        </Link>
        <Button label="docs" variant="link">
          <a href="docs/index.html" target="_blank">
            Docs
          </a>
        </Button>
        <Button label="github" variant="link">
          <a
            href="https://github.com/coreyjwhite/phetch"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/icons/github.svg"
              id="icon"
              height="28"
              width="28"
              alt="Github icon"
            />
          </a>
        </Button>
      </Topbar>
      {children}
    </StyledDiv>
  );
}

Layout.propTypes = {
  children: PropTypes.object,
};
