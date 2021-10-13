/**
 * @module InventoryProgressTooltip
 * @category Data
 * @description A tooltip component formatted to display inventory data
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import Tooltip from "components/containers/Tooltip";

const Dot = styled.span`
  display: inline-block;
  width: ${m.sp5};
  height: ${m.sp5};
  border-radius: 100%;
  &.par {
    background-color: ${c.success3};
  }
  &.reorder {
    background-color: ${c.warning3};
  }
  &.critical {
    background-color: ${c.danger4};
  }
`;

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
 * @param {number} props.data.qty.alarm Critical level
 * @param {number} props.data.qty.min Reorder level
 * @param {number} props.data.qty.onhand On hand level
 * @param {number} props.data.qty.parlvl Par level
 */
export default function InventoryTooltip(props) {
  var d = props.data;
  return (
    <Tooltip id={props.id}>
      <TooltipTable label={props.id}>
        <tr>
          <td colSpan="2">On Hand</td>
          <td className="onhand value">{d.qty.onhand}</td>
          <td className="onhand value">
            ({((d.qty.onhand / d.qty.parlvl) * 100).toFixed(0)}%)
          </td>
        </tr>
        <tr>
          <td>
            <Dot className="par" />
          </td>
          <td>Par</td>
          <td className="value">{d.qty.parlvl}</td>
        </tr>
        <tr>
          <td>
            <Dot className="reorder" />
          </td>
          <td>Reorder</td>
          <td className="value">{d.qty.min}</td>
        </tr>
        <tr>
          <td>
            <Dot className="critical" />
          </td>
          <td>Critical</td>
          <td className="value">{d.qty.alarm}</td>
        </tr>
      </TooltipTable>
    </Tooltip>
  );
}

InventoryTooltip.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string.isRequired,
};
