/**
 * @category Pages
 * @module huddle
 */

import PropTypes from "prop-types";
import { DateTime } from "luxon";
import config from "config";
import m from "styles/measures";
import s from "styles/styles";
import Button from "components/input/Button";
import Card from "components/containers/Card";
import Column from "components/containers/Column";
import Page from "components/layout/Page";
import Row from "components/containers/Row";
import Select from "components/input/Select";
import Textarea from "components/input/Textarea";

export default function Huddle() {
  return (
    <Page pageTitle="Huddle">
      <Card width={m.col6}>
        <Row>
          <img src={config.logo} width="50" height="50" />
          <Column align="flex-start">
            <h3 style={{ margin: 0 }}>Pharmacy Huddle</h3>
            <h4 style={{ margin: 0 }}>
              {DateTime.now().toFormat("EEEE, MMMM dd, yyyy HH:mm")}
            </h4>
          </Column>
        </Row>
        <Textarea label="High Acuity/Complex Patients" />
        <Textarea label="Chemo Admits" />
        <Select
          label="IV Room Workload"
          data={[{ text: "Green" }, { text: "Yellow" }, { text: "Red" }]}
          keyLabel="status"
          valueLabel="text"
          defaultValue={0}
          width={m.col7}
        />
        <Textarea label="IV Room Needs" />
        <Textarea label="Safety Concerns/Good Catches" />
        <Select
          label="Staffing Status"
          data={[{ text: "Green" }, { text: "Yellow" }, { text: "Red" }]}
          keyLabel="status"
          valueLabel="text"
          defaultValue={0}
          width={m.col7}
        />
        <Textarea label="Staffing Issues/Workload" />
        <Textarea label="Open Work Orders" />
        <Textarea label="Items Out of Stock" />
        <Textarea label="Other" />
        <Button variant="danger" autoRightMargin={true}>
          Cancel
        </Button>
        <Button variant="secondary">Save</Button>
        <Button>Save & Send</Button>
      </Card>
    </Page>
  );
}
