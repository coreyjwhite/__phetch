import { useState, useEffect } from "react";
import { BrowserCodeReader } from "@zxing/library";
import Page from "components/layout/Page";

export default function Z() {
  const codeReader = new BrowserCodeReader();
  const list = codeReader.listVideoInputDevices();

  return <Page>{console.log(list)}</Page>;
}
