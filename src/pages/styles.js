/**
 * @category Pages
 * @module styles
 */

import { useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactToPrint from "react-to-print";
import demoTableData from "libs/demoTableData";
import states from "libs/states";
import m from "styles/measures";
import s from "styles/styles";
import ActionButton from "components/input/ActionButton";
import Button from "components/input/Button";
import Card from "components/containers/Card";
import Checkbox from "components/input/Checkbox";
import Column from "components/containers/Column";
import ControlLevel from "components/data/ControlLevel";
import InventoryDays from "components/data/inventory/InventoryDays";
import InventoryOrders from "components/data/inventory/InventoryOrders";
import InventoryProgress from "components/data/inventory/InventoryProgress";
import InventorySparkline from "components/data/inventory/InventorySparkline";
import KpiCard from "components/data/KpiCard";
import Lozenge from "components/containers/Lozenge";
import Modal from "components/containers/Modal";
import Page from "components/layout/Page";
import Palette from "components/Palette";
import Row from "components/containers/Row";
import Select from "components/input/Select";
import Space from "components/Space";
import Table from "components/data/Table";
import Textarea from "components/input/Textarea";
import Textbox from "components/input/Textbox";
import Toggle from "components/input/Toggle";

const pageStyle = `
  @media print {
    * { margin: 0; padding: 0;       color-adjust: exact;
          background-color: white;
          -webkit-print-color-adjust: exact;
          zoom: 95%;}
    html, body {

    }
  }

  @media print {
    .page-break {
      display: block;
      page-break-before: auto;
    }
  }

  @page {
    size: A4;
  }
`;

export default function Styles() {
  const componentRef = useRef();
  const nullRef = useRef(null);
  const demoData = useMemo(() => demoTableData, []);
  const demoColumns = useMemo(
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
            <Lozenge label={`${omni_id.toLowerCase()}Omni`} variant={variant}>
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
        Cell: ({ row }) => {
          let alias = undefined;
          if (row.original.item_name) {
            alias = row.original.item_name;
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
        accessor: "xactqty",
        width: 20,
        Cell: ({ row }) => {
          var xactqty = "0";
          if (row.original.xactqty >= 0.5) {
            xactqty = row.original.xactqty.toFixed(1);
          }
          return <Column></Column>;
        },
      },
      {
        Header: <div style={{ textAlign: "center" }}>On Hand</div>,
        accessor: "onhandratio",
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
    ],
    []
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function toggleModal(e) {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      <Page pageTitle="Styles">
        <Column label="Kpi Cards">
          <Row label="Kpi Cards" width={m.col12}>
            <KpiCard
              label="Test KPI"
              showHeading={true}
              value="21%"
              danger={14}
              warning={20}
              chartType="bars"
              data={[20, 16, 66, 77, 56, 92, 25, 12, 2, 4, 16]}
            />
            <KpiCard
              label="Test KPI"
              showHeading={true}
              value="2"
              danger={10}
              warning={20}
              chartType="curve"
              data={[20, 16, 66, 77, 56, 92, 25, 12, 5, 4, 16]}
            />
            <KpiCard
              label="Test KPI"
              showHeading={true}
              value="19k"
              danger={14}
              warning={20}
            />
          </Row>
        </Column>
        <Row label="Form Color and Elevation">
          <Row
            label="Form Color and Elevation"
            width={m.col11}
            justify="space-between"
          >
            <Column label="Sample Form Card" width={m.col6}>
              <Card
                label="Sample Form"
                variant="success"
                showHeading={true}
                padding={`${m.sp7} ${m.sp8}`}
                height={m.col12}
                width={m.col11}
              >
                <Column label="Sample Form" justify="space-between">
                  <Textbox label="Name" />
                  <Textbox label="Street Address" />
                  <Textbox label="City" />
                  <Row label="State and Zip" justify="space-between">
                    <Select
                      label="State"
                      data={states}
                      keyLabel="id"
                      inputRef={nullRef}
                      valueLabel="text"
                      nullAllowed={true}
                      defaultValue={-1}
                      width={m.col7}
                    />
                    <Textbox label="ZIP" width={m.col4} />
                  </Row>
                  <Textarea label="Comments" />
                  <Checkbox
                    inputRef={nullRef}
                    onChange={() => void 0}
                    label="Checkbox"
                  >
                    I accept and agree to the Terms of Use
                  </Checkbox>
                  <Toggle
                    inputRef={nullRef}
                    onChange={() => void 0}
                    label="Toggle"
                  >
                    Subscribe me to the weekly newsletter
                  </Toggle>
                  <Row label="Sample Form Buttons" justify="flex-end">
                    <Button
                      variant="danger"
                      text="Danger"
                      onClick={toggleModal}
                    />
                    <Button variant="tertiary" text="Tertiary" />
                    <Button variant="secondary" text="Secondary" />
                    <Button text="Primary" type="submit" />
                  </Row>
                </Column>
              </Card>
            </Column>
            <Column
              label="Color and Elevation"
              justify="space-between"
              width={m.col6}
              height={m.col12}
            >
              <Card
                label="Color"
                showHeading={true}
                height={m.col6}
                width={m.col11}
              >
                <Palette />
              </Card>
              <Card
                label="Elevation"
                showHeading={true}
                height={m.col6}
                width={m.col11}
              >
                <Row label="Elevations 1">
                  <Card label="Elevation 1" elevation={s.elev1}>
                    <p>1</p>
                  </Card>
                  <Card label="Elevation 2" elevation={s.elev2}>
                    <p>2</p>
                  </Card>
                  <Card label="Elevation 3" elevation={s.elev3}>
                    <p>3</p>
                  </Card>
                </Row>
                <Row label="Elevations 2">
                  <Card label="Elevation 4" elevation={s.elev4}>
                    <p>4</p>
                  </Card>
                  <Card label="Elevation 5" elevation={s.elev5}>
                    <p>5</p>
                  </Card>
                </Row>
              </Card>
            </Column>
          </Row>
        </Row>
        <Row label="Space">
          <Space width={m.col10} />
        </Row>

        <Row label="Table">
          <div ref={componentRef}>
            <Table
              columns={demoColumns}
              data={demoData}
              label="Data Table"
              actions={
                <ReactToPrint
                  trigger={() => <ActionButton />}
                  content={() => componentRef.current}
                  pageStyle={pageStyle}
                />
              }
            />
          </div>
        </Row>
      </Page>
      <Modal
        label="Demo Modal"
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        buttons={[
          <Button
            variant="danger"
            text="Close"
            onClick={toggleModal}
            autoRightMargin={true}
            key="Close"
          />,
          <Button variant="tertiary" text="Tertiary" key="tert" />,
          <Button variant="secondary" text="Secondary" key="sec" />,
          <Button text="OK" key="ok" />,
        ]}
      ></Modal>
    </>
  );
}

Styles.propTypes = {
  row: PropTypes.string,
  value: PropTypes.string,
};
