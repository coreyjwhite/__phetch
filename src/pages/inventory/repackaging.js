/**
 * @category Pages
 * @module inventory/repackaging
 */

import { useMemo, useState } from "react";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { DateTime } from "luxon";
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Column from "components/containers/Column";
import InventoryTable from "components/data/InventoryTable";
import LoadingPage from "components/layout/LoadingPage";
import Page from "components/layout/Page";
import PageHeader from "components/layout/PageHeader";
import Row from "components/containers/Row";
import Select from "components/input/Select";
import Table from "components/data/Table";

const StyledHeader = styled(PageHeader)`
  height: ${m.sp13};
  background: #053f6f;
  h1 {
    color: ${c.primary9};
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

export default function Repackaging() {
  const [days, setDays] = useState(7);
  var repackagingResourceUrl = setApiUrl(`omnicell/repackaging/${days}`);
  const { data: result, error } = useSWR(repackagingResourceUrl);

  async function handleChange(e) {
    setDays(e.target.value);
  }

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <LoadingPage />;

  return (
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
      <InventoryTable data={result} days={days} />
    </Page>
  );
}
