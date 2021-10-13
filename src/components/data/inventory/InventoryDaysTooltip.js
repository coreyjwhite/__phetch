/**
 * @module InventoryDaysTooltip
 * @category Data
 * @description A tooltip component formatted to display inventory orders data
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import { DateTime } from "luxon";
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
 * @param {number} props.data.qty_alarm Critical level
 * @param {number} props.data.qty_min Reorder level
 * @param {number} props.data.qty_onhand On hand level
 * @param {number} props.data.qty_parlvl Par level
 */

function dayFormat(days) {
  var format = "EEE, LLL d";
  if (days < 7) {
    format = "cccc";
  }
  return format;
}

export default function InventoryDaysTooltip(props) {
  var d = props.data;
  var today = DateTime.now();
  return (
    <Tooltip id={props.id}>
      <TooltipTable label={props.id}>
        {d.reorder && d.reorder != "Infinity" && (
          <tr>
            <td>Reorder</td>
            <td className="value">{d.reorder} days</td>
            <td className="value">
              {today.plus({ days: d.reorder }).toFormat(dayFormat(d.reorder))}
            </td>
          </tr>
        )}
        <tr>
          <td>Stockout</td>
          <td className="value">{d.total} days</td>
          {d.total != "∞" && (
            <td className="value">
              {today.plus({ days: d.total }).toFormat(dayFormat(d.total))}
            </td>
          )}
        </tr>
      </TooltipTable>
    </Tooltip>
  );
}

InventoryDaysTooltip.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string.isRequired,
};
