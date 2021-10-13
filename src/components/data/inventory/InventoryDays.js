/**
 * @module InventoryDays
 * @category Data
 * @description
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import getSparklineData from "libs/getSparklineData";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import InventoryDaysTooltip from "components/data/inventory/InventoryDaysTooltip";
import Lozenge from "components/containers/Lozenge";

const InventoryDaysContainer = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}InventoryDaysContainer`,
}))`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const DaysTooltipOverlay = styled.span.attrs((props) => ({
  id: `${camelize(props.label)}DaysTooltipOverlay`,
}))`
  display: flex;
  justify-content: center;
  margin-top: 0;
`;

export default function InventoryDays(props) {
  const data = props.data;
  var tipId = `${data.item_id.toLowerCase()}InventoryDaysTooltip`;
  var reorderDays = false;
  var totalDays = "-";
  var variant = "none";
  var orders = 0;
  var xactqty = 0;

  if (data.usage) {
    xactqty = data.usage.average;
  }

  if (data.orders) {
    if (data.orders.routine) {
      orders += data.orders.routine;
    }
    if (data.orders.prn) {
      orders += data.orders.prn;
    }
  }

  if (orders > xactqty) {
    xactqty = orders;
  }
  if (data.qty.onhand > data.qty.min) {
    reorderDays = Math.floor((data.qty.onhand - data.qty.min) / xactqty);
  }

  if (data.qty.onhand / xactqty) {
    totalDays = (data.qty.onhand / xactqty).toFixed(0);
  }

  if (totalDays < 4) {
    variant = "danger";
  } else if (totalDays < 7) {
    variant = "warning";
  } else if (totalDays >= 7) {
    variant = "success";
  }

  if (totalDays === "Infinity" || totalDays > 90) {
    totalDays = "∞";
  }

  return (
    <>
      <DaysTooltipOverlay data-for={tipId} data-tip="true">
        <InventoryDaysContainer>
          {reorderDays && reorderDays != "Infinity" && totalDays < 90 && (
            <p>{reorderDays} / </p>
          )}
          <Lozenge variant={variant} margin={m.sp2} padding={m.sp3}>
            {totalDays}
          </Lozenge>
        </InventoryDaysContainer>
      </DaysTooltipOverlay>
      <InventoryDaysTooltip
        id={tipId}
        data={{ reorder: reorderDays, total: totalDays }}
      />
    </>
  );
}
