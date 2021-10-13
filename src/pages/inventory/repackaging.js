/**
 * @category Pages
 * @module inventory/repackaging
 */

import { useMemo } from "react";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { DateTime } from "luxon";
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";
import getSparklineData from "libs/getSparklineData";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Link from "next/link";
import Card from "components/containers/Card";
import Column from "components/containers/Column";
import ControlLevel from "components/data/ControlLevel";
import InventoryDays from "components/data/inventory/InventoryDays";
import InventoryOrders from "components/data/inventory/InventoryOrders";
import InventoryProgress from "components/data/inventory/InventoryProgress";
import InventorySparkline from "components/data/inventory/InventorySparkline";
import InventoryTable from "components/data/InventoryTable";
import LoadingPage from "components/layout/LoadingPage";
import Lozenge from "components/containers/Lozenge";
import Page from "components/layout/Page";
import PageHeader from "components/layout/PageHeader";
import Row from "components/containers/Row";
import KpiCard from "components/data/KpiCard";
import Table from "components/data/Table";

const StyledHeader = styled(PageHeader)`
  height: ${m.sp13};
  background: #053f6f;
  h1 {
    color: ${c.primary9};
  }
`;

const repackagingResourceUrl = setApiUrl("omnicell/repackaging/");

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

export default function Repackaging() {
  const { data: result, error } = useSWR(repackagingResourceUrl);

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <LoadingPage />;

  return (
    <Page pageTitle="Repackaging">
      <InventoryTable data={result} />
    </Page>
  );
}
