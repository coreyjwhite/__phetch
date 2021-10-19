/**
 * @module Table
 * @category Data
 * @description A styled {@link https://react-table.tanstack.com|react-table} component
 */

import PropTypes from "prop-types";
import { useSortBy, useTable } from "react-table";
import styled from "styled-components";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import Card from "components/containers/Card";
import Row from "components/containers/Row";

const TableCard = styled(Card).attrs((props) => ({
  id: `${camelize(props.label)}TableCard`,
}))`
  overflow: auto;
  max-width: ${m.col12};
  height: ${(props) => props.height};
  padding: 0.4rem 0.5rem;
  font-size: 0.875rem;
  table {
    display: block;
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
  }
  td,
  th {
    margin-bottom: 2rem;
    margin-left: ${m.sp8};
    text-align: left;
  }
  th {
    padding: ${m.sp5} ${m.sp6};
    border-bottom: 1px solid ${c.gray8};
    color: ${c.gray4};
    font-weight: 300;
    text-transform: uppercase;
  }
  td {
    padding: ${m.sp3} ${m.sp5};
    border-top: 1px solid ${c.gray8};
    font-size: ${m.sp6};
  }
  tr {
    cursor: ${(props) => (props.onRowClick ? "pointer" : null)};
  }
  tr:not(.headerRow):active {
    background-color: ${(props) => (props.onRowClick ? c.primary5 : "white")};
    td {
      color: ${(props) => (props.onRowClick ? c.primary9 : c.gray1)};
    }
  }
  .right {
    text-align: right;
  }
  p {
    margin: ${m.sp2} 0;
  }
`;

/**
 * React function component
 *
 * @param props
 * @param {Array} props.columns - Memoized columns configuration object
 * @param {Array} props.data - Memoized data to display
 * @param {string} props.label - For element id and visible heading (if
 * showHeading=true)
 * @param {string} [props.height=fit-content]
 * @param {Function} [props.onRowClick=null] - Behavior when a row is clicked
 * @param {string} [props.width=fit-content]
 */
export default function Table(props) {
  const columns = props.columns;
  const data = props.data;
  const initialState = props.initialState;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState,
        sortTypes: {
          alphanumeric: (row1, row2, columnName) => {
            const rowOneColumn = row1.values[columnName];
            const rowTwoColumn = row2.values[columnName];
            if (isNaN(rowOneColumn)) {
              return rowOneColumn.toUpperCase() > rowTwoColumn.toUpperCase()
                ? 1
                : -1;
            }
            return Number(rowOneColumn) > Number(rowTwoColumn) ? 1 : -1;
          },
        },
      },
      useSortBy
    );
  return (
    <TableCard
      label={props.label}
      onRowClick={props.onRowClick}
      width={props.width}
      showHeading={true}
      {...props}
    >
      <table {...getTableProps()} id={`${camelize(props.label)}Table`}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { headerKey, ...restColumn } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  );
                  return (
                    <th key={headerKey} {...restColumn}>
                      <Row justify="center">
                        {column.render("Header")}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ↓"
                            : " ↑"
                          : ""}
                      </Row>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()} id={`${camelize(props.label)}Body`}>
          {rows.map((row) => {
            prepareRow(row);
            const { rowKey, ...restRowProps } = row.getRowProps();
            return (
              <tr
                key={rowKey}
                {...restRowProps}
                onClick={() =>
                  props.onRowClick ? props.onRowClick(row.original) : null
                }
              >
                {row.cells.map((cell) => {
                  const { cellKey, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={cellKey} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableCard>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.string,
  label: PropTypes.string.isRequired,
  onRowClick: PropTypes.func,
  width: PropTypes.string,
};

Table.defaultProps = {
  height: "fit-content",
  width: "fit-content",
};
