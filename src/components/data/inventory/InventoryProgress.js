/**
 * @module InventoryProgress
 * @category Data
 * @description A progress bar component for inventory data with reorder and
 * critical level steps and tooltip component overlay
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Column from "components/containers/Column";
import InventoryProgressTooltip from "components/data/inventory/InventoryProgressTooltip";
import Row from "components/containers/Row";

const ProgressBackgroundDiv = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}ProgressBackgroundDiv`,
}))`
  position: relative;
  display: flex;
  width: 7rem;
  height: 1.2rem;
  align-items: flex-start;
  margin: ${m.sp3} ${m.sp3} ${m.sp4};
  background-color: ${c.gray7};
  border-radius: ${s.borderRadius};
  box-shadow: ${s.elev1};
  cursor: default;
`;

const ProgressContainer = styled(Row).attrs((props) => ({
  label: `${camelize(props.label)}ProgressContainer`,
}))`
  align-items: center;
  color: ${c.gray6};
  font-size: ${m.sp5};
  && p {
    margin: 0 ${m.sp3};
  }
`;

const ProgressStep = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}ProgressStep`,
}))`
  position: relative;
  z-index: 2;
  top: 0;
  left: ${(props) => props.left};
  display: ${(props) => (props.value > 0 ? "block" : "none")};
  width: 2px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ProgressTooltipOverlay = styled.span.attrs((props) => ({
  id: `${camelize(props.label)}ProgressTooltipOverlay`,
}))`
  display: flex;
  justify-content: center;
  margin-top: 0;
`;

const ProgressValueSpan = styled.span.attrs((props) => ({
  id: `${camelize(props.label)}ProgressValueSpan`,
}))`
  position: absolute;
  z-index: 1;
  display: inline-block;
  overflow: visible;
  width: ${(props) =>
    props.value <= props.max ? (props.value / props.max) * 100 : 100}%;
  height: 100%;
  background-color: ${c.success4};
  border-radius: ${s.borderRadius};
  &.warning {
    background-color: ${c.warning3};
  }
  &.danger {
    background-color: ${c.danger3};
  }
  &.supergreen {
    border-right: 3px solid ${c.success2};
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.label
 * @param {Object.<string, number>} props.data Inventory data
 * @param {string} props.data.item_id Item mnemonic
 * @param {number} props.data.qty.alarm Critical level
 * @param {number} props.data.qty.min Reorder level
 * @param {number} props.data.qty.onhand On hand level
 * @param {number} props.data.qty.parlvl Par level
 */
export default function InventoryProgress(props) {
  var data = props.data;
  var label = data.item_id.toLowerCase();
  var tipId = `${data.item_id.toLowerCase()}InventoryTooltip`;
  var status = "success";
  if (data.qty.onhand < data.qty.alarm) {
    status = "danger";
  } else if (data.qty.onhand < data.qty.min) {
    status = "warning";
  } else if (data.qty.onhand > data.qty.parlvl) {
    status = "supergreen";
  }
  return (
    <>
      <ProgressTooltipOverlay label={label} data-for={tipId} data-tip="true">
        <ProgressContainer label={label} align="center">
          <Column
            label={`${label} Progress Minimum`}
            width="15%"
            align="flex-end"
          >
            <p>0</p>
          </Column>
          <Column label={`${label} Progress Main`} width="70%">
            <p
              style={{
                fontSize: m.sp6,
                fontWeight: 400,
                margin: 0,
              }}
            >
              {data.qty.onhand}
            </p>
            <ProgressBackgroundDiv label={label} data-value={data.qty.onhand}>
              <ProgressStep
                label={`${label} Critical`}
                value={data.qty.alarm / data.qty.parlvl}
                left={`${(data.qty.alarm / data.qty.parlvl) * 100 - 3}%`}
              />
              <ProgressStep
                label={`${label} Reorder`}
                value={data.qty.min / data.qty.parlvl}
                left={`${(data.qty.min / data.qty.parlvl) * 100}%`}
              />
              <ProgressValueSpan
                label={props.label}
                className={status}
                max={data.qty.parlvl}
                value={data.qty.onhand}
              />
            </ProgressBackgroundDiv>
            <Row
              label={`${label} Progress Critical and Reorder`}
              justify="space-between"
            >
              <p
                style={{
                  width: `${(data.qty.alarm / data.qty.parlvl) * 100 + 3}%`,
                  textAlign: "right",
                }}
              >
                {data.qty.alarm == 0 ? "" : data.qty.alarm}
              </p>
              <p
                style={{
                  width: `${100 - (data.qty.min / data.qty.parlvl) * 100}%`,
                  marginLeft: 0,
                  textAlign: "left",
                }}
              >
                {data.qty.min}
              </p>
            </Row>
          </Column>
          <Column label={`${label} Progress Par`} width="15%">
            <p>{data.qty.parlvl}</p>
          </Column>
        </ProgressContainer>
      </ProgressTooltipOverlay>
      <InventoryProgressTooltip id={tipId} data={props.data} />
    </>
  );
}

InventoryProgress.propTypes = {
  data: PropTypes.object,
  label: PropTypes.string.isRequired,
};
