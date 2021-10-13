/**
 * @module KpiCard
 * @category Data
 * @description A card component for displaying KPI data
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Sparklines,
  SparklinesBars,
  SparklinesCurve,
  SparklinesReferenceLine,
  SparklinesSpots,
} from "react-sparklines";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Card from "components/containers/Card";
import Lozenge from "components/containers/Lozenge";

const StyledCard = styled(Card).attrs((props) => ({
  id: `${camelize(props.label)}KpiCard`,
}))`
  overflow: hidden;
  width: 100%;
  height: ${m.sp12};
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0;
  h1 {
    position: absolute;
    align-self: flex-start;
    margin: ${m.sp4};
    font-size: ${m.sp8};
    font-weight: 400;
    text-shadow: 0 1px 3px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 6%);
  }
  svg {
    width: 100%;
    height: 100%;
    margin-top: ${m.sp4};
  }
  @media (min-width: ${m.devMd}) {
    width: ${m.sp14};
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 * @param {string} props.danger Danger variant threshold
 * @param {string} props.value Main KPI value
 * @param {string} props.warning Warning variant threshold
 */
export default function KpiCard(props) {
  var value = props.value;
  var variant = "";
  var chart;
  if (props.danger || props.warning) {
    variant = "success";
  }
  if (value.includes("$")) {
    value = value.replace("$", "");
  }
  if (value <= props.warning) {
    variant = "warning";
  }
  if (value <= props.danger) {
    variant = "danger";
  }
  if (props.chartType == "curve") {
    chart = (
      <SparklinesCurve
        style={{
          stroke: "none",
          fill: c.primary8,
          fillOpacity: 0.6,
          position: "absolute",
        }}
      />
    );
  } else if (props.chartType == "bars") {
    chart = (
      <SparklinesBars
        style={{
          stroke: "white",
          strokeWidth: "1",
          fill: c.primary8,
          fillOpacity: 0.6,
          position: "absolute",
        }}
      />
    );
  }
  return (
    <StyledCard
      label={props.label}
      variant={variant}
      showHeading={props.showHeading}
    >
      <h1>{props.value}</h1>
      <Sparklines margin={0} data={props.data}>
        {chart}
      </Sparklines>
      {props.children}
    </StyledCard>
  );
}

KpiCard.propTypes = {
  danger: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  warning: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

KpiCard.defaultProps = {
  danger: null,
  warning: null,
};
