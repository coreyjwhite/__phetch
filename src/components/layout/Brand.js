/**
 * @module Brand
 * @category Layout
 * @description Logo and brand name component for
 * {@link module:NavMenu|<NavMenu>} wrapped in a Next link
 */

import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";

const BrandContainer = styled.div.attrs({
  id: "brandContainer",
  className: "brandContainer"
})`
  display: flex;
  align-self: center;
  justify-content: flex-start;
  margin: ${m.sp6} ${m.sp1};
  @media (min-width: ${m.devMd}) {
    justify-content: flex-start;
    margin: ${m.sp4} ${m.sp1};
  }
`;

const Logo = styled.img.attrs({
  id: "brandLogo",
  className: "brandLogo"
})`
  width: ${m.sp8};
  height: ${m.sp8};
  margin-right: ${m.sp4};
`;

const StyledP = styled.p.attrs({
  id: "brandTitle",
  className: "brandTitle"
})`
  align-self: center;
  margin: 0;
  color: ${c.primary8};
  font-size: ${m.sp7};
  font-weight: 600;
`;

/**
 * React function component
 *
 * @param props
 * @param {string} [props.logo=none] - Path to logo file
 */
export default function Brand(props) {
  return (
    <Link href="/" passHref>
      <a>
        <BrandContainer>
          <Logo src={props.logo} />
          <StyledP>phetch</StyledP>
        </BrandContainer>
      </a>
    </Link>
  );
}

Brand.propTypes = {
  logo: PropTypes.string
};

Brand.defaultProps = {
  logo: null
};
