/**
 * @module InventorySparkline
 * @category Data
 * @description A styled react-sparklines component for inventory tables
 */

import PropTypes from "prop-types";
import styled from "styled-components";

import { Sparklines, SparklinesCurve } from "react-sparklines";
import camelize from "libs/camelize";
import getSparklineData from "libs/getSparklineData";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Column from "components/containers/Column";
import Lozenge from "components/containers/Lozenge";
import Row from "components/containers/Row";

const InventorySparklineContainer = styled(Column).attrs((props) => ({
  id: `${camelize(props.label)}InventorySparklineContainer`,
}))`
  height: 100%;
  margin: -30px 0px;
  p {
    font-size: 14px;
  }
`;

export default function InventorySparkline(props) {
  const sparklineData = getSparklineData(props.data, props.period);
  const trend = sparklineData.trend;
  var trendIcon = "";
  if (trend > 0) {
    trendIcon = "↗";
  } else if (trend < 0) {
    trendIcon = "↘";
  }
  return (
    <InventorySparklineContainer>
      <Row justify="center">
        <Row justify="center">
          <p>{sparklineData.average}</p>
          {trendIcon}
        </Row>
      </Row>
      <Sparklines
        svgWidth={100}
        svgHeight={38}
        margin={1}
        data={sparklineData.qtys}
      >
        <SparklinesCurve
          style={{
            stroke: c.primary6,
            strokeWidth: "3px",
            fill: "none",
          }}
        />
      </Sparklines>
    </InventorySparklineContainer>
  );
}

InventorySparkline.propTypes = {};

InventorySparkline.defaultProps = {};
