/**
 * @category Pages
 * @module inventory/repackaging
 */

import { useMemo, useState } from "react";
import { colord } from "colord";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { DateTime } from "luxon";
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
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Button from "components/input/Button";
import Column from "components/containers/Column";
import InventoryTable from "components/data/InventoryTable";
import LoadingPage from "components/layout/LoadingPage";
import Modal from "components/containers/Modal";
import Page from "components/layout/Page";
import PageHeader from "components/layout/PageHeader";
import Row from "components/containers/Row";
import Select from "components/input/Select";
import ChartTooltip from "components/data/ChartTooltip";
import ControlLevel from "components/data/ControlLevel";
import InventoryDays from "components/data/inventory/InventoryDays";
import InventoryOrders from "components/data/inventory/InventoryOrders";
import InventoryProgress from "components/data/inventory/InventoryProgress";
import InventorySparkline from "components/data/inventory/InventorySparkline";
import Lozenge from "components/containers/Lozenge";
import Table from "components/data/Table";
import Tooltip from "components/containers/Tooltip";

const StyledHeader = styled(PageHeader)`
  height: ${m.sp13};
  background: #053f6f;
  h1 {
    color: ${c.primary9};
  }
`;

const ModalTable = styled.table.attrs((props) => ({}))`
  max-width: ${m.col12};
  height: ${(props) => props.height};
  width: 85%;
  padding: 0.4rem 0.5rem;
  font-size: 0.875rem;
  border-collapse: collapse;
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
  .center {
    text-align: center;
  }
  .right {
    text-align: right;
  }
  p {
    margin: ${m.sp2} 0;
  }
`;

