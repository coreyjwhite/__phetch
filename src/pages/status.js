/**
 * @category Pages
 * @module status
 */

import { useRef } from "react";
import { colord } from "colord";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { DateTime } from "luxon";
import ReactToPrint from "react-to-print";
import useSWR from "swr";
import numFormatter from "libs/numFormatter";
import setApiUrl from "libs/setApiUrl";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import ActionButton from "components/input/ActionButton";
import Card from "components/containers/Card";
import ChartTooltip from "components/data/ChartTooltip";
import LoadingPage from "components/layout/LoadingPage";
import Page from "components/layout/Page";

const dosesResourceUrl = setApiUrl("status/doses/monthly");

function formatDate(date) {
  return DateTime.fromISO(date, { zone: "utc" }).startOf("month").toISO();
}

export default function Status(props) {
  const componentRef = useRef();
  const { data, error } = useSWR(dosesResourceUrl);
  if (!data) return <LoadingPage />;
  const yesterday = DateTime.now().toFormat("d") - 1;
  const projection =
    (data[data.length - 1].total_doses / (DateTime.now().get("day") - 1)) *
    DateTime.now().daysInMonth;
  return (
    <Page
      pageTitle="Status Board"
      actions={
        <ReactToPrint
          trigger={() => <ActionButton />}
          content={() => componentRef.current}
        />
      }
      ref={componentRef}
    >
      <Card width={m.col12}>
        <VictoryChart
          domainPadding={10}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => " "}
              labelComponent={
                <VictoryTooltip
                  flyoutComponent={
                    <ChartTooltip dateFormat={formatDate}>
                      {(datum) => datum.month}
                    </ChartTooltip>
                  }
                />
              }
            />
          }
        >
          <VictoryAxis
            tickFormat={(t) =>
              DateTime.fromISO(t, { zone: "utc" }).toFormat("LLL yy")
            }
            tickLabelComponent={
              <VictoryLabel
                angle={-60}
                style={{ fontSize: "6px", fontFamily: "Open Sans" }}
                dx={-4}
                dy={-4}
              />
            }
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => numFormatter(t)}
            tickLabelComponent={
              <VictoryLabel
                style={{ fontSize: "6px", fontFamily: "Open Sans" }}
                dx={5}
              />
            }
          />
          <VictoryLine
            data={data}
            x={(d) => formatDate(d.month)}
            y="target"
            style={{
              data: {
                stroke: colord(c.success3).toHex(),
                strokeWidth: 0.5,
              },
            }}
          />
          <VictoryLine
            data={data}
            x={(d) => formatDate(d.month)}
            y={(d) => d.target && d.target * 0.75}
            style={{
              data: {
                stroke: colord(c.warning2).toHex(),
                strokeWidth: 0.5,
              },
            }}
          />
          <VictoryLine
            data={data}
            x={(d) => formatDate(d.month)}
            y={(d) => d.target && d.target * 0.5}
            style={{
              data: {
                stroke: colord(c.danger4).toHex(),
                strokeWidth: 0.5,
              },
            }}
          />
          <VictoryBar
            data={[
              {
                month: formatDate(DateTime.now()),
                total_doses: projection,
              },
            ]}
            x={(d) => formatDate(d.month)}
            y="total_doses"
            barWidth="9"
            style={{
              data: {
                fill: colord(c.gray7).toHex(),
              },
            }}
          />
          <VictoryStack>
            <VictoryBar
              data={data}
              barRatio={0.8}
              x={(d) => formatDate(d.month)}
              y={(d) => d.total_doses - d.adc}
              style={{
                data: {
                  fill: colord(c.primary3).toHex(),
                },
              }}
            />
            <VictoryBar
              data={data}
              barRatio={0.8}
              x={(d) => formatDate(d.month)}
              y="adc"
              style={{
                data: {
                  fill: colord(c.omnicell).toHex(),
                },
              }}
            />
          </VictoryStack>
        </VictoryChart>
      </Card>
      <Card width={m.col12}>
        <VictoryChart
          domainPadding={{ y: [0, 2] }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => " "}
              labelComponent={
                <VictoryTooltip
                  flyoutComponent={
                    <ChartTooltip dateFormat={formatDate}>
                      {(datum) => datum.month}
                    </ChartTooltip>
                  }
                />
              }
            />
          }
        >
          <VictoryAxis
            tickFormat={(t) =>
              DateTime.fromISO(t, { zone: "utc" }).toFormat("LLL yy")
            }
            tickLabelComponent={
              <VictoryLabel
                angle={-60}
                style={{ fontSize: "6px", fontFamily: "Open Sans" }}
                dx={-4}
                dy={-4}
              />
            }
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => `$${numFormatter(t)}`}
            tickLabelComponent={
              <VictoryLabel
                style={{ fontSize: "6px", fontFamily: "Open Sans" }}
                dx={5}
              />
            }
          />
          <VictoryArea
            data={data}
            x={(d) => formatDate(d.month)}
            y="costs"
            interpolation="step"
            style={{
              data: {
                fill: "#c43a31",
                fillOpacity: 0.7,
                stroke: "#c43a31",
                strokeWidth: 2,
              },
              labels: {
                fontSize: 15,
                fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
              },
            }}
          />
          <VictoryArea
            data={data}
            x={(d) => formatDate(d.month)}
            y="charges"
            interpolation="step"
            style={{
              data: {
                fill: "#c43a31",
                fillOpacity: 0.7,
                stroke: "#c43a31",
                strokeWidth: 2,
              },
              labels: {
                fontSize: 15,
                fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
              },
            }}
          />
        </VictoryChart>
      </Card>
    </Page>
  );
}
