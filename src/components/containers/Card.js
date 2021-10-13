/**
 * @module Card
 * @category Containers
 * @description A flexbox container component that can be styled with
 * background color, a left accent border, and a heading with actions buttons.
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const CardContainer = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}CardContainer`,
  className: "cardContainer",
}))`
  display: flex;
  width: 100%;
  height: ${(props) => props.height};
  flex-flow: column nowrap;
  margin: ${m.sp4};
  @media (min-width: ${m.devMd}) {
    width: ${(props) => props.width};
  }
`;

const CardHeading = styled.div.attrs((props) => ({
  id: `${camelize(props.component)}CardHeading`,
  className: "cardHeading",
}))`
  display: flex;
  width: ${m.col12};
  align-items: center;
  align-self: start;
  h3 {
    margin: 0 ${m.sp4} 0;
    font-weight: 600;
  }
  button {
    width: ${m.sp7};
    height: ${m.sp7};
    padding: ${m.sp3};
    font-weight: 600;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: ${(props) =>
      props.actions ? "space-between" : "flex-start"};
  }
`;

const StyledCard = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}Card`,
  className: `card ${props.variant}`,
}))`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: row wrap;
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  padding: ${(props) => props.padding};
  border-left: ${(props) => props.accent};
  margin: ${m.sp4} ${m.sp3};
  background: ${(props) => props.bg};
  border-radius: ${s.borderRadius};
  box-shadow: ${(props) => props.elevation};
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  &.success {
    border-left: ${m.sp3} solid ${c.success4};
  }
  &.warning {
    border-left: ${m.sp3} solid ${c.warning3};
  }
  &.danger {
    border-left: ${m.sp3} solid ${c.danger4};
  }
  @media (min-width: ${m.devMd}) {
    margin: ${(props) => props.margin};
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 * @param {string} [props.accent=null] - Custom left border color
 * @param {Component[]} [props.actions=none] - actions components/buttons to
 * display in the heading
 * @param {string} [props.align=flex-start] - Flexbox row alignment (vertical
 * alignment)
 * @param {string} [props.bg=white] - Background color
 * @param {string} [props.height=fit-content]
 * @param {string} [props.justify=center] - Flexbox row justification
 * (horizontal alignment)
 * @param {string} [props.margin="{@link module:Measures|sp4} 0"]
 * @param {string} [props.padding={@link module:Measures|sp3}]
 * @param {boolean} [props.showHeading=false] - Display the title as a heading
 * @param {string} [props.variant=none] - "success", "warning", or "danger"
 * accent styles
 * @param {string} [props.width=100% (mobile) or {@link module:measures|sp4}]
 */
export default function Card(props) {
  return (
    <CardContainer
      label={props.label}
      width={props.width}
      height={props.height}
    >
      {(props.showHeading || props.actions) && (
        <CardHeading actions={props.actions} component={props.label}>
          <h3>{props.label}</h3>
          <div>{props.actions}</div>
        </CardHeading>
      )}
      <StyledCard {...props}>{props.children}</StyledCard>
    </CardContainer>
  );
}

Card.propTypes = {
  accent: PropTypes.string,
  actions: PropTypes.array,
  align: PropTypes.string,
  bg: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  height: PropTypes.string,
  justify: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  showHeading: PropTypes.bool,
  variant: PropTypes.string,
  width: PropTypes.string,
};

Card.defaultProps = {
  accent: null,
  actions: null,
  align: "flex-start",
  bg: "white",
  elevation: s.elev3,
  height: "100%",
  justify: "center",
  margin: m.sp4,
  padding: m.sp6,
  variant: "",
  width: m.sp14,
};
