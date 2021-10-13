/**
 * @module InventoryOrdersTooltip
 * @category Data
 * @description A tooltip component formatted to display inventory orders data
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import Tooltip from "components/containers/Tooltip";

const TooltipTable = styled.table.attrs((props) => ({
  id: `${camelize(props.label)}TooltipTable`,
  className: "tooltipTable",
}))`
  && td {
    padding: ${m.sp3};
    border-top: none;
    font-size: ${m.sp5};
    font-weight: 600;
  }
  && td.value {
    text-align: right;
  }
  && td.onhand {
    font-size: ${m.sp6};
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {string} props.id
 * @param {Object.<string, number>} props.data Inventory data
 * @param {number} props.data.qty_alarm Critical level
 * @param {number} props.data.qty_min Reorder level
 * @param {number} props.data.qty_onhand On hand level
 * @param {number} props.data.qty_parlvl Par level
 */
export default function InventoryOrdersTooltip(props) {
  return (
    <Tooltip id={props.id}>
      <TooltipTable label={props.id}>
        <tr>
          <td colSpan="2">Total Doses</td>
          <td className="onhand value">{props.total}</td>
        </tr>
        <tr>
          <td></td>
          <td>Routine</td>
          <td className="value">{props.routine}</td>
        </tr>
        <tr>
          <td></td>
          <td>PRN</td>
          <td className="value">{props.prn}</td>
        </tr>
      </TooltipTable>
    </Tooltip>
  );
}

InventoryOrdersTooltip.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string.isRequired,
};
