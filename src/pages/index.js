/**
 * @category Pages
 * @module index
 */

import { useMemo } from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import m from "styles/measures";
import s from "styles/styles";
import fetcher from "libs/fetch";
import setApiUrl from "libs/setApiUrl";
import Button from "components/input/Button";
import Page from "components/layout/Page";

const testUrl = setApiUrl("test/");

export default function Home() {
  const id = 2;
  const { data: result, error } = useSWR(testUrl);
  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Something went wrong!</h1>;
  console.log(fetcher(testUrl, id));
  return <Page pageTitle="Home"></Page>;
}
