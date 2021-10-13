"""Single function to gather and expose REST endpoints from submodules."""

from . import meditech, omnicell, status


def add_resources(api):
    """Add REST endpoints to the api instance.

    Args:
        api (Api): A flask_restful instance.

    """

    def add(resource, *args):
        api.add_resource(resource, *args)

    # Meditech
    add(meditech.BackupResource, "/meditech/database/backup")
    add(meditech.CovidResource, "/meditech/covid")
    add(meditech.LastAdminResource, "/meditech/admins/last")
    add(meditech.LastFormularyResource, "/meditech/formulary/last")
    add(meditech.LastTxResource, "/meditech/tx/last")
    add(meditech.UpdateAdminResource, "/meditech/admins/update")
    add(meditech.UpdateFormularyResource, "/meditech/formulary/update")
    add(meditech.UpdateTxResource, "/meditech/tx/update")

    # Omnicell
    add(omnicell.ExceptionsResource, "/omnicell/exceptions/")
    add(omnicell.IVResource, "/omnicell/iv/")
    add(omnicell.RepackagingResource, "/omnicell/repackaging/")
    add(omnicell.OmniResource, "/omnicell/omnis/<string:omni>")
    add(omnicell.OmnisResource, "/omnicell/omnis/")
    add(omnicell.CensusResource, "/omnicell/census/")
    add(omnicell.PopulationsResource, "/omnicell/populations/")

    # Status Board
    add(status.MonthlyDosesResource, "/status/doses/monthly/")
