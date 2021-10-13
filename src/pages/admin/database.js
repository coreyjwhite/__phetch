/**
 * @category Pages
 * @module admin/database
 */

import useSWR from "swr";
import { DateTime } from "luxon";
import setApiUrl from "libs/setApiUrl";
import Button from "components/input/Button";
import Card from "components/containers/Card";
import Column from "components/containers/Column";
import LoadingPage from "components/layout/LoadingPage";
import Page from "components/layout/Page";
import Table from "components/data/Table";

function formatDate(date) {
  return DateTime.fromISO(date).toFormat("L/d/yy");
}

export default function Database() {
  const { data: lastAdminUpdate, adminError } = useSWR(
    setApiUrl("meditech/admins/last")
  );
  const { data: lastFormularyUpdate, formularyError } = useSWR(
    setApiUrl("meditech/formulary/last")
  );
  const { data: lastTxUpdate, txError } = useSWR(setApiUrl("meditech/tx/last"));

  if (!(lastAdminUpdate && lastFormularyUpdate && lastTxUpdate))
    return <LoadingPage />;

  return (
    <Page pageTitle="Database Maintenance">
      <Button onClick={() => fetch(setApiUrl("meditech/database/backup"))}>
        Backup Database
      </Button>
      <Card width="fit-content">
        <table>
          <tr>
            <td>Admininstrations: </td>
            <td>{formatDate(lastAdminUpdate[0][0]["date"])} </td>
            <td>
              <Button
                onClick={() => fetch(setApiUrl("meditech/admins/update"))}
              >
                Update
              </Button>
            </td>
          </tr>
          <tr>
            <td>Transactions: </td>
            <td>{formatDate(lastTxUpdate[0][0]["date"])} </td>
            <td>
              <Button onClick={() => fetch(setApiUrl("meditech/tx/update"))}>
                Update
              </Button>
            </td>
          </tr>
          <tr>
            <td>Formulary: </td>
            <td>{formatDate(lastFormularyUpdate[0]["0"])}</td>
            <td>
              <Button
                onClick={() => fetch(setApiUrl("meditech/formulary/update"))}
              >
                Update
              </Button>
            </td>
          </tr>
        </table>
      </Card>
    </Page>
  );
}
