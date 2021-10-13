/**
 * @module InventoryDays
 * @category Data
 * @description
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Column from "components/containers/Column";
import InventoryOrdersTooltip from "components/data/inventory/InventoryOrdersTooltip";
import Lozenge from "components/containers/Lozenge";

const InventoryOrdersContainer = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}InventoryOrdersContainer`,
}))`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const OrdersTooltipOverlay = styled.span.attrs((props) => ({
  id: `${camelize(props.label)}OrdersTooltipOverlay`,
}))`
  display: flex;
  justify-content: center;
  margin-top: 0;
`;

const StyledColumn = styled(Column)`
  p {
    font-size: ${m.sp5};
  }
`;

export default function InventoryOrders(props) {
  const data = props.data;
  let prn = 0;
  let routine = 0;
  if (data) {
    if (data.prn) {
      prn = data.prn;
    }
    if (data.routine) {
      routine = data.routine;
    }
  }
  let total = prn + routine;
  if (total == 0) {
    total = "";
  }
  var tipId = `${props.label.toLowerCase()}InventoryOrdersTooltip`;
  return (
    <>
      <OrdersTooltipOverlay data-for={tipId} data-tip="true">
        <InventoryOrdersContainer>
          {routine > 0 && prn > 0 && (
            <StyledColumn>
              <p>{routine}</p>
              <p>{prn}</p>
            </StyledColumn>
          )}
          {total}
        </InventoryOrdersContainer>
      </OrdersTooltipOverlay>
      <InventoryOrdersTooltip
        id={tipId}
        routine={routine}
        prn={prn}
        total={total}
      />
    </>
  );
}
