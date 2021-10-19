/**
 * @category Pages
 * @module inventory/repackaging
 */

import { useMemo } from "react";
import { colord } from "colord";
import { DateTime } from "luxon";
import ReactToPrint from "react-to-print";
import { Sparklines, SparklinesCurve } from "react-sparklines";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import styled from "styled-components";
import useSWR from "swr";
import camelize from "libs/camelize";
import getSparklineData from "libs/getSparklineData";
import setApiUrl from "libs/setApiUrl";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Link from "next/link";
import Card from "components/containers/Card";
import ChartTooltip from "components/data/ChartTooltip";
import Column from "components/containers/Column";
import ControlLevel from "components/data/ControlLevel";
import InventoryDays from "components/data/inventory/InventoryDays";
import InventoryOrders from "components/data/inventory/InventoryOrders";
import InventoryProgress from "components/data/inventory/InventoryProgress";
import InventorySparkline from "components/data/inventory/InventorySparkline";
import Lozenge from "components/containers/Lozenge";
import Row from "components/containers/Row";
import Table from "components/data/Table";
import Tooltip from "components/containers/Tooltip";

function onHandSort(rowA, rowB, id, desc) {
  let a = rowA.values.qty.onhand / rowA.values.qty.parlvl;
  let b = rowB.values.qty.onhand / rowB.values.qty.parlvl;
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

export default function InventoryTable(props) {
  const columns = useMemo(
    () => [
      {
        Header: <div style={{ textAlign: "center" }}>Omni</div>,
        accessor: "omni_stid",
        Cell: ({ row }) => {
          var omni_id = row.original.omni_stid.substring(2);
          var variant = "";
          if (omni_id == "CSM") {
            variant = "danger";
          }
          return (
            <Lozenge
              label={`${row.original.item_id.toLowerCase()}Omni`}
              variant={variant}
            >
              {omni_id}
            </Lozenge>
          );
        },
      },
      {
        Header: <div style={{ textAlign: "center" }}>C</div>,
        accessor: "ctrl_lvl",
        Cell: ({ row }) => {
          return (
            <ControlLevel
              label={row.original.item_id.toLowerCase()}
              ctrl_lvl={row.original.ctrl_lvl}
            />
          );
        },
      },
      {
        Header: "Product",
        accessor: "rx_disp",
        sortType: "alphanumeric",
        Cell: ({ row }) => {
          let alias = undefined;
          if (row.original.alias) {
            alias = row.original.alias;
          }
          return (
            <>
              <p>{row.original.rx_disp}</p>
              <p className="italic light">{alias}</p>
            </>
          );
        },
      },
      {
        Header: <div style={{ textAlign: "center" }}>Orders</div>,
        accessor: "orders",
        Cell: ({ row }) => {
          return (
            <InventoryOrders
              data={row.original.orders}
              label={`${row.original.item_id.toLowerCase()}InventoryOrders`}
            />
          );
        },
      },
      {
        Header: <div style={{ textAlign: "center" }}>7-day Avg</div>,
        accessor: "usage",
        width: 20,
        Cell: ({ row }) => {
          var usage = { average: 0, daily: [{ day: -7, qty: 0 }] };
          if (row.original.usage) {
            usage = row.original.usage;
          }
          const trend = 1;
          var tipId = `${row.original.item_id.toLowerCase()}InventoryUsageTooltip`;
          var trendIcon = "";
          if (trend > 0) {
            trendIcon = "↗";
          } else if (trend < 0) {
            trendIcon = "↘";
          }
          return (
            <>
              <div data-for={tipId} data-tip="true">
                <Row>
                  <p style={{ fontSize: 13 }}>{usage.average.toFixed(1)}</p>
                </Row>
                <div style={{ width: "80px", height: "50px" }}>
                  <VictoryGroup
                    padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    domainPadding={{ y: [30, 30] }}
                  >
                    <VictoryLine
                      data={usage.daily}
                      crossAxis={false}
                      x="day"
                      y="qty"
                      interpolation="cardinal"
                      style={{
                        data: {
                          stroke: colord(c.primary5).toHex(),
                          strokeWidth: 8,
                        },
                      }}
                    />
                  </VictoryGroup>
                </div>
              </div>
              <Tooltip id={tipId}>
                <Row>
                  <p style={{ fontSize: 16, fontWeight: 600 }}>
                    {row.original.rx_disp}
                  </p>
                </Row>
                <div style={{ width: "350px", height: "300px" }}>
                  <VictoryChart
                    domainPadding={{ y: [20, 20] }}
                    minDomain={{ y: 0 }}
                    padding={{ top: 0, bottom: 20, left: 40, right: 30 }}
                  >
                    <VictoryAxis
                      fixLabelOverlap={true}
                      standalone={false}
                      tickFormat={(t) =>
                        DateTime.fromISO(t, { zone: "utc" }).toFormat("L/d")
                      }
                      tickLabelComponent={
                        <VictoryLabel
                          angle={-45}
                          style={{ fontSize: "18px", fontFamily: "Open Sans" }}
                          dx={-20}
                        />
                      }
                      style={{
                        axis: { stroke: colord(c.gray7).toHex() },
                        ticks: { stroke: colord(c.gray7).toHex(), size: 5 },
                      }}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(t) => (t % 1 ? "" : t)}
                      tickLabelComponent={
                        <VictoryLabel
                          standalone={false}
                          style={{ fontSize: "18px", fontFamily: "Open Sans" }}
                        />
                      }
                      style={{
                        axis: { stroke: colord(c.gray7).toHex() },
                        ticks: { stroke: colord(c.gray7).toHex(), size: 5 },
                      }}
                    />
                    <VictoryLine
                      data={usage.daily}
                      crossAxis={false}
                      x="day"
                      y="qty"
                      interpolation="cardinal"
                      style={{
                        data: {
                          stroke: colord(c.primary6).toHex(),
                          strokeWidth: 3,
                        },
                      }}
                    />
                  </VictoryChart>
                </div>
                <Row>
                  <p style={{ fontSize: 16 }}>
                    Mean: {usage.average.toFixed(1)} / day
                  </p>
                </Row>
              </Tooltip>
            </>
          );
        },
      },
      {
        Header: <div style={{ textAlign: "center" }}>On Hand</div>,
        accessor: "qty.onhand",
        sortType: onHandSort,
        Cell: ({ row }) => {
          return (
            <InventoryProgress
              label={`${row.original.item_id.toLowerCase()}Inventory`}
              data={row.original}
            />
          );
        },
      },
      {
        Header: (
          <div style={{ textAlign: "center" }}>
            Days <br />
            On Hand
          </div>
        ),
        accessor: "qty",
        Cell: ({ row }) => {
          return <InventoryDays data={row.original} />;
        },
      },
      {
        Header: <div style={{ textAlign: "center" }}>Exp</div>,
        accessor: "expiration",
        Cell: ({ row }) => {
          if (row.values.expiration) {
            return DateTime.fromISO(row.values.expiration).toFormat("M/d/yy");
          }
          return "";
        },
      },
    ],
    []
  );
  return (
    <Table
      id="repackagingTable"
      columns={columns}
      data={props.data}
      width={m.col12}
      initialState={{
        sortBy: [
          {
            id: "qty.onhand",
            desc: false,
          },
        ],
      }}
    />
  );
}
