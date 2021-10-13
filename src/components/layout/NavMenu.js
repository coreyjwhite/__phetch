/**
 * @module NavMenu
 * @category Layout
 * @description Responsive nav component with {@link module:Brand|Brand} and
 * search box. Displays as a collapisble bottom menu on mobile and a persistent
 * sidebar on larger screens.
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import config from "config";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Brand from "components/layout/Brand";

const NavDiv = styled.div.attrs({
  id: "navmenu",
  className: "navMenu",
})`
  position: fixed;
  z-index: 1000;
  top: ${m.sp9};
  left: ${(props) => (props.open ? 0 : `-${m.sp13}`)};
  display: flex;
  overflow: hidden;
  width: ${m.sp13};
  height: 100%;
  flex-direction: column;
  padding: ${m.sp5};
  background: ${c.primary4};
  box-shadow: ${s.elev3};
  transition: 0.4s ease-in-out;
  @media (min-width: ${m.devMd}) {
    z-index: 3000;
    top: 0;
    left: 0;
    width: ${m.sp13};
    padding: ${m.sp5};
    border: none;
    border-radius: 0;
  }
`;

export default function NavMenu(props) {
  return (
    <NavDiv open={props.open}>
      {config.showBrand && <Brand logo={config.logo} />}
      {props.children}
    </NavDiv>
  );
}

NavMenu.propTypes = {
  children: PropTypes.object,
  open: PropTypes.bool,
};
