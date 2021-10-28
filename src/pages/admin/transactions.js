/**
 * @category Pages
 * @module inventory/repackaging
 */

import { useMemo, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Column from "components/containers/Column";
import LoadingPage from "components/layout/LoadingPage";
import Page from "components/layout/Page";
import PageHeader from "components/layout/PageHeader";
import Row from "components/containers/Row";
import Select from "components/input/Select";
import Table from "components/data/Table";

export default function Transactions() {
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
      <Table data={result} days={days} />
    </Page>
  );
}