function onHandSort(rowA, rowB, id, desc) {
  let a = rowA.values.qty.onhand / rowA.values.qty.parlvl;
  let b = rowB.values.qty.onhand / rowB.values.qty.parlvl;
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

function getRowUsage(row, period) {
  var orders = 0;
  var usage = 0;
  var prn = 0;
  var routine = 0;
  if (row.values.orders) {
    if (row.values.orders.prn) {
      prn = row.values.orders.prn;
    }
    if (row.values.orders.routine) {
      routine = row.values.orders.routine;
    }
  }
  orders = prn + routine;
  if (row.values.usage) {
    row.values.usage.forEach((object) => (usage += object.qty));
  }
  usage = usage / period;
  if (orders > usage) {
    return orders;
  }
  return usage;
}

function daysSort(rowA, rowB, id, desc) {
  let a = rowA.values.qty.onhand / getRowUsage(rowA, 7);
  let b = rowB.values.qty.onhand / getRowUsage(rowB, 7);
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

const daysArray = [
  { period: "7" },
  { period: 14 },
  { period: 30 },
  { period: 60 },
  { period: 90 },
];

function getMidazolamBg(rx_disp) {
  var bg = "";
  if (rx_disp == "5mL ") {
    bg = c.warning3;
  } else if (rx_disp == "6.25mL ") {
    bg = c.warning1;
  } else if (rx_disp == "7.5mL ") {
    bg = c.danger3;
  }
  return bg;
}

export default function Repackaging() {
  const midazolamArray = ["MIDA3.75ML", "MIDA5ML", "MIDA6.25ML", "MIDA7.5ML"];
  const [days, setDays] = useState(7);
  const [midazolamData, setMidazolamData] = useState([]);
  const [midazolamModalIsOpen, setMidazolamModalIsOpen] = useState(false);
  var repackagingResourceUrl = setApiUrl(`omnicell/repackaging/${days}`);
  const { data: result, error } = useSWR(repackagingResourceUrl);

  async function handleChange(e) {
    setDays(e.target.value);
  }

  function getMidazolamData(arr) {
    if (arr) {
      var midazolam = [];
      arr.forEach((item) => {
        if (midazolamArray.includes(item.item_id)) {
          midazolam.push({
            item_id: item.item_id,
            rx_disp: item.rx_disp
              .replace("Midazolam (Oral) 2mg/1mL ", "")
              .replace("SYR", ""),
            parlvl: item.qty.parlvl,
            onhand: item.qty.onhand,
            qty: item.qty,
            expiration: item.expiration,
            count:
              item.qty.parlvl - item.qty.onhand > 0
                ? item.qty.parlvl - item.qty.onhand
                : "",
            volume:
              item.qty.parlvl - item.qty.onhand > 0 &&
              item.rx_disp
                .replace("Midazolam (Oral) 2mg/1mL ", "")
                .replace("SYR", "")
                .replace("mL", "") *
                (item.qty.parlvl - item.qty.onhand),
          });
        }
      });
      setMidazolamData(midazolam);
    }
  }

  function toggleMidazolamModal(e) {
    getMidazolamData(result);
    setMidazolamModalIsOpen(!midazolamModalIsOpen);
  }

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
        Header: <div style={{ textAlign: "center" }}>{days}-day Avg</div>,
        accessor: "usage",
        width: 20,
        Cell: ({ row }) => {
          var usage = { average: 0, daily: [{ day: -7, qty: 0 }] };
          if (row.original.usage) {
            usage = row.original.usage;
          }
          var tipId = `${row.original.item_id.toLowerCase()}InventoryUsageTooltip`;
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
                      tickCount={10}
                      standalone={false}
                      tickFormat={(t) =>
                        DateTime.fromISO(t, { zone: "utc" }).toFormat("L/d")
                      }
                      tickLabelComponent={
                        <VictoryLabel
                          angle={-45}
                          style={{ fontSize: "18px", fontFamily: "Open Sans" }}
                          dx={-15}
                          dy={-5}
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
      {
        accessor: "item_id",
        Cell: ({ row }) => {
          if (midazolamArray.includes(row.original.item_id)) {
            return (
              <img
                src="/icons/calculator-line.svg"
                onClick={toggleMidazolamModal}
                style={{ cursor: "pointer" }}
              />
            );
          } else {
            return null;
          }
        },
      },
    ],
    []
  );

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <LoadingPage />;

  return (
    <>
      <Page pageTitle="Repackaging">
        <Select
          label="Period"
          data={daysArray}
          keyLabel="period"
          valueLabel="period"
          onChange={handleChange}
          defaultValue={days}
          width={m.col7}
        />
        <Table
          days={days}
          id="repackagingTable"
          columns={columns}
          data={result}
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
      </Page>
      <Modal
        label="Midazolam Calculator"
        isOpen={midazolamModalIsOpen}
        onRequestClose={toggleMidazolamModal}
        width={m.sp18}
        height={m.sp17}
        buttons={[
          <Button text="Done" key="Done" onClick={toggleMidazolamModal} />,
        ]}
      >
        <ModalTable>
          <thead>
            <tr>
              <th class="center">Dose</th>
              <th class="center">On Hand</th>
              <th class="right">Restock</th>
              <th class="center">Volume</th>
              <th class="center">Expiration</th>
            </tr>
          </thead>
          <tbody>
            {midazolamData.map((item) => {
              return (
                <tr key={item.item_id}>
                  <td class="center">
                    <Lozenge
                      bg={getMidazolamBg(item.rx_disp)}
                      border={
                        item.rx_disp == "3.75mL " ? c.gray7 : "transparent"
                      }
                      width={m.sp11}
                      color={
                        item.rx_disp == "5mL " || item.rx_disp == "3.75mL "
                          ? c.gray3
                          : c.primary9
                      }
                    >
                      {item.rx_disp}
                    </Lozenge>
                  </td>
                  <td class="right">
                    <InventoryProgress data={item} />
                  </td>
                  <td class="right">
                    {item.parlvl - item.onhand > 0
                      ? item.parlvl - item.onhand
                      : ""}
                  </td>
                  <td class="right">
                    {item.volume ? `${item.volume} mL` : ""}
                  </td>
                  <td class="center">
                    {DateTime.fromISO(item.expiration).toFormat("M/d/yy")}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td />
              <td />
              <td class="right">
                {midazolamData.reduce(function (previousValue, currentValue) {
                  if (currentValue.parlvl - currentValue.onhand > 0) {
                    return (
                      previousValue +
                      (currentValue.parlvl - currentValue.onhand)
                    );
                  } else {
                    return previousValue;
                  }
                }, 0)}
              </td>
              <td class="right">
                {midazolamData.reduce(function (previousValue, currentValue) {
                  return previousValue + currentValue.volume;
                }, 0)}{" "}
                mL
              </td>
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td class="right">
                Bottles:{" "}
                <b>
                  {(
                    midazolamData.reduce(function (
                      previousValue,
                      currentValue
                    ) {
                      return previousValue + currentValue.volume;
                    },
                    0) / 120
                  ).toFixed(1)}
                </b>
              </td>
            </tr>
          </tbody>
        </ModalTable>
      </Modal>
    </>
  );
}
